import json
import pandas as pd
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
clusters_path = ROOT / "src" / "data" / "atn_clusters.json"
fdg_path = ROOT / "src" / "data" / "raw" / "adni_fdg_jason_swapped_columns.csv"

with open(clusters_path, "r") as f:
    clusters = json.load(f)

fdg = pd.read_csv(fdg_path)

if "PTID" not in fdg.columns or "DX" not in fdg.columns:
    raise ValueError("FDG CSV must contain PTID and DX columns")

fdg_dx = fdg[["PTID", "DX"]].drop_duplicates(subset=["PTID"]).copy()

dx_map = dict(zip(fdg_dx["PTID"], fdg_dx["DX"]))

def collapse_stage3(dx: str | None):
    if dx is None or pd.isna(dx):
        return None
    dx = str(dx).strip()
    if dx in {"CN", "SMC"}:
        return "CN"
    if dx in {"EMCI", "LMCI", "LEMCI"}:
        return "MCI"
    if dx == "AD":
        return "AD"
    return None

patched = []
missing_dx = []

for row in clusters:
    ptid = row.get("ptid")
    dx = dx_map.get(ptid)

    if dx is None or pd.isna(dx):
        missing_dx.append(ptid)

    new_row = dict(row)
    new_row["actualDx"] = None if dx is None or pd.isna(dx) else str(dx).strip()
    new_row["actualStage3"] = collapse_stage3(dx)

    patched.append(new_row)

with open(clusters_path, "w") as f:
    json.dump(patched, f, indent=2)

print(f"Patched {len(patched)} rows.")
print(f"Missing DX for {len(missing_dx)} PTIDs.")
if missing_dx:
    print("First few missing PTIDs:", missing_dx[:10])
