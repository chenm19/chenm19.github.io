import supervisedResults from "../../data/supervised_results.json";

type PerClassMetrics = {
  precision: number;
  recall: number;
  f1: number;
  support: number;
};

type BaseModelResult = {
  name: string;
  accuracy_train: number;
  accuracy_test: number;
  macro_precision_test: number;
  macro_recall_test: number;
  macro_f1_test: number;
  per_class: Record<string, PerClassMetrics>;
  confusion_matrix_test: number[][];
  class_order: string[];
};

type FeatureImportance = {
  features: string[];
  importance: number[];
};

type RandomForestResult = BaseModelResult & {
  feature_importance: FeatureImportance;
};

type SupervisedResults = {
  label_column: string;
  classes: string[];
  n_samples: number;
  models: {
    logistic_regression: BaseModelResult;
    random_forest: RandomForestResult;
  };
};

const results = supervisedResults as SupervisedResults;

export default function SupervisedResultsPanel() {
  const lr = results.models.logistic_regression;
  const rf = results.models.random_forest;

  const lrAcc = lr.accuracy_test;
  const lrF1 = lr.macro_f1_test;

  const rfAcc = rf.accuracy_test;
  const rfF1 = rf.macro_f1_test;

  const fi = rf.feature_importance;
  const fiRows = fi.features.map((feat, idx) => ({
    feature: feat,
    importance: fi.importance[idx],
  }));

  return (
    <div className="mt-8 space-y-3">
      <div className="space-y-1">
        <h3 className="text-base md:text-lg font-semibold">
          Supervised ATN Stage Classification
        </h3>
        <p className="text-slate-300 text-sm max-w-2xl">
          Logistic regression and a random forest classifier were trained to
          predict the collapsed stage labels (CN / MCI / AD) directly from the
          continuous ATN features for the same {results.n_samples} participants.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="font-medium text-slate-100">
              Logistic regression
            </span>
            <span className="text-xs text-slate-400">
              Test accuracy {lrAcc.toFixed(3)}
            </span>
          </div>
          <p className="text-slate-300 text-xs">
            A multinomial model with class-weighting. Provides a simple linear
            decision boundary in ATN space.
          </p>
          <dl className="mt-2 grid grid-cols-2 gap-y-1 text-xs">
            <div>
              <dt className="text-slate-400">Macro F1 (test)</dt>
              <dd className="text-slate-100">{lrF1.toFixed(3)}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Train accuracy</dt>
              <dd className="text-slate-100">
                {lr.accuracy_train.toFixed(3)}
              </dd>
            </div>
          </dl>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="font-medium text-slate-100">
              Random forest
            </span>
            <span className="text-xs text-slate-400">
              Test accuracy {rfAcc.toFixed(3)}
            </span>
          </div>
          <p className="text-slate-300 text-xs">
            A non-linear ensemble model. Fits CN and MCI strongly but is limited
            on AD by the extremely small sample size.
          </p>
          <dl className="mt-2 grid grid-cols-2 gap-y-1 text-xs">
            <div>
              <dt className="text-slate-400">Macro F1 (test)</dt>
              <dd className="text-slate-100">{rfF1.toFixed(3)}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Train accuracy</dt>
              <dd className="text-slate-100">
                {rf.accuracy_train.toFixed(3)}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-xs md:text-[11px] space-y-2">
        <div className="font-medium text-slate-100">
          Random forest feature importance
        </div>
        <p className="text-slate-300">
          Relative contribution of each biomarker to the forest&apos;s
          predictions in this ATN space.
        </p>
        <div className="mt-1 grid grid-cols-3 gap-2">
          {fiRows.map(row => (
            <div
              key={row.feature}
              className="flex flex-col bg-slate-950/60 border border-slate-800 rounded-lg px-2 py-1.5"
            >
              <span className="text-slate-400 uppercase tracking-wide text-[10px]">
                {row.feature}
              </span>
              <span className="text-slate-100">
                {row.importance.toFixed(3)}
              </span>
            </div>
          ))}
        </div>
        <p className="text-slate-400 mt-1">
          Values are normalized importances; higher values indicate a larger
          contribution to stage discrimination in this model.
        </p>
      </div>
    </div>
  );
}
