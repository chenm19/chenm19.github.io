import clustersData from "../data/atn_clusters.json";

// Build a stable, deterministic ptid → S{N} mapping by sorting ptids alphabetically.
// This ensures the same participant always gets the same anonymous label across sessions.
const sortedPtids = [...new Set((clustersData as { ptid: string }[]).map((r) => r.ptid))].sort();

const ptidToAnon = new Map<string, string>(
  sortedPtids.map((ptid, i) => [ptid, `S${i + 1}`])
);

export function anonymizePtid(ptid: string): string {
  return ptidToAnon.get(ptid) ?? ptid;
}
