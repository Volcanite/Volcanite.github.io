import { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import HologramBrut from '../assets/Hologramme_Brut_recadre.png';
import HologramReconstruit from '../assets/Hologramme_reconstruit.png';

const stages = [
  {
    number: '01',
    title: 'La particule est détectée dans le microcanal',
    description:
      'Le contrôleur embarqué mesure le signal à l’entrée de la zone de détection. Au passage de la particule, le convertisseur analogique-numérique (ADC) enregistre une variation caractéristique.',
  },
  {
    number: '02',
    title: 'Le laser éclaire la particule, la caméra la capture',
    description:
      'La détection synchronise le laser avec le passage de la particule. La lumière interagit avec elle et l’image holographique est capturée par la caméra. Cette méthode permet de ne pas dépendre de la position de la particule dans le microcanal.',
  },
  {
    number: '03',
    title: 'L’image brute est reconstruite numériquement',
    description:
      'L’hologramme capturé est traité pour produire une image reconstruite, prête à être analysée. Cette reconstruction est réalisée par un algorithme développé par Navelys, qui ne nécessite pas de calibration ni d’optique complexe.',
  },
  {
    number: '04',
    title: 'Le résultat est enregistré et classifié',
    description:
      'Les caractéristiques mesurées sont associées à une famille de particules selon un seuil de confiance, puis le résultat est enregistré dans la base de données. Les résultats pourront ensuite être consultés dans l’application.',
  },
] as const;

const classificationRecords = [
  { id: '001', family: 'Cyanobactérie', size: '42 µm', probability: '0,94' },
  { id: '002', family: 'Diatomée', size: '28 µm', probability: '0,93' },
  { id: '003', family: 'Microalgue', size: '6 µm', probability: '0,91' },
  { id: '004', family: 'Microplastique', size: '85 µm', probability: '0,88' },
] as const;

function HowIsWork() {
  const experienceRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeStage, setActiveStage] = useState(0);
  const { scrollYProgress } = useScroll({
    target: experienceRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const nextStage = Math.min(stages.length - 1, Math.floor(progress * stages.length));
    setActiveStage(nextStage);
  });

  const particlePositionPercent = useTransform(
    scrollYProgress,
    [0, 0.16, 0.25, 0.38, 0.5],
    [4, 36, 50, 68, 84],
  );
  const particlePosition = useTransform(
    particlePositionPercent,
    (position) => `${position}%`,
  );
  const arrowProgress = useTransform(
    particlePositionPercent,
    [42, 65],
    [0, 1],
  );
  const laserProgress = useTransform(particlePositionPercent, [65, 72], [0, 1]);
  const laserBeamOpacity = useTransform(particlePositionPercent, [72, 74], [1, 0]);
  const laserDeviceOpacity = useTransform(particlePositionPercent, [72, 74], [1, 0]);
  const waveformProgress = useTransform(scrollYProgress, [0.08, 0.13, 0.15, 0.3], [0, 0, 1, 1]);
  const sensorSignalOpacity = useTransform(scrollYProgress, [0.16, 0.35, 0.48, 0.5], [1, 1, 0.2, 0.08]);
  const cameraOpacity = useTransform(particlePositionPercent, [74, 77], [0, 1]);
  const cameraBeamProgress = useTransform(particlePositionPercent, [74, 75.5], [0, 1]);
  const sceneKey = activeStage < 2 ? 'channel' : activeStage === 2 ? 'reconstruction' : 'classification';

  return (
    <section
      id="fonctionnement"
      aria-labelledby="how-it-works-heading"
      className="relative border-t border-current/15"
    >
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-20 sm:pb-16 sm:pt-28">
        <div className="max-w-3xl">
          <p className="mb-5 text-xs uppercase tracking-[0.24em] text-neutral-500">
            Du prélèvement à la classification
          </p>
          <h2
            id="how-it-works-heading"
            className="text-4xl font-medium tracking-tight sm:text-5xl"
          >
            Comment fonctionne le dispositif&nbsp;?
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 md:text-lg">
            Faites défiler pour suivre une particule, de sa détection à son enregistrement.
          </p>
        </div>
      </div>

      <div ref={experienceRef} className="relative h-[200vh] sm:h-[220vh] lg:h-[260vh]">
        <div className="sticky top-20 flex h-[calc(100svh-5rem)] items-center">
          <div className="how-it-works-experience-layout mx-auto grid w-full max-w-none items-center gap-6 px-4 sm:px-6 2xl:px-10 lg:gap-10">
            <div className="min-w-0 px-2 sm:px-4 lg:px-0">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-neutral-500">
                Étape {stages[activeStage].number} / 04
              </p>
              <div className="mb-5 flex gap-1.5" aria-hidden="true">
                {stages.map((stage, index) => (
                  <span
                    key={stage.number}
                    className="h-1 w-8 rounded-full transition-colors duration-300"
                    style={{
                      backgroundColor:
                        index <= activeStage
                          ? 'var(--color-accent)'
                          : 'rgb(238 232 220 / 20%)',
                    }}
                  />
                ))}
              </div>
              <div className="min-h-36 sm:min-h-32 lg:min-h-56">
                <AnimatePresence mode="wait">
                  <motion.article
                    key={activeStage}
                    aria-live="polite"
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: reduceMotion ? 0 : 0.3, ease: 'easeOut' }}
                  >
                    <p className="mb-3 text-sm tracking-[0.16em] text-[var(--color-accent)]">
                      {stages[activeStage].number}
                    </p>
                    <h3 className="max-w-lg text-2xl font-medium tracking-tight sm:text-3xl lg:text-4xl">
                      {stages[activeStage].title}
                    </h3>
                    <p className="mt-4 max-w-lg text-sm leading-relaxed text-neutral-600 sm:text-base">
                      {stages[activeStage].description}
                    </p>
                  </motion.article>
                </AnimatePresence>
              </div>
              <p className="mt-4 hidden text-xs text-neutral-500 sm:block">
                Faites défiler pour passer à l’étape suivante.
              </p>
            </div>

            <div className="min-w-0">
              <div className="overflow-hidden rounded-2xl border border-current/10 bg-[#242927] p-3 shadow-2xl sm:p-5 lg:p-7">
                <AnimatePresence mode="wait" initial={false}>
                  {sceneKey === 'channel' && (
                    <motion.div
                      key="channel"
                      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                      transition={{ duration: reduceMotion ? 0 : 0.3 }}
                    >
                      <div className="relative min-h-[390px] sm:min-h-[530px]">
                        <motion.div
                          className="absolute left-[3%] top-[5%] z-10 w-[45%] rounded-lg border border-current/15 bg-[#202522] p-2 sm:p-3"
                          style={{ opacity: reduceMotion ? 0.8 : sensorSignalOpacity }}
                        >
                          <div className="mb-1 flex items-center justify-between gap-2">
                            <span className="text-[9px] font-medium tracking-[0.12em] text-neutral-400 sm:text-xs">
                              ADC · MESURE DU SIGNAL
                            </span>
                            <span className="text-[9px] text-neutral-500 sm:text-xs">TENSION · TEMPS</span>
                          </div>
                          <svg
                            viewBox="0 0 420 190"
                            role="img"
                            aria-label="Signal ADC : plateau au repos, creux et pic lors du passage de la particule"
                            className="h-auto w-full"
                          >
                            <path d="M42 20v132h365M42 53h365M42 86h365M42 119h365" fill="none" stroke="#66736a" strokeOpacity=".4" strokeWidth="1" />
                            <path d="M96 20v132m90-132v132m90-132v132m90-132v132" fill="none" stroke="#66736a" strokeOpacity=".25" strokeWidth="1" />
                            <path d="M44 80h141m114-2h102" fill="none" stroke="#4594bf" strokeWidth="5" strokeLinecap="round" />
                            <motion.path
                              d="M185 81 194 82 202 94 209 120 217 141 225 145 233 127 241 88 249 46 257 30 265 42 273 76 281 88 289 81 299 78"
                              fill="none"
                              stroke="#4594bf"
                              strokeWidth="5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              style={{
                                pathLength: reduceMotion ? 1 : waveformProgress,
                                opacity: reduceMotion ? 1 : waveformProgress,
                              }}
                            />
                            <motion.text
                              x="210"
                              y="17"
                              fill="#c1c8bd"
                              fontSize="12"
                              fontWeight="700"
                              style={{ opacity: reduceMotion ? 1 : waveformProgress }}
                            >
                              PASSAGE PARTICULE
                            </motion.text>
                            <text x="105" y="48" fill="#c1c8bd" fontSize="13">Repos</text>
                            <text x="303" y="48" fill="#c1c8bd" fontSize="13">Repos</text>
                            <text x="2" y="62" fill="#929d91" fontSize="10">2.0 V</text>
                            <text x="2" y="150" fill="#929d91" fontSize="10">1.5 V</text>
                          </svg>
                        </motion.div>

                        <svg
                          viewBox="0 0 1000 720"
                          preserveAspectRatio="none"
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible"
                        >
                          <defs>
                            <filter id="how-work-glow" x="-100%" y="-100%" width="300%" height="300%">
                              <feGaussianBlur stdDeviation="5" result="blur" />
                              <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                              </feMerge>
                            </filter>
                            <marker
                              id="how-work-arrow"
                              viewBox="0 0 10 10"
                              refX="8"
                              refY="5"
                              markerWidth="7"
                              markerHeight="7"
                              orient="auto"
                            >
                              <path d="M0 0 10 5 0 10Z" fill="#91cfe0" />
                            </marker>
                            <marker
                              id="how-work-sync-arrow"
                              viewBox="0 0 10 10"
                              refX="8"
                              refY="5"
                              markerWidth="7"
                              markerHeight="7"
                              orient="auto"
                            >
                              <path d="M0 0 10 5 0 10Z" fill="#a8d7a5" />
                            </marker>
                          </defs>
                          <motion.path
                            d="M475 99H646"
                            fill="none"
                            stroke="#a8d7a5"
                            strokeWidth="3"
                            strokeDasharray="8 8"
                            markerEnd="url(#how-work-sync-arrow)"
                            style={{
                              pathLength: reduceMotion ? 1 : arrowProgress,
                              opacity: reduceMotion ? 0.8 : arrowProgress,
                            }}
                          />
                          <motion.g style={{ opacity: reduceMotion ? 1 : laserDeviceOpacity }}>
                            <text
                              x="684"
                              y="40"
                              fill="#c1c8bd"
                              fontSize="12"
                              letterSpacing="1"
                            >
                              LASER
                            </text>
                            <path
                              d="M663 22v31q0 13 13 13h7"
                              fill="none"
                              stroke="#829184"
                              strokeWidth="5"
                              strokeLinecap="round"
                            />
                            <path d="M683 55h25v13h-25z" fill="#303833" stroke="#829184" strokeWidth="2" />
                            <path d="M680 68h31v13h-31zm2 13h27v10h-27zm2 10h23v10h-23z" fill="#303833" stroke="#829184" strokeWidth="1.5" />
                            <path d="M684 101h19v12l-9.5 13-9.5-13z" fill="#303833" stroke="#829184" strokeWidth="1.5" />
                            <path d="M689 111h9" stroke="#91cfe0" strokeWidth="2" />
                            <path d="M679 71h5v9h-5m29-9h5v9h-5" fill="#242927" stroke="#66736a" strokeWidth="1" />

                            <motion.g
                              fill="none"
                              stroke="#e9a160"
                              strokeWidth="2.5"
                              filter="url(#how-work-glow)"
                              style={{ opacity: reduceMotion ? 0.8 : laserBeamOpacity }}
                            >
                              <motion.path
                                d="M693 126 702 140 688 153 701 168 690 183 704 198 689 213 702 228 691 243 705 258 690 273 703 288 692 303 705 318 690 333 704 348 691 363 705 378 690 393 704 408 691 423 705 438 689 453 703 468 691 483 705 498 690 513 704 528 692 543 700 557"
                                style={{ pathLength: reduceMotion ? 1 : laserProgress }}
                              />
                            </motion.g>
                            <motion.circle
                              cx="697"
                              cy="558"
                              r="8"
                              fill="#e9a160"
                              filter="url(#how-work-glow)"
                              style={{ opacity: reduceMotion ? 0.35 : laserBeamOpacity }}
                            />

                          </motion.g>

                          <motion.g style={{ opacity: reduceMotion ? 1 : cameraOpacity }}>
                            <text
                              x="697"
                              y="270"
                              fill="#c1c8bd"
                              fontSize="12"
                              textAnchor="middle"
                              letterSpacing="1"
                            >
                              CAMÉRA
                            </text>
                            <g>
                              <path d="M661 296h15l7-10h27l7 10h15v53h-71z" fill="#303833" stroke="#829184" strokeWidth="2" />
                              <path d="M681 348h32v27l-16 20-16-20z" fill="#303833" stroke="#829184" strokeWidth="2" />
                              <path d="M686 354h22v18h-22z" fill="#242927" stroke="#829184" strokeWidth="1.5" />
                              <ellipse cx="697" cy="395" rx="11" ry="5" fill="#303833" stroke="#91cfe0" strokeWidth="2" />
                              <ellipse cx="697" cy="396" rx="5" ry="2.5" fill="#91cfe0" fillOpacity=".35" stroke="#91cfe0" />
                              <path d="M669 305h15m-15 6h10" stroke="#66736a" strokeWidth="1.5" />
                              <circle cx="715" cy="307" r="3" fill="#66736a" />
                            </g>

                            <motion.g
                              fill="none"
                              stroke="#d99a65"
                              strokeWidth="2.5"
                              strokeDasharray="1 4"
                              strokeLinecap="round"
                              filter="url(#how-work-glow)"
                              style={{ opacity: reduceMotion ? 0.8 : cameraBeamProgress }}
                            >
                              <motion.path
                                d="M697 558 690 550 703 542 691 534 701 526 690 518 700 510 692 502 699 494 691 486 698 478 692 470 697 462 693 454 697 446 694 438 697 430 695 422 697 414 697 395"
                                style={{
                                  pathLength: reduceMotion ? 1 : cameraBeamProgress,
                                  opacity: reduceMotion ? 0.8 : cameraBeamProgress,
                                }}
                              />
                            </motion.g>
                          </motion.g>
                        </svg>

                        <div className="absolute inset-x-[5%] top-[66%] z-10 h-[23%] min-h-[70px] rounded-sm border-2 border-[#b5c5b9] bg-gradient-to-b from-[#344139] via-[#29332d] to-[#222b26] sm:min-h-[86px]">
                          <div className="absolute inset-x-3 top-1/2 border-t border-dashed border-[#8da495]/50" />
                          <div className="absolute left-[31%] top-0 h-full w-[11%] border-x-2 border-[#a8d7a5] bg-[#a8d7a5]/10" />
                          <div className="absolute left-[65%] top-0 h-full w-[11%] border-x-2 border-[#91cfe0] bg-[#91cfe0]/10" />
                          <motion.div
                            className="absolute top-1/2 z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#fff1df] bg-[#e9a160] shadow-[0_0_16px_#e9a160]"
                            style={{ left: particlePosition }}
                          />
                          <span className="absolute -left-1 -top-7 text-[9px] font-semibold tracking-wider text-neutral-300 sm:text-xs">
                            ENTRÉE
                          </span>
                          <span className="absolute -right-1 -top-7 text-[9px] font-semibold tracking-wider text-neutral-300 sm:text-xs">
                            SORTIE
                          </span>
                          <span className="absolute left-[31%] top-[calc(100%+6px)] whitespace-nowrap text-[8px] font-semibold tracking-wide text-[#a8d7a5] sm:text-[10px]">
                            01 · DÉTECTION
                          </span>
                          <span className="absolute left-[64%] top-[calc(100%+6px)] whitespace-nowrap text-[8px] font-semibold tracking-wide text-[#91cfe0] sm:text-[10px]">
                            02 · IMAGERIE
                          </span>
                        </div>
                        <p className="absolute inset-x-0 bottom-[2%] text-center text-[9px] tracking-[0.14em] text-neutral-500 sm:text-xs">
                          MICROCANAL FLUIDIQUE
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {sceneKey === 'reconstruction' && (
                    <motion.div
                      key="reconstruction"
                      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                      transition={{ duration: reduceMotion ? 0 : 0.35 }}
                      className="flex min-h-[330px] flex-col justify-center py-5 sm:min-h-[390px] sm:py-8"
                    >
                      <p className="mb-8 text-center text-xs uppercase tracking-[0.18em] text-neutral-500 sm:mb-12">
                        Traitement de l’image holographique
                      </p>
                      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 sm:gap-6">
                        <div className="min-w-0">
                          <p className="mb-3 text-center text-[9px] font-medium tracking-[0.1em] text-neutral-400 sm:text-xs">
                            IMAGE HOLOGRAPHIQUE BRUTE
                          </p>
                          <div className="flex aspect-[1.25] items-center justify-center overflow-hidden rounded-lg border border-[#91cfe0]/40 bg-[#202522] p-1.5 sm:p-3">
                            <img
                              src={HologramBrut}
                              alt="Hologramme brut recadré sur deux particules"
                              className="h-full w-full object-contain"
                            />
                          </div>
                        </div>
                        <div className="flex w-12 flex-col items-center gap-2 text-[#a8b99b] sm:w-36">
                          <span className="text-center text-[8px] font-medium leading-tight tracking-wide sm:text-[10px]">
                            TRAITEMENT
                            <br />
                            NUMÉRIQUE
                          </span>
                          <svg viewBox="0 0 120 24" aria-hidden="true" className="h-4 w-full sm:h-6">
                            <path d="M2 12h108m-14-9 12 9-12 9" fill="none" stroke="currentColor" strokeWidth="2" />
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <p className="mb-3 text-center text-[9px] font-medium tracking-[0.1em] text-neutral-400 sm:text-xs">
                            IMAGE RECONSTRUITE
                          </p>
                          <div className="flex aspect-[1.25] items-center justify-center overflow-hidden rounded-lg border border-[#91cfe0]/40 bg-[#202522] p-1.5 sm:p-3">
                            <img
                              src={HologramReconstruit}
                              alt="Exemple d’image holographique reconstruite"
                              className="h-full w-full object-contain"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {sceneKey === 'classification' && (
                    <motion.div
                      key="classification"
                      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                      transition={{ duration: reduceMotion ? 0 : 0.35 }}
                      className="flex min-h-[330px] items-center justify-center py-5 sm:min-h-[390px] sm:py-8"
                    >
                      <div className="w-full rounded-xl border border-current/15 bg-[#202522] p-3 shadow-xl sm:p-5">
                        <div className="mb-4 flex items-center justify-between gap-3 border-b border-current/10 pb-3 sm:mb-5 sm:pb-4">
                          <div className="flex items-center gap-3">
                            <svg viewBox="0 0 48 48" aria-hidden="true" className="h-9 w-9 text-[#c7bb91] sm:h-12 sm:w-12">
                              <ellipse cx="24" cy="11" rx="16" ry="6" fill="none" stroke="currentColor" strokeWidth="2" />
                              <path d="M8 11v25c0 3 7 6 16 6s16-3 16-6V11M8 23c0 3 7 6 16 6s16-3 16-6M8 31c0 3 7 6 16 6s16-3 16-6" fill="none" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            <div>
                              <h4 className="text-sm font-medium tracking-wide sm:text-lg">Base de données</h4>
                              <p className="text-[10px] text-neutral-500 sm:text-xs">Familles de particules identifiées</p>
                            </div>
                          </div>
                          <span className="text-[9px] tracking-wide text-neutral-500 sm:text-[10px]">
                            4 ENREGISTREMENTS
                          </span>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full min-w-[560px] border-collapse text-left text-[10px] sm:min-w-0 sm:text-xs">
                            <thead>
                              <tr className="border-b border-current/15 text-[8px] uppercase tracking-[0.1em] text-neutral-500 sm:text-[10px]">
                                <th scope="col" className="px-2 py-2 font-medium">ID</th>
                                <th scope="col" className="px-2 py-2 font-medium">Hologramme</th>
                                <th scope="col" className="px-2 py-2 font-medium">Famille</th>
                                <th scope="col" className="px-2 py-2 font-medium">Taille</th>
                                <th scope="col" className="px-2 py-2 text-right font-medium">Confiance</th>
                              </tr>
                            </thead>
                            <tbody>
                              {classificationRecords.map((record, index) => (
                                <tr
                                  key={record.id}
                                  className={`border-b border-current/10 last:border-b-0 ${
                                    index % 2 === 0 ? 'bg-white/[0.035]' : ''
                                  }`}
                                >
                                  <td className="px-2 py-2.5 font-mono text-neutral-400 sm:py-3">
                                    {record.id}
                                  </td>
                                  <td className="px-2 py-2">
                                    <svg
                                      viewBox="0 0 56 44"
                                      role="img"
                                      aria-label={`Hologramme schématique : ${record.family}`}
                                      className="h-9 w-12 rounded border border-current/10 bg-[#151917] p-1 sm:h-11 sm:w-14"
                                    >
                                      {index === 0 && (
                                        <g fill="none" stroke="#aeb8ac" strokeWidth="2">
                                          <path d="M7 29 18 12l11 6-7 14Zm17 2 11-18 12 6-8 16Z" />
                                          <path d="m14 23 5 3m17-1 6 3" />
                                        </g>
                                      )}
                                      {index === 1 && (
                                        <g fill="none" stroke="#aeb8ac" strokeWidth="1.5">
                                          <ellipse cx="28" cy="22" rx="22" ry="8" transform="rotate(-12 28 22)" />
                                          <path d="m11 25 6-8m0 11 7-14m1 14 7-15m1 13 7-11m0 10 5-7" />
                                        </g>
                                      )}
                                      {index === 2 && (
                                        <g fill="none" stroke="#aeb8ac">
                                          <circle cx="28" cy="22" r="15" strokeWidth="2" />
                                          <circle cx="29" cy="21" r="6" strokeWidth="1.5" />
                                          <circle cx="19" cy="27" r="2" fill="#929d91" />
                                          <circle cx="37" cy="16" r="2" fill="#929d91" />
                                        </g>
                                      )}
                                      {index === 3 && (
                                        <g fill="none" stroke="#aeb8ac" strokeWidth="1.5">
                                          <path d="m10 11 11 3 6-5 5 8 13-1-3 9 5 8-14-2-8 5-6-8-12-3Z" />
                                          <path d="m17 18 8 5m10-2 8 6m-18 2 7-7" stroke="#66736a" />
                                        </g>
                                      )}
                                    </svg>
                                  </td>
                                  <th scope="row" className="px-2 py-2.5 font-medium text-neutral-200 sm:py-3">
                                    {record.family}
                                  </th>
                                  <td className="px-2 py-2.5 whitespace-nowrap text-neutral-400 sm:py-3">
                                    {record.size}
                                  </td>
                                  <td className="px-2 py-2.5 text-right font-mono text-[var(--color-accent)] sm:py-3">
                                    {record.probability}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowIsWork;
