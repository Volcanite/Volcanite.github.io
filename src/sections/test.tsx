import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const applications = [
  {
    name: 'Regulation',
    image:
      'https://media.gettyimages.com/id/1394983587/photo/scientists-in-radiation-protection-suit-examining-polluted-water-at-industrial-site.jpg?s=612x612&w=0&k=20&c=6vJPUwuWyQPMoX4oUXn3HzgfkTVesnEibFDkmoJfuOU=',
    imageAlt: 'Scientifique sur eau contaminée',
    description:
      'La surveillance de la qualité de l\'eau est essentielle pour garantir la sécurité des populations et la protection de l\'environnement. Nous fournissons des solutions de surveillance avancées pour détecter les contaminants et assurer la conformité aux normes réglementaires.',
  },
  {
    name: 'Research',
    image:
      'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1800&q=85',
    imageAlt: 'Équipement de laboratoire dédié à la recherche',
    description:
      'Développer des solutions pour la recherche scientifique accesible et adaptable permet de répondre aux besoins des chercheurs et de favoriser l\'innovation. Nos outils de recherche sont conçus pour être flexibles, modulaires et faciles à utiliser, afin de soutenir la découverte scientifique et l\'avancement des connaissances.',
  },
  {
    name: 'Efficiency',
    image:
      'https://imgs.search.brave.com/dZbbaTM28_IKfp8MTpQVRGmc4wN1olqgn2-paCpVGO4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/Z3JvdXBlaDJvLmNh/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDI1/LzAyL0lNR182NDU2/LndlYnA',
    imageAlt: 'Traitement de l\'eau',
    description:
      'Vérifier l\'efficacité des produits de traitement de l\'eau est essentiel pour garantir leur performance et leur impact environnemental. Nous proposons des solutions d\'évaluation de l\'efficacité qui permettent de mesurer les résultats, d\'identifier les améliorations possibles et d\'optimiser les processus de traitement pour une meilleure durabilité.',
  },
];

function ApplicationSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const activeApplication = applications[activeIndex];

  return (
    <section
      aria-labelledby="application-heading"
    >
      <div className="mx-auto grid max-w-[1440px] md:min-h-[680px] md:grid-cols-2">
        <div className="flex flex-col px-6 py-12 sm:px-10 md:px-12 md:py-14 lg:px-16">
          <h2
            id="application-heading"
            className="mb-12 text-4xl font-normal tracking-tight sm:text-5xl md:mb-20 md:text-6xl"
          >
            Applications
          </h2>

          <div className="mt-auto">
            {applications.map((application, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={application.name}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveIndex(index)}
                  className={`group flex w-full items-center justify-between border-t border-neutral-200 py-5 text-left transition-colors sm:py-6 md:py-7 ${
                    isActive
                      ? 'text-neutral-950'
                      : 'text-neutral-400 hover:text-neutral-700'
                  }`}
                >
                  <span className="text-3xl font-normal tracking-tight sm:text-4xl md:text-5xl">
                    {application.name}
                  </span>
                  <span
                    aria-hidden="true"
                    className="ml-4 text-3xl font-light leading-none"
                  >
                    {isActive ? '×' : '+'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative isolate min-h-[460px] overflow-hidden bg-neutral-900 sm:min-h-[560px] md:min-h-full">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeApplication.image}
              src={activeApplication.image}
              alt={activeApplication.imageAlt}
              className="absolute inset-0 -z-20 h-full w-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.45 }}
              loading="lazy"
            />
          </AnimatePresence>
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/25 to-black/5"
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeApplication.name}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.35 }}
              className="flex min-h-[460px] items-end p-6 sm:min-h-[560px] sm:p-10 md:min-h-full md:p-12 lg:p-16"
              aria-live="polite"
            >
              <p className="max-w-2xl text-base leading-relaxed text-white sm:text-lg md:text-xl">
                {activeApplication.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default ApplicationSection;
