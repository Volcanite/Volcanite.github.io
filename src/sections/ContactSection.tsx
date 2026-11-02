
import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router';

function ContactSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="px-6 pb-24 pt-12 md:pb-32 md:pt-16">
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: reduceMotion ? 0.2 : 0.7 }}
        className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-neutral-900 px-6 py-14 text-white md:px-14 md:py-20 lg:px-20"
      >
        <div className="grid items-end gap-10 md:grid-cols-[1fr_auto] md:gap-12">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-neutral-400">
              Construisons la suite ensemble
            </p>

            <h2 className="mt-6 text-3xl font-medium leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Des expertises différentes, un même objectif.
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-300 md:text-lg">
              Surveillance environnementale, suivi d’un traitement
              ou recherche scientifique : nous développons le PAIC et
              souhaitons échanger avec les personnes qui connaissent ces
              enjeux sur le terrain. Notre objectif : contribuer à préserver
              la qualité de l’eau pour les générations futures.
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 md:items-end">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 rounded-full bg-neutral-800 px-6 py-4 text-sm font-medium text-neutral-900 transition-transform duration-200 hover:scale-[1.03] hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-800"
            >
              Parlons de vos besoins
              <span aria-hidden="true">↗</span>
            </Link>

            <p className="text-sm text-neutral-400">
              Un premier échange, sans engagement.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default ContactSection;
