from pathlib import Path
import json
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
  accuracy_score,
  precision_recall_fscore_support,
  confusion_matrix,
)

BASE_DIR = Path(__file__).resolve().parent.parent

data_path = BASE_DIR / "analysis" / "supervised_atn_dataset.csv"
out_json_path = BASE_DIR / "projects" / "ad-explorer-src" / "src" / "data" / "supervised_results.json"

df = pd.read_csv(data_path)

df = df.dropna(subset=["A", "T", "N", "stage3"])

label_col = "stage3"
classes = ["CN", "MCI", "AD"]
class_to_idx = {c: i for i, c in enumerate(classes)}
idx_to_class = {i: c for c, i in class_to_idx.items()}

X = df[["A", "T", "N"]].to_numpy(dtype=float)
y = df[label_col].map(class_to_idx).to_numpy()

X_train, X_test, y_train, y_test = train_test_split(
  X,
  y,
  test_size=0.2,
  random_state=42,
  stratify=y,
)

logreg_pipeline = Pipeline(
  steps=[
    ("scaler", StandardScaler()),
    (
      "clf",
      LogisticRegression(
        multi_class="multinomial",
        solver="lbfgs",
        max_iter=2000,
        class_weight="balanced",
      ),
    ),
  ]
)

rf_clf = RandomForestClassifier(
  n_estimators=400,
  max_depth=None,
  min_samples_split=2,
  min_samples_leaf=1,
  class_weight="balanced_subsample",
  random_state=42,
)

logreg_pipeline.fit(X_train, y_train)
rf_clf.fit(X_train, y_train)

def eval_model(model, X_tr, X_te, y_tr, y_te, name):
  y_pred_tr = model.predict(X_tr)
  y_pred_te = model.predict(X_te)

  acc_tr = float(accuracy_score(y_tr, y_pred_tr))
  acc_te = float(accuracy_score(y_te, y_pred_te))

  prec_te, rec_te, f1_te, support_te = precision_recall_fscore_support(
    y_te,
    y_pred_te,
    labels=list(range(len(classes))),
    zero_division=0,
  )

  cm_te = confusion_matrix(
    y_te,
    y_pred_te,
    labels=list(range(len(classes))),
  )

  class_metrics = {}
  for i, c in enumerate(classes):
    class_metrics[c] = {
      "precision": float(prec_te[i]),
      "recall": float(rec_te[i]),
      "f1": float(f1_te[i]),
      "support": int(support_te[i]),
    }

  result = {
    "name": name,
    "accuracy_train": acc_tr,
    "accuracy_test": acc_te,
    "macro_precision_test": float(np.mean(prec_te)),
    "macro_recall_test": float(np.mean(rec_te)),
    "macro_f1_test": float(np.mean(f1_te)),
    "per_class": class_metrics,
    "confusion_matrix_test": cm_te.astype(int).tolist(),
    "class_order": classes,
  }

  return result

logreg_results = eval_model(logreg_pipeline, X_train, X_test, y_train, y_test, "logistic_regression")
rf_results = eval_model(rf_clf, X_train, X_test, y_train, y_test, "random_forest")

rf_importance = rf_clf.feature_importances_.tolist()
rf_results["feature_importance"] = {
  "features": ["A", "T", "N"],
  "importance": [float(v) for v in rf_importance],
}

results = {
  "label_column": label_col,
  "classes": classes,
  "n_samples": int(df.shape[0]),
  "models": {
    "logistic_regression": logreg_results,
    "random_forest": rf_results,
  },
}

out_json_path.parent.mkdir(parents=True, exist_ok=True)
with out_json_path.open("w") as f:
  json.dump(results, f, indent=2)

print(f"Wrote supervised results to {out_json_path}")