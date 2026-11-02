import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import PrototypeImage from '../assets/Prototype.png';

const deploymentOptions = [
  { id: 'buoy', label: 'Depuis une bouée de recherche',
    description: 'Le caisson possède un connecteur Subconn étanche à huit broches qui permet de le relier à une bouée de recherche. Le dispositif peut ainsi être déployé sur un plan d’eau et fonctionner de manière autonome pendant plusieurs semaines.'
   },
  { id: 'boat', label: 'Depuis une embarcation',
    description: 'Sa portabilité permet de l’emporter sur une embarcation pour effectuer des mesures à différents endroits d’un plan d’eau. Les résultats peuvent ainsi éclairer vos observations sur le terrain, sans attendre plusieurs jours une analyse de laboratoire.' },
  { id: 'lab', label: 'En laboratoire', 
    description: 'Sa connectique modulaire peut s’adapter à l’équipement du laboratoire. Vous pouvez ainsi observer vos échantillons dans des conditions adaptées à vos besoins.' },
  { id: 'custom', label: 'Autrement', 
    description: 'L’architecture du dispositif peut être adaptée à différents contextes d’analyse, par exemple à certains environnements aquatiques ou à des canalisations. Échangeons sur votre besoin pour étudier les possibilités d’adaptation.' },
];

function DeviceSection() {
  const reduceMotion = useReducedMotion();
  const [activeDeployment, setActiveDeployment] = useState<string | null>('buoy');

  const reveal = {
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: {
      duration: reduceMotion ? 0.2 : 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  };

  return (
    <section
      id="dispositif"
      aria-labelledby="device-heading"
      className="border-t border-current/15"
    >
      <motion.h2
        {...reveal}
        id="device-heading"
        className="mb-10 grid w-full grid-cols-2 justify-items-center gap-y-3 px-[var(--page-gutter)] pt-12 sm:mb-12 sm:grid-cols-4 sm:gap-y-0 sm:pt-16 lg:mb-16 lg:pt-24"
      >
        <span className="flex items-baseline gap-[clamp(0.125rem,0.5vw,0.5rem)] whitespace-nowrap">
          <span className="text-[clamp(1.75rem,8vw,8rem)] font-medium leading-none tracking-[-0.06em]">P</span>
          <span className="text-[clamp(0.65rem,1.3vw,1.125rem)] tracking-normal">ortable</span>
        </span>
        <span className="flex items-baseline gap-[clamp(0.125rem,0.5vw,0.5rem)] whitespace-nowrap">
          <span className="text-[clamp(1.75rem,8vw,8rem)] font-medium leading-none tracking-[-0.06em]">A</span>
          <span className="text-[clamp(0.65rem,1.3vw,1.125rem)] tracking-normal">utonomous</span>
        </span>
        <span className="flex items-baseline gap-[clamp(0.125rem,0.5vw,0.5rem)] whitespace-nowrap">
          <span className="text-[clamp(1.75rem,8vw,8rem)] font-medium leading-none tracking-[-0.06em]">I</span>
          <span className="text-[clamp(0.65rem,1.3vw,1.125rem)] tracking-normal">maging</span>
        </span>
        <span className="flex items-baseline gap-[clamp(0.125rem,0.5vw,0.5rem)] whitespace-nowrap">
          <span className="text-[clamp(1.75rem,8vw,8rem)] font-medium leading-none tracking-[-0.06em]">C</span>
          <span className="text-[clamp(0.65rem,1.3vw,1.125rem)] tracking-normal">ytometer</span>
        </span>
      </motion.h2>

      <div className="mx-auto max-w-7xl px-6 pb-16 sm:pb-24">
        <div className="grid gap-10 sm:gap-12 md:grid-cols-2 md:gap-10 lg:gap-16">
          <motion.div {...reveal}>
            <div className="flex min-h-64 items-center justify-center sm:min-h-80">
              <img
                src={PrototypeImage}
                alt="Prototype du cytomètre d’imagerie autonome portable PAIC"
                className="max-h-[28rem] w-full object-contain"
              />
            </div>

            <p className="mt-8 max-w-2xl text-base leading-relaxed text-neutral-600 md:text-lg">
              Le cytomètre d’imagerie autonome portable (PAIC) offre une
              solution évolutive pour identifier les microparticules aquatiques
              et suivre leur concentration sur plusieurs semaines. Il détecte
              et identifie en continu les espèces microscopiques présentes dans
              l’eau grâce à un processus innovant en plusieurs étapes, et avertit l’utilisateur
              lorsqu’une situation dangereuse est détectée. Facile à déployer,
              il peut fonctionner jusqu’à deux semaines sans intervention
              humaine. Sa conception permet également d’effectuer la maintenance
              sur place.
            </p>

            <a
              href={new URL('../assets/Specification_Sheet_PAIC.pdf', import.meta.url).href}
              download="Specification_Sheet_PAIC.pdf"
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full border border-current/25 px-5 py-3 text-sm font-medium transition-colors hover:bg-white/10 sm:mt-7 sm:px-6"
            >
              Télécharger la fiche technique (PDF)
            </a>
          </motion.div>

          <motion.div {...reveal} className="pt-0 md:pt-2">
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-neutral-500">
              Utilisation
            </p>
            <h3 className="mb-8 text-3xl font-medium tracking-tight md:text-4xl">
              Comment l’utiliser ?
            </h3>

            <div className="border-t border-current/20">
              {deploymentOptions.map((option) => {
                const isActive = activeDeployment === option.id;
                const panelId = `deployment-description-${option.id}`;
                const buttonId = `deployment-button-${option.id}`;

                return (
                  <div key={option.id} className="border-b border-current/20">
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isActive}
                      aria-controls={panelId}
                      onClick={() =>
                        setActiveDeployment(isActive ? null : option.id)
                      }
                      className="flex w-full items-center justify-between gap-4 py-5 text-left text-lg transition-colors hover:text-[var(--color-accent)] sm:text-xl"
                    >
                      <span>{option.label}</span>
                      <span
                        aria-hidden="true"
                        className="text-2xl leading-none text-neutral-500"
                      >
                        {isActive ? '−' : '+'}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          id={panelId}
                          key={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: reduceMotion ? 0 : 0.3,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <p className="pb-6 text-base leading-relaxed text-neutral-600">
                            {option.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default DeviceSection;
