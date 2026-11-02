import { Link } from 'react-router';
import karimPortrait from '../assets/Karim.png';
import matisPortrait from '../assets/Matis.png';
import rinPortrait from '../assets/Rin.png';

const founders = [
  {
    name: 'Karim Bouzid',
    role: 'Fondateur',
    portrait: karimPortrait,
    description:
      'Au secondaire, Karim découvre les microorganismes aquatiques et imagine un instrument pour les observer sans préparation manuelle. Formé en génie électrique, il développe une première preuve de concept du PAIC pendant sa maîtrise.',
  },
  {
    name: 'Matis Garbez',
    role: 'Co-fondateur',
    portrait: matisPortrait,
    description:
      'Enfant, Matis explorait les fonds de la Méditerranée. En voyant certains lieux se dégrader, il a voulu agir. Il consacre aujourd’hui sa maîtrise en ingénierie au PAIC, convaincu que son savoir-faire peut contribuer à protéger ces milieux.',
  },
  {
    name: 'Rin Baudelet',
    role: 'Co-fondatrice',
    portrait: rinPortrait,
    description:
      'Rin rejoint l’aventure à mesure que le projet grandit. Avec Karim et Matis, elle contribue à faire avancer un instrument autonome pour mieux observer les microorganismes aquatiques.',
  },
];

function AboutPage() {
  return (
    <div className="px-6 pb-16 pt-12 sm:pb-20 sm:pt-16">
      <header className="mx-auto max-w-7xl">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
          À propos de Navelys
        </p>
        <h1 className="mt-5 max-w-4xl text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
          Trois parcours, une même envie de{' '}
          <span className="text-green-400">protéger l’eau.</span>
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-neutral-600 md:text-lg">
          Il y a 14 ans, la curiosité de Karim pour les microorganismes aquatiques
          lui donne une idée : les observer sans préparation manuelle. De cette
          intuition est né le PAIC, un projet devenu l’engagement commun de
          Karim, Matis et Rin : mieux comprendre l’eau pour mieux la protéger.
        </p>
      </header>

      <section
        aria-labelledby="team-heading"
        className="mx-auto mt-12 max-w-7xl sm:mt-16"
      >
        <div className="mb-7 flex flex-col gap-2 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="team-heading" className="text-2xl sm:text-3xl">
            Les personnes derrière le projet
          </h2>
          <p className="text-sm text-neutral-500">Trois personnes, un projet commun.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {founders.map((founder) => (
            <article
              key={founder.name}
              className="overflow-hidden rounded-2xl border border-neutral-200 bg-[var(--color-surface)]"
            >
              <img
                src={founder.portrait}
                alt={`Portrait de ${founder.name}`}
                className="aspect-[4/4.5] w-full object-cover object-top sm:aspect-[4/4.8]"
                loading="lazy"
              />
              <div className="p-5 sm:p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                  {founder.role}
                </p>
                <h3 className="mt-2 text-xl font-medium tracking-tight">
                  {founder.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  {founder.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-label="Le projet aujourd’hui"
        className="mx-auto mt-8 flex max-w-7xl flex-col gap-4 rounded-2xl border border-neutral-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7"
      >
        <p className="max-w-3xl text-sm leading-relaxed text-neutral-600">
          D’une première preuve de concept à un prototype fonctionnel en
          laboratoire, le PAIC se développe avec des partenaires de recherche
          et des organismes publics. Un projet pilote est visé pour juin 2027.
        </p>
        <Link
          to="/contact"
          className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-current/25 px-5 py-2 text-sm font-medium transition-colors hover:bg-white/10"
        >
          Nous contacter
        </Link>
      </section>
    </div>
  );
}

export default AboutPage;
