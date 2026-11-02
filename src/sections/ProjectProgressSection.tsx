
import { motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';

type TimelineStatus = 'completed' | 'current' | 'planned';

type TimelineItem = {
  id: string;
  date: string;
  title: string;
  description: string;
  status: TimelineStatus;
};

const timelineItems: TimelineItem[] = [
  {
    id: 'detection',
    date: 'avril 2026',
    title: 'Validation de la détection de particules',
    description: 'En laboratoire, la détection a été expérimentée sur des billes de plastique. Ces essais ont permis de vérifier la faisabilité de la détection de particules dans le microcanal.',
    status: 'completed',
  },
  {
    id: 'prototype',
    date: 'octobre 2026',
    title: 'Développement du prototype',
    description: 'L’assemblage mécanique et électronique relie les différents éléments du PAIC. L’objectif actuel est de synchroniser la prise d’image avec la détection afin d’associer un hologramme à chaque particule détectée.',
    status: 'current',
  },
  {
    id: 'pilot',
    date: 'juin 2027',
    title: 'Programme pilote',
    description: 'Les essais sur le terrain permettront d’évaluer les performances et de comparer les résultats à des mesures de référence.',
    status: 'planned',
  },
];

const statusLabels: Record<TimelineStatus, string> = {
  completed: 'Terminé',
  current: 'En cours',
  planned: 'Prévu',
};

const statusStyles: Record<TimelineStatus, string> = {
  completed: 'bg-neutral-800 text-neutral-900',
  current: 'bg-green-50 text-green-700',
  planned: 'border border-dashed border-neutral-300 text-neutral-500',
};

function TimelineItems({
  items,
  reduceMotion,
}: {
  items: TimelineItem[];
  reduceMotion: boolean;
}) {
  return (
    <div>
      {items.map((item, index) => {
        const hasNext = index < items.length - 1;
        const isCurrent = item.status === 'current';

        return (
          <div key={item.id} className="relative">
            {/* Segment reliant cette étape à la suivante */}
            <div
              aria-hidden="true"
              className={`absolute bottom-0 left-[7px] top-0 border-l-2 ${
                item.status === 'planned'
                  ? 'border-dashed border-neutral-300'
                  : 'border-solid border-neutral-800'
              } ${!hasNext ? 'hidden' : ''}`}
            />

            <motion.article
              initial={{ opacity: 0, x: reduceMotion ? 0 : 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: reduceMotion ? 0.2 : 0.45,
                delay: reduceMotion ? 0 : Math.min(index * 0.06, 0.24),
              }}
              className="relative pb-8 pl-9"
            >
              {/* Repère de statut */}
              <span
                aria-hidden="true"
                className={`absolute left-0 top-1 h-4 w-4 rounded-full border-2 ${
                  item.status === 'completed'
                    ? 'border-neutral-800 bg-neutral-800'
                    : isCurrent
                      ? 'border-green-600 bg-green-600'
                      : 'border-neutral-400 bg-neutral-50'
                } ${isCurrent && !reduceMotion ? 'animate-pulse' : ''}`}
              />

              <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 md:p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium text-neutral-500">
                    {item.date}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider ${statusStyles[item.status]}`}
                  >
                    {statusLabels[item.status]}
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-medium tracking-tight">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {item.description}
                </p>
              </div>
            </motion.article>
          </div>
        );
      })}
    </div>
  );
}

function ProjectProgressSection() {
  const reduceMotion = useReducedMotion();
  const currentIndex = timelineItems.findIndex((item) => item.status === 'current');
  const maxTimelineStart = Math.max(0, timelineItems.length - 3);
  const currentTimelineStart = Math.min(
    Math.max(0, currentIndex - 1),
    maxTimelineStart,
  );
  const [timelineStart, setTimelineStart] = useState(currentTimelineStart);
  const visibleItems = timelineItems.slice(timelineStart, timelineStart + 3);

  const showPreviousItems = () => {
    setTimelineStart((start) => Math.max(0, start - 1));
  };
  const showNextItems = () => {
    setTimelineStart((start) => Math.min(maxTimelineStart, start + 1));
  };

  return (
    <section
      id="avancement"
      className="scroll-mt-24 bg-[var(--color-surface-raised)] py-16 sm:py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduceMotion ? 0.2 : 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            Feuille de route
          </p>

          <h2 className="mt-5 text-3xl font-medium tracking-tight md:text-5xl">
            Chaque avancée nous rapproche du terrain.
          </h2>

          <p className="mt-6 text-base leading-relaxed text-neutral-600 md:text-lg">
            Le développement du PAIC avance par étapes. Retrouvez les avancées
            réalisées, l’étape en cours et les prochaines échéances.
          </p>
        </motion.div>

        <div className="mx-auto mt-10 flex max-w-4xl flex-col gap-5 sm:mt-12 md:mt-16 md:flex-row md:items-start md:gap-8">
          <div
            role="region"
            aria-live="polite"
            className="min-w-0 flex-1"
            aria-label="Étapes de la feuille de route"
          >
            <TimelineItems
              items={visibleItems}
              reduceMotion={Boolean(reduceMotion)}
            />
          </div>

          <nav
            aria-label="Navigation dans la chronologie"
            className="order-first flex items-center justify-center gap-3 md:order-last md:sticky md:top-28 md:flex-col"
          >
            <button
              type="button"
              onClick={showPreviousItems}
              disabled={timelineStart === 0}
              aria-label="Afficher les étapes précédentes"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 text-neutral-600 transition hover:border-neutral-500 hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4">
                <path
                  d="m5 12 5-5 5 5"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setTimelineStart(currentTimelineStart)}
              aria-label="Revenir à l’étape actuelle"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 text-neutral-600 transition hover:border-neutral-500 hover:text-neutral-900"
            >
              <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4">
                <circle
                  cx="10"
                  cy="10"
                  r="6.25"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle cx="10" cy="10" r="2" fill="currentColor" />
              </svg>
            </button>
            <button
              type="button"
              onClick={showNextItems}
              disabled={timelineStart === maxTimelineStart}
              aria-label="Afficher les étapes suivantes"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 text-neutral-600 transition hover:border-neutral-500 hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4">
                <path
                  d="m5 8 5 5 5-5"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
              </svg>
            </button>
          </nav>
        </div>

        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-3 text-xs text-neutral-500">
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-neutral-800" />
            Terminé
          </span>
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 animate-pulse rounded-full bg-green-600" />
            En cours
          </span>
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full border-2 border-dashed border-neutral-400" />
            Prévu
          </span>
        </div>
      </div>
    </section>
  );
}

export default ProjectProgressSection;
