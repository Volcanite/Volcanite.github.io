import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router';
import jacquesCartierAerial from '../assets/jacques-cartier-river-aerial.jpg';
import jacquesCartierAerialHd from '../assets/jacques-cartier-river-aerial-1920.jpg';

const titleLines = [
  'Observer l’invisible',
  'pour mieux protéger l’eau.',
];

function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate flex min-h-[85vh] items-center overflow-hidden">
      <motion.figure
        initial={{ opacity: 0, x: reduceMotion ? 0 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: reduceMotion ? 0.2 : 0.9,
          delay: reduceMotion ? 0 : 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="hero-image-wave absolute inset-0 z-0 overflow-hidden"
      >
        <img
          src={jacquesCartierAerial}
          srcSet={`${jacquesCartierAerial} 960w, ${jacquesCartierAerialHd} 1920w`}
          sizes="100vw"
          alt="Vue aérienne de la rivière Jacques-Cartier au milieu de la forêt québécoise."
          className="absolute inset-0 h-full w-full object-cover object-[58%_78%]"
          style={{ height: '100%' }}
          fetchPriority="high"
        />
        <figcaption className="absolute inset-x-2 bottom-3 text-right text-[8px] leading-tight text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)] sm:inset-x-5 sm:bottom-5 sm:text-[10px]">
          Rivière Jacques-Cartier · Photo :{' '}
          <a
            href="https://commons.wikimedia.org/wiki/File:Rivi%C3%A8re_Jacques-Cartier_(Sainte-Catherine-de-la-Jacques-Cartier)_-_Vue_a%C3%A9rienne_5.jpg"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2"
          >
            Gabriel Picard / Wikimedia Commons
          </a>
          {' · '}
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2"
          >
            CC BY-SA 4.0
          </a>
        </figcaption>
      </motion.figure>
      <svg aria-hidden="true" className="pointer-events-none absolute h-0 w-0">
        <defs>
          <clipPath id="hero-image-wave-desktop" clipPathUnits="objectBoundingBox">
            <path d="M .43 1 C .47 .72, .78 .25, .8 0 L 1 0 L 1 1 Z" />
          </clipPath>
          <clipPath id="hero-image-wave-mobile" clipPathUnits="objectBoundingBox">
            <path d="M .73 1 C .75 .72, .86 .25, .92 0 L 1 0 L 1 1 Z" />
          </clipPath>
        </defs>
      </svg>
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24">
        <div className="w-[72%] sm:w-[68%] lg:w-[66%]">
          <h1 className="hero-title text-[clamp(1rem,5.2vw,4.75rem)] font-medium leading-[1.15] tracking-tight [text-shadow:-3px_4px_5px_rgb(0_0_0_/_32%)]">
            {titleLines.map((line, index) => (
              <span
                key={line}
                className="mb-[-0.12em] block overflow-hidden whitespace-nowrap pb-[0.12em]"
              >
                <motion.span
                  className={`block ${index > 0 ? 'text-neutral-800' : ''}`}
                  initial={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: '110%' }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: reduceMotion ? 0.2 : 0.8,
                    delay: reduceMotion ? 0 : 0.3 + index * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0.2 : 0.7,
              delay: reduceMotion ? 0 : 0.85,
            }}
            className="hero-copy mt-8 max-w-xl leading-relaxed text-neutral-600"
          >
            Chaque été, la chaleur et l’excès de nutriments favorisent les
            proliférations d’algues nuisibles, menaçant les écosystèmes et les
            communautés. Pourtant, les algues ne sont pas l’ennemi : c’est
            l’équilibre de l’eau qu’il faut comprendre. Navelys analyse en continu
            les particules microscopiques pour repérer les déséquilibres avant
            qu’il ne soit trop tard.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0.2 : 0.6,
              delay: reduceMotion ? 0 : 1,
            }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="https://navelys.com/problematique"
              className="rounded-full border border-neutral-800 px-3 py-3 text-xs transition-colors hover:bg-neutral-800 hover:text-neutral-900 focus-visible:outline-2 sm:px-6 sm:text-sm"
            >
              Comprendre la problématique
            </a>

            <Link
              to="/contact"
              className="rounded-full border border-neutral-800 px-3 py-3 text-xs text-neutral-600 transition-colors hover:bg-neutral-800 hover:text-neutral-900 focus-visible:outline-2 sm:px-6 sm:text-sm"
            >
              Discuter d’un partenariat ↗
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
