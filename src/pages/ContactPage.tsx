
import { useState, type FormEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';

const topics = [
  'Surveillance de l’eau',
  'Évaluation d’un traitement',
  'Recherche scientifique',
  'Partenariat technique',
  'Autre sujet',
];

function ContactPage() {
  const reduceMotion = useReducedMotion();
  const [topic, setTopic] = useState(topics[0]);
  const [message, setMessage] = useState('');
  const [formNotice, setFormNotice] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Le formulaire n'est pas encore relié à un service d'envoi.
    // Aucun message n'est transmis pour le moment.
    setFormNotice(
      'Le formulaire est prêt, mais son envoi doit encore être configuré. Votre message n’a pas été envoyé.',
    );
  }

  return (
    <section aria-labelledby="contact-heading" className="px-6 pb-20 pt-12 sm:pb-24 sm:pt-16 md:pb-28 md:pt-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0.2 : 0.6 }}
          className="max-w-3xl"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            Contact
          </p>

          <h1 id="contact-heading" className="mt-5 text-4xl font-medium leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Parlons de vos besoins.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 md:text-lg">
            Vous travaillez sur la qualité de l’eau, la restauration
            des milieux aquatiques ou la recherche scientifique ?
            Nous serions ravis d’en apprendre davantage sur vos enjeux
            et d’échanger autour du développement du PAIC.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-10 sm:mt-14 sm:gap-12 md:mt-16 md:grid-cols-[0.8fr_1.2fr] md:gap-16 lg:gap-20">
          {/* Colonne de présentation */}
          <motion.aside
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0.2 : 0.6,
              delay: reduceMotion ? 0 : 0.1,
            }}
            className="flex flex-col justify-between gap-10"
          >
            <div>
              <h2 className="text-xl font-medium tracking-tight">
                Un premier échange, simplement.
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-neutral-600 md:text-base">
                Le PAIC est un projet en développement. Vos retours,
                votre expérience du terrain et vos questions peuvent
                nous aider à mieux comprendre les besoins auxquels
                le dispositif pourrait répondre.
              </p>
            </div>

            <div className="border-t border-neutral-200 pt-6">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                Quelques exemples
              </p>

              <ul className="mt-5 space-y-4">
                {[
                  'Discuter d’un besoin de surveillance de l’eau',
                  'Étudier le suivi d’un traitement',
                  'Échanger sur une collaboration scientifique ou technique',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-800"
                    />
                    <span className="text-sm leading-relaxed text-neutral-600">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-neutral-100 p-5">
              <p className="text-sm font-medium">
                Vous ne savez pas si votre sujet correspond au projet ?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                Ce n’est pas un problème. Présentez-nous simplement
                votre situation, et nous verrons ensemble s’il existe
                des pistes à explorer.
              </p>
            </div>
          </motion.aside>

          {/* Formulaire */}
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0.2 : 0.6,
              delay: reduceMotion ? 0 : 0.2,
            }}
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 md:p-8"
            >
              <div className="mb-8">
                <h2 className="text-xl font-medium tracking-tight">
                  Votre message
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                  Quelques informations suffisent pour commencer.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium"
                  >
                    Nom
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="Votre nom"
                    className="w-full rounded-xl border border-neutral-300 bg-neutral-100 px-4 py-3 text-sm text-neutral-700 outline-none transition focus:border-neutral-800 focus:ring-2 focus:ring-neutral-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium"
                  >
                    Adresse e-mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="vous@organisation.com"
                    className="w-full rounded-xl border border-neutral-300 bg-neutral-100 px-4 py-3 text-sm text-neutral-700 outline-none transition focus:border-neutral-800 focus:ring-2 focus:ring-neutral-200"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="organisation"
                  className="mb-2 block text-sm font-medium"
                >
                  Organisation
                  <span className="ml-2 font-normal text-neutral-400">
                    Facultatif
                  </span>
                </label>
                <input
                  id="organisation"
                  name="organisation"
                  type="text"
                  autoComplete="organization"
                  placeholder="Laboratoire, entreprise, organisme…"
                  className="w-full rounded-xl border border-neutral-300 bg-neutral-100 px-4 py-3 text-sm text-neutral-700 outline-none transition focus:border-neutral-800 focus:ring-2 focus:ring-neutral-200"
                />
              </div>

              <div className="mt-6">
                <label
                  htmlFor="topic"
                  className="mb-2 block text-sm font-medium"
                >
                  Sujet de votre message
                </label>
                <select
                  id="topic"
                  name="topic"
                  value={topic}
                  onChange={(event) => setTopic(event.target.value)}
                  className="w-full rounded-xl border border-neutral-300 bg-neutral-100 px-4 py-3 text-sm text-neutral-700 outline-none transition focus:border-neutral-800 focus:ring-2 focus:ring-neutral-200"
                >
                  {topics.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium"
                >
                  Votre message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(event) => {
                    setMessage(event.target.value);
                    setFormNotice('');
                  }}
                  placeholder="Présentez-nous votre besoin, votre question ou votre idée de collaboration…"
                  className="w-full resize-y rounded-xl border border-neutral-300 bg-neutral-100 px-4 py-3 text-sm leading-relaxed text-neutral-700 outline-none transition focus:border-neutral-800 focus:ring-2 focus:ring-neutral-200"
                />
              </div>

              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-neutral-800 px-6 py-4 text-sm font-medium text-neutral-900 transition hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-800 sm:w-auto"
              >
                Préparer mon message
                <span aria-hidden="true">↗</span>
              </button>

              {formNotice && (
                <p
                  role="status"
                  aria-live="polite"
                  className="mt-4 rounded-xl bg-amber-50 p-4 text-sm leading-relaxed text-amber-900"
                >
                  {formNotice}
                </p>
              )}

              <p className="mt-5 text-xs leading-relaxed text-neutral-500">
                Les champs marqués comme obligatoires doivent être remplis.
                Le formulaire n’est pas encore connecté à un service d’envoi.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
