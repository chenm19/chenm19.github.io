import clustersData from "../../data/atn_clusters.json";

type Stage5 = "CN" | "SMC" | "EMCI" | "LEMCI" | "AD";
type Stage3 = "CN" | "MCI" | "AD";

interface PatientClusterResult {
  ptid: string;
  a: number;
  t: number;
  n: number;
  stage5: Stage5;
  stage3: Stage3;
  posterior: Record<Stage5, number>;
}

// Cast raw JSON into typed objects
const clusters = clustersData as PatientClusterResult[];

export default function ATNClusteringPanel() {
  const total = clusters.length;

  const stage3Counts: Record<Stage3, number> = { CN: 0, MCI: 0, AD: 0 };
  clusters.forEach(r => {
    stage3Counts[r.stage3] += 1;
  });

  return (
    <div className="mt-10 space-y-3">
      <h2 className="text-lg md:text-xl font-semibold">
        Unsupervised ATN Clustering (preview)
      </h2>
      <p className="text-slate-300 text-sm max-w-2xl">
        This section uses a Gaussian Mixture Model (GMM) fit on the ATN matrix to
        assign each ADNI participant to one of five latent clusters behind the scenes before
        collapsing them into three visible stages (CN / MCI / AD).
      </p>
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-sm">
        <p className="text-slate-200">
          <span className="font-medium">Total participants:</span> {total}
        </p>
        <p className="text-slate-200 mt-1">
          <span className="font-medium">Collapsed stages:</span>{" "}
          CN = {stage3Counts.CN},{" "}
          MCI = {stage3Counts.MCI},{" "}
          AD = {stage3Counts.AD}
        </p>
        <p className="text-[11px] text-slate-400 mt-2">
          (Once this is wired in, we'll add visualizations and
          interactive exploration. For now this we just verify the data
          pipeline end-to-end.)
        </p>
      </div>
    </div>
  );
}
