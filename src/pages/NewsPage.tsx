import { Link } from 'react-router';

function NewsPage() {
  return (
    <section aria-labelledby="news-heading" className="px-6 pb-16 pt-12 sm:pb-20 sm:pt-16 md:pb-24">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
          Actualités
        </p>
        <h1 id="news-heading" className="mt-5 max-w-3xl text-4xl font-medium leading-tight tracking-tight sm:text-5xl md:text-6xl">
          Suivre les avancées du PAIC.
        </h1>
        <div className="mt-8 max-w-2xl md:mt-10">
          <p className="text-base leading-relaxed text-neutral-600 md:text-lg">
            Le projet progresse de la validation de la détection vers le
            développement du prototype, puis les essais pilotes. La feuille de
            route présente les étapes terminées, les travaux en cours et les
            prochaines échéances.
          </p>
          <Link
            to="/#avancement"
            className="mt-7 inline-flex min-h-11 items-center rounded-full border border-current/25 px-5 py-2 text-sm font-medium transition-colors hover:bg-white/10"
          >
            Voir la feuille de route
            <span aria-hidden="true" className="ml-2">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NewsPage;
