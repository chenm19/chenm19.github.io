from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Literal

import json
import numpy as np
import pandas as pd
from sklearn.mixture import GaussianMixture
from sklearn.preprocessing import StandardScaler

Stage5 = Literal["CN", "SMC", "EMCI", "LEMCI", "AD"]
Stage3 = Literal["CN", "MCI", "AD"]


@dataclass
class PatientClusterResult:
    ptid: str
    a: float
    t: float
    n: float
    stage5: Stage5
    stage3: Stage3
    posterior: dict  # keys: Stage5, values: float


def main():
    # repo_root
    repo_root = Path(__file__).resolve().parents[1]

    # Load ATN matrix
    atn_path = repo_root / "analysis" / "atn_270x3.csv"
    df = pd.read_csv(atn_path)

    ptids = df["PTID"].astype(str).values
    ATN = df[["A", "T", "N"]].to_numpy(dtype=float)

    # Standardize and fit Gaussian Mixture Model (GMM)
    scaler = StandardScaler()
    X = scaler.fit_transform(ATN)

    gmm = GaussianMixture(n_components=5, covariance_type="full", random_state=42)
    gmm.fit(X)

    probs = gmm.predict_proba(X)      # (n_samples, 5)
    cluster_ids = probs.argmax(axis=1)

    # Compute centroids in original ATN space
    centroids = []
    for k in range(gmm.n_components):
        mask = cluster_ids == k
        if mask.sum() == 0:
            centroids.append(np.array([np.nan, np.nan, np.nan]))
        else:
            centroids.append(ATN[mask].mean(axis=0))
    centroids = np.vstack(centroids)

    # Order clusters by disease severity (A+T+N)
    severity = centroids.sum(axis=1)  # larger is more advanced
    order = np.argsort(severity)      # low to high

    canonical_stage5 = np.array(["CN", "SMC", "EMCI", "LEMCI", "AD"])
    stage5_by_cluster = canonical_stage5[order]

    # Build per-patient results
    results: list[PatientClusterResult] = []

    for i in range(len(ptids)):
        k = cluster_ids[i]
        stage5: Stage5 = stage5_by_cluster[k]  # type: ignore

        if stage5 in ("CN", "SMC"):
            stage3: Stage3 = "CN"
        elif stage5 in ("EMCI", "LEMCI"):
            stage3 = "MCI"
        else:
            stage3 = "AD"

        post = {
            stage5_by_cluster[j]: float(probs[i, j])
            for j in range(gmm.n_components)
        }

        a_val, t_val, n_val = ATN[i]
        results.append(
            PatientClusterResult(
                ptid=ptids[i],
                a=float(a_val),
                t=float(t_val),
                n=float(n_val),
                stage5=stage5,
                stage3=stage3,
                posterior=post,
            )
        )

    model_summary = {
        "centroids_ATN": centroids.tolist(),
        "severity": severity.tolist(),
        "cluster_order": order.tolist(),
        "stage5_by_cluster": stage5_by_cluster.tolist(),
    }

    # Write JSON straight into the Vite app
    data_dir = repo_root / "projects" / "ad-explorer-src" / "src" / "data"
    data_dir.mkdir(parents=True, exist_ok=True)

    clusters_path = data_dir / "atn_clusters.json"
    summary_path = data_dir / "atn_model_summary.json"

    with clusters_path.open("w") as f:
        json.dump([asdict(r) for r in results], f, indent=2)

    with summary_path.open("w") as f:
        json.dump(model_summary, f, indent=2)

    print(f"Wrote {clusters_path}")
    print(f"Wrote {summary_path}")


if __name__ == "__main__":
    main()
