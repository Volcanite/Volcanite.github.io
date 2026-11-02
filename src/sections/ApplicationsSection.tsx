import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import AlexandriumImage from '../assets/particles/alexandrium-catenella.jpg';
import MicroplasticImage from '../assets/particles/microplastic-fibres.webp';
import SkeletonemaImage from '../assets/particles/skeletonema-costatum.jpg';

const samplingDays = [
  {
    date: '01-06-27',
    count: '2 564',
    records: [
      {
        time: '10:06:18',
        family: 'Alexandrium catenella · toxique',
        image: AlexandriumImage,
        imageAlt: 'Alexandrium catenella observé au microscope',
        size: '38 µm',
        concentration: '14 / L',
        confidence: 96,
      },
      {
        time: '10:06:23',
        family: 'Skeletonema · non toxique',
        image: SkeletonemaImage,
        imageAlt: 'Microphotographie de Skeletonema costatum',
        size: '24 µm',
        concentration: '117 / L',
        confidence: 93,
      },
    ],
  },
  {
    date: '02-06-27',
    count: '2 493',
    records: [
      {
        time: '09:14:32',
        family: 'Alexandrium catenella · toxique',
        image: AlexandriumImage,
        imageAlt: 'Alexandrium catenella observé au microscope',
        size: '42 µm',
        concentration: '18 / L',
        confidence: 97,
      },
      {
        time: '09:14:35',
        family: 'Skeletonema · non toxique',
        image: SkeletonemaImage,
        imageAlt: 'Microphotographie de Skeletonema costatum',
        size: '26 µm',
        concentration: '124 / L',
        confidence: 94,
      },
      {
        time: '09:14:41',
        family: 'Polymère · plastique',
        image: MicroplasticImage,
        imageAlt: 'Fibres microplastiques observées au microscope électronique',
        size: '310 µm',
        concentration: '3 / L',
        confidence: 89,
      },
    ],
  },
] as const;

type SamplingDay = (typeof samplingDays)[number];

function SamplingPhone() {
  const [selectedDay, setSelectedDay] = useState<SamplingDay>(samplingDays[1]);
  const [panelOpen, setPanelOpen] = useState(true);

  return (
    <div
      className="relative mx-auto w-full rounded-3xl border shadow-2xl"
      style={{
        maxWidth: 400,
        borderRadius: 52,
        borderColor: '#58605b',
        backgroundColor: '#171c19',
        padding: 9,
      }}
    >
      <div
        className="relative overflow-hidden rounded-3xl"
        style={{
          height: 700,
          borderRadius: 42,
          backgroundColor: '#f2f5f3',
          color: '#26342d',
        }}
      >
        <div
          className="flex h-8 items-center justify-between px-6 text-xs font-medium text-white"
          style={{ backgroundColor: '#26352f' }}
        >
          <span>9:41</span>
          <span className="tracking-[.12em]" aria-hidden="true">
            ● ▮ ▰
          </span>
        </div>

        <div
          className="flex h-12 items-center justify-between px-5 text-white"
          style={{ backgroundColor: '#26352f' }}
        >
          <span className="text-sm" aria-hidden="true">☰</span>
          <span className="text-sm font-semibold tracking-[.14em]">PAIC</span>
          <span className="text-base" aria-hidden="true">⌕</span>
        </div>

        <div className="space-y-2 px-4 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p
                className="mb-1 text-xs font-semibold uppercase tracking-[.16em]"
                style={{ color: '#66746b' }}
              >
                Station de mesure
              </p>
              <h3
                className="text-base font-semibold"
                style={{ color: '#26352f' }}
              >
                Baie de Morlaix
              </h3>
            </div>
            <span
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
              style={{ backgroundColor: '#e1eee6', color: '#2d6847' }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: '#5caa78' }} />
              En ligne
            </span>
          </div>

          <div
            className="rounded-2xl border bg-white p-3.5 shadow-sm"
            style={{ borderColor: '#dce4de' }}
          >
            <div className="flex items-center justify-between">
              <p className="text-xs" style={{ color: '#59675e' }}>
                Qualité de l’eau
              </p>
              <span
                className="rounded-full px-2.5 py-1 text-xs font-medium"
                style={{ backgroundColor: '#f8eadc', color: '#8a5123' }}
              >
                À surveiller
              </span>
            </div>
            <div className="mt-2 flex items-end justify-between">
              <div>
                <p className="text-2xl font-semibold leading-none" style={{ color: '#26352f' }}>
                  18
                </p>
                <p className="mt-1 text-xs" style={{ color: '#59675e' }}>
                  particules ciblées / L
                </p>
              </div>
              <div className="flex h-10 items-end gap-1" aria-hidden="true">
                {[15, 28, 49, 70].map((height, index) => (
                  <span
                    key={index}
                    className="w-1.5 rounded-t-sm"
                    style={{ height: `${height}%`, backgroundColor: '#83a18b' }}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>

        <div
          className="absolute inset-x-0 bottom-0 overflow-hidden rounded-t-3xl bg-white shadow-2xl"
          style={{ borderTopLeftRadius: 28, borderTopRightRadius: 28 }}
        >
          {panelOpen ? (
            <>
              <div className="flex items-center justify-between px-5 pb-2 pt-3">
                <div>
                  <div className="mb-2 h-1 w-9 rounded-full" style={{ backgroundColor: '#c4cec7' }} />
                  <p className="text-base font-semibold" style={{ color: '#26352f' }}>
                    Données de prélèvement
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Fermer le volet des données"
                  aria-expanded={panelOpen}
                  onClick={() => setPanelOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-xl transition-colors hover:bg-[#f1f4f2]"
                  style={{ color: '#425248' }}
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 px-4 py-2">
                {samplingDays.map((day) => {
                  const isSelected = selectedDay.date === day.date;

                  return (
                    <button
                      key={day.date}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setSelectedDay(day)}
                      className="rounded-xl border px-3 py-2.5 text-left transition-colors"
                      style={{
                        borderColor: isSelected ? '#34483c' : '#e4e9e5',
                        backgroundColor: isSelected ? '#34483c' : '#f8faf8',
                        color: isSelected ? '#ffffff' : '#34483c',
                      }}
                    >
                      <span className="block text-xs font-semibold leading-tight">
                        Données du {day.date}
                      </span>
                      <span
                        className="mt-1 block text-xs"
                        style={{ color: isSelected ? '#e5ece7' : '#59675e' }}
                      >
                        {day.count} échantillons
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 px-5 pb-2">
                <span className="text-xs font-medium" style={{ color: '#46564c' }}>
                  Heure · famille · taille · concentration · confiance
                </span>
                <span className="shrink-0 text-xs" style={{ color: '#59675e' }}>
                  {selectedDay.records.length} résultats
                </span>
              </div>

              <div className="space-y-2 overflow-y-auto px-3 pb-3" style={{ maxHeight: 226 }}>
                {selectedDay.records.map((record) => (
                  <div
                    key={record.time}
                    className="flex items-center gap-3 rounded-xl p-2.5"
                    style={{ backgroundColor: '#f2f5f3' }}
                  >
                    <img
                      src={record.image}
                      alt={record.imageAlt}
                      className="h-16 w-16 shrink-0 rounded-lg object-contain"
                      style={{ backgroundColor: '#242a27' }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                        <p className="text-sm font-semibold" style={{ color: '#26352f' }}>
                          {record.time}
                        </p>
                        <p className="text-xs font-medium" style={{ color: '#46564c' }}>
                          {record.size} · {record.concentration}
                        </p>
                      </div>
                      <p className="mt-1 break-words text-sm leading-snug" style={{ color: '#46564c' }}>
                        {record.family}
                      </p>
                      <p className="mt-1 text-xs font-medium" style={{ color: '#2d6847' }}>
                        Confiance · {record.confidence} %
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <button
              type="button"
              aria-expanded={panelOpen}
              onClick={() => setPanelOpen(true)}
              className="flex h-16 w-full items-center justify-center gap-2 text-sm font-semibold transition-colors hover:bg-[#f8faf8]"
              style={{ color: '#34483c' }}
            >
              <span aria-hidden="true">▤</span>
              Voir les données de prélèvement
            </button>
          )}
          <div className="mx-auto mb-2 mt-1 h-1 w-24 rounded-full" style={{ backgroundColor: '#26352f' }} />
        </div>
      </div>
    </div>
  );
}

function ApplicationsSection() {
  const reduceMotion = useReducedMotion();
  const reveal = {
    initial: { opacity: 0, y: reduceMotion ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: reduceMotion ? 0.2 : 0.6 },
  };

  return (
    <section
      id="applications"
      aria-labelledby="applications-heading"
      className="scroll-mt-24 border-t border-current/15 bg-[var(--color-surface-raised)] py-14 sm:py-18 lg:py-24"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 sm:gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        <motion.div {...reveal} className="max-w-xl">
          <p className="mb-4 text-xs uppercase tracking-[0.24em] text-neutral-500">
            Application PAIC
          </p>
          <h2
            id="applications-heading"
            className="mb-6 text-3xl font-medium tracking-tight sm:text-4xl lg:text-[3.5rem]"
          >
            Comment fonctionne la surveillance de la qualité de l’eau&nbsp;?
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-neutral-600 md:mt-6 md:text-lg">
            Le PAIC analyse les particules présentes dans l’eau et rassemble les
            résultats dans une interface claire. Chaque prélèvement peut être
            retrouvé par date, puis consulté individuellement.
          </p>

          <div className="mt-7 space-y-0 border-t border-current/15 sm:mt-8">
            <div className="flex gap-5 border-b border-current/15 py-5">
              <span className="pt-0.5 text-xs tracking-[0.16em] text-neutral-400">01</span>
              <div>
                <h3 className="text-base font-medium">Suivre les prélèvements</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
                  Consultez les données regroupées par jour et le nombre d’échantillons analysés.
                </p>
              </div>
            </div>
            <div className="flex gap-5 border-b border-current/15 py-5">
              <span className="pt-0.5 text-xs tracking-[0.16em] text-neutral-400">02</span>
              <div>
                <h3 className="text-base font-medium">Identifier les particules</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
                  Retrouvez l’image de la particule, l’heure, la famille d’espèce,
                  la taille et la concentration.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          {...reveal}
          transition={{
            duration: reduceMotion ? 0.2 : 0.6,
            delay: reduceMotion ? 0 : 0.12,
          }}
          className="relative flex justify-center lg:justify-end"
        >
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 rounded-full lg:block"
            style={{
              width: 448,
              height: 448,
              backgroundImage: 'radial-gradient(circle, rgba(168,185,155,0.13), transparent 68%)',
            }}
          />
          <div className="relative w-full">
            <SamplingPhone />
          </div>
        </motion.div>
      </div>

      <p className="mx-auto mt-8 max-w-7xl px-6 text-center text-xs leading-relaxed text-neutral-500 sm:mt-10">
        Mesures et pourcentages de confiance fictifs à titre illustratif. Les images libres
        illustrent les familles de particules et ne sont pas associées aux mesures présentées.
        Les capacités d’analyse devront être validées expérimentalement.
      </p>
      <p className="mx-auto mt-3 max-w-7xl px-6 text-center text-xs leading-relaxed text-neutral-500">
        Crédits des images :{' '}
        <a
          href="https://commons.wikimedia.org/wiki/File:Alexandrium_catenella.jpg"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2 hover:text-neutral-300"
        >
          Alexandrium catenella, Me.garneau
        </a>{' '}
        (
        <a
          href="https://creativecommons.org/licenses/by-sa/3.0/"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2 hover:text-neutral-300"
        >
          CC BY-SA 3.0
        </a>
        ) ·{' '}
        <a
          href="https://commons.wikimedia.org/wiki/File:Skeletonema_1000.JPG"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2 hover:text-neutral-300"
        >
          Skeletonema costatum, Mgueret
        </a>{' '}
        (
        <a
          href="https://creativecommons.org/licenses/by-sa/3.0/"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2 hover:text-neutral-300"
        >
          CC BY-SA 3.0
        </a>
        ) ·{' '}
        <a
          href="https://commons.wikimedia.org/wiki/File:Microfibre_Pollair_microplastique_filtre_machine_a_laver.webp"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2 hover:text-neutral-300"
        >
          Fibres microplastiques, U. Pirc et al.
        </a>{' '}
        (
        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2 hover:text-neutral-300"
        >
          CC BY 4.0
        </a>
        )
      </p>
    </section>
  );
}

export default ApplicationsSection;
