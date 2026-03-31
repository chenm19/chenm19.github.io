import graysonPhoto from '../assets/about/Grayson.jpeg'

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
          The AI & Computational Biology Lab @ Wake Forest University
        </a>.
        <br /><br />
        This project endeavors to create an educational, intuitive Alzheimer's' disease tool. Understanding such a complex disease can require frustratingly abstract thinking, so we suggest a simplified viewing experience through biomarkers and the dynamics of the established amyloid, tau, and neurodegeneration AT(N) framework. Rather than relying on traditional static examples, this project focuses on interactive tools help students, researchers, and clinicians experiment with conceptual disease timelines and visualize how differing modeling assumptions can influence their predicted outcomes.
      </p>

      {/* Contributor Section */}
        <div className="pt-4 border-t border-slate-800 max-w-3xl">
          <h2 className="text-lg font-medium text-slate-200 mb-3">About the Contributor</h2>

          <div className="grid sm:grid-cols-[160px_1fr] gap-4 items-start">
            {/* Photo */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2">
              <img
                src={graysonPhoto}
                alt="Grayson Y Gooden"
                className="w-full aspect-square object-cover rounded-lg"
                loading="lazy"
              />
            </div>

            {/* Text */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
              <p className="text-slate-300 text-sm leading-relaxed">
                <span className="font-semibold text-slate-100">Grayson Y. Gooden </span>
                is a senior at Wake Forest University pursuing a degree in Computer Science, especially passionate about machine learning, computational modeling, and applied AI. He will be pursuing a Master's in Software Management next year in Silicon Valley.
                <br /><br />
                His contributions include the full-stack development of the interactive platform, design of dynamic agent-based components, and creative visual tools to support research initiatives. He is also passionate about balancing technical research with public education, a significant objective behind the components in this explorer.
              </p>
            </div>
          </div>
        </div>
    </div>
  );
}
