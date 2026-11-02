function KeyWordsSection() {
    return (
      <div
        aria-label="Domaines d’expertise"
        className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-2 px-6 py-5 text-xs font-medium uppercase tracking-[0.18em] text-neutral-600 sm:gap-x-8 sm:text-sm"
      >
        <span>Surveillance</span>
        <span aria-hidden="true" className="text-neutral-800">·</span>
        <span>Imagerie</span>
        <span aria-hidden="true" className="text-neutral-800">·</span>
        <span>Classification</span>
      </div>
    );
}

export default KeyWordsSection;