from pathlib import Path

import pandas as pd


def build_atn():
    # repo_root
    repo_root = Path(__file__).resolve().parents[1]
    raw_dir = repo_root / "analysis" / "raw_adni"

    tau_path = raw_dir / "adni_tau_jason_swapped_columns.csv"
    fdg_path = raw_dir / "adni_fdg_jason_swapped_columns.csv"
    amy_path = raw_dir / "adni_amyloid_jason_swapped_columns.csv"

    tau = pd.read_csv(tau_path)
    fdg = pd.read_csv(fdg_path)
    amy = pd.read_csv(amy_path)

    # Metadata columns (other columns are ROIs)
    meta_cols = [
        "PTID",
        "SCAN",
        "EXAMDATE",
        "DX",
        "AGE",
        "PTGENDER",
        "PTEDUCAT",
        "PTETHCAT",
        "PTRACCAT",
        "PTMARRY",
        "APOE4",
    ]

    roi_cols = [c for c in tau.columns if c not in meta_cols]

    # Simple global composites - mean across all ROIs for each modality
    A = amy[roi_cols].mean(axis=1)
    T = tau[roi_cols].mean(axis=1)
    N = fdg[roi_cols].mean(axis=1)

    atn = pd.DataFrame(
        {
            "PTID": tau["PTID"].astype(str),
            "A": A,
            "T": T,
            "N": N,
        }
    )

    out_path = repo_root / "analysis" / "atn_270x3.csv"
    atn.to_csv(out_path, index=False)
    print(f"Wrote {out_path} with shape {atn.shape}")


if __name__ == "__main__":
    build_atn()
