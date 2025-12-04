from pathlib import Path
import json
import pandas as pd

BASE_DIR = Path(__file__).resolve().parent.parent

atn_csv_path = BASE_DIR / "analysis" / "atn_270x3.csv"
clusters_json_path = BASE_DIR / "projects" / "ad-explorer-src" / "src" / "data" / "atn_clusters.json"
out_csv_path = BASE_DIR / "analysis" / "supervised_atn_dataset.csv"

atn_df = pd.read_csv(atn_csv_path)
atn_df["PTID"] = atn_df["PTID"].astype(str)

with clusters_json_path.open("r") as f:
  clusters = json.load(f)

clusters_df = pd.DataFrame(clusters)
clusters_df["ptid"] = clusters_df["ptid"].astype(str)

merged = atn_df.merge(clusters_df[["ptid", "stage3", "stage5"]], left_on="PTID", right_on="ptid", how="inner")

if merged.empty:
  raise RuntimeError("Merged dataset is empty; PTID keys did not match between CSV and JSON.")

merged = merged.drop(columns=["ptid"])
merged = merged[["PTID", "A", "T", "N", "stage3", "stage5"]]

merged.to_csv(out_csv_path, index=False)
print(f"Wrote supervised dataset with {len(merged)} rows to {out_csv_path}")