export default function About() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <h1 className="text-xl md:text-2xl font-semibold">About this project</h1>

      {/* Project Description */}
      <p className="text-slate-300 text-sm leading-relaxed max-w-3xl">
        This interactive explorer was designed as part of ongoing research in{" "}
        <a
          href="https://chenm19.github.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 transition"
        >
          Professor Chen's Modeling Lab @ Wake Forest University
        </a>.
        <br /><br />
        This project endeavors to create an accessible, intuitive environment to support the
        understanding Alzheimer's' disease biomarkers-particularly the dynamics of the established
        amyloid, tau, and neurodegeneration (AT(N)) framework. Rather than relying on
        static examples, these interactive tools help students,
        researchers, and clinicians experiment with conceptual disease timelines
        and visualize how differing modeling assumptions influence their predicted outcomes.
      </p>

      {/* Contributor Section */}
      <div className="pt-4 border-t border-slate-800 max-w-3xl">
        <h2 className="text-lg font-medium text-slate-200 mb-2">About the Contributor</h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          <span className="font-semibold text-slate-100">Grayson Y. Gooden </span>  
          is a senior at Wake Forest University pursuing a degree in Computer Science with
          research spanning machine learning, computational modeling, and applied Artificial Intelligence.
          <br /><br />
          His contributions include full-stack development of the interactive platform,
          integration of agent-based and dynamical-systems components, and design of
          visual tools to support research initiatives. Grayson is also passionate about balancing technical research with public comprehension, which is a significant objective behind the educational components in this explorer.
        </p>
      </div>
    </div>
  );
}
