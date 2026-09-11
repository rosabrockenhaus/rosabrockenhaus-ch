import { config, fields, collection, singleton } from '@keystatic/core'

// 'local' storage needs zero authentication — it just reads/writes the filesystem directly. That's
// fine on a developer's own machine, but if a production deploy ever falls back to it (because the
// GitHub App credentials aren't set yet), /keystatic would be world-readable/writable with no login
// gate. src/app/keystatic/layout.tsx and src/app/api/keystatic/[...params]/route.ts both check this
// flag and 404 the whole admin UI in production until real GitHub-backed storage is configured.
//
// This must read a NEXT_PUBLIC_ variable, not KEYSTATIC_GITHUB_CLIENT_ID directly: this file is
// also imported by src/app/keystatic/keystatic.ts, a 'use client' component, and Next.js only
// inlines NEXT_PUBLIC_ vars into the browser bundle — a non-public var would resolve to `undefined`
// client-side, making the browser think storage is 'local' while the server thinks 'github' (the
// client then calls the local-only /api/keystatic/tree route, which 404s on a github-mode server).
// The client ID itself isn't secret — it's already visible in the GitHub OAuth redirect URL.
export const isGithubStorageConfigured = Boolean(process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_CLIENT_ID)

export default config({
  // Falls back to 'local' storage whenever the GitHub App credentials aren't set yet (local dev,
  // or a production deploy before the GitHub App is created) — Keystatic's 'github' storage mode
  // throws a hard error at build time if KEYSTATIC_GITHUB_CLIENT_ID/SECRET/KEYSTATIC_SECRET are
  // missing, which would break `next build` for the whole site, not just /keystatic.
  storage: isGithubStorageConfigured
    ? { kind: 'github', repo: { owner: 'rosabrockenhaus', name: 'rosabrockenhaus-ch' } }
    : { kind: 'local' },

  collections: {
    blog: collection({
      label: 'Blog',
      path: 'content/blog/*',
      slugField: 'title',
      format: { contentField: 'body' },
      schema: {
        title: fields.slug({ name: { label: 'Titel' } }),
        excerpt: fields.text({ label: 'Auszug', multiline: true }),
        date: fields.text({ label: "Datum (Anzeigetext, z.B. '12. Juni 2026')" }),
        dateISO: fields.date({ label: 'Datum (für Sortierung)' }),
        category: fields.select({
          label: 'Kategorie',
          options: [
            { label: 'Shop', value: 'Shop' },
            { label: 'Nachhaltigkeit', value: 'Nachhaltigkeit' },
            { label: 'Verein', value: 'Verein' },
            { label: 'Werkstätten', value: 'Werkstätten' },
          ],
          defaultValue: 'Shop',
        }),
        readingTime: fields.integer({ label: 'Lesezeit (Minuten)', defaultValue: 2 }),
        body: fields.markdoc({ label: 'Inhalt' }),
      },
    }),
  },

  singletons: {
    banner: singleton({
      label: 'Ankündigungsbanner',
      path: 'content/banner',
      format: { data: 'json' },
      schema: {
        enabled: fields.checkbox({ label: 'Banner anzeigen', defaultValue: true }),
        discount: fields.text({ label: "Rabatt-Highlight (z.B. '50%')" }),
        message: fields.text({ label: 'Nachricht', multiline: true }),
        ctaLabel: fields.text({ label: 'Button-Text' }),
        ctaHref: fields.text({ label: 'Button-Link (z.B. /shop)' }),
      },
    }),

    homepage: singleton({
      label: 'Startseite',
      path: 'content/homepage',
      format: { data: 'json' },
      schema: {
        hero: fields.object(
          {
            headlineHighlight: fields.text({ label: "Titel-Highlight (z.B. 'Rosa')" }),
            headlineRest: fields.text({ label: 'Titel (Rest des Satzes)' }),
            subcopy: fields.text({ label: 'Untertext', multiline: true }),
            primaryCtaLabel: fields.text({ label: 'Haupt-Button Text' }),
            primaryCtaHref: fields.text({ label: 'Haupt-Button Link' }),
            secondaryCtaLabel: fields.text({ label: 'Zweiter Button Text' }),
            secondaryCtaHref: fields.text({ label: 'Zweiter Button Link' }),
            contactPhone: fields.text({ label: 'Kontaktkarte: Telefon' }),
            contactEmail: fields.text({ label: 'Kontaktkarte: E-Mail' }),
          },
          { label: 'Hero (oberster Bereich)' }
        ),
        promos: fields.array(
          fields.object({
            icon: fields.select({
              label: 'Icon',
              options: [
                { label: 'Studierende (GraduationCap)', value: 'GraduationCap' },
                { label: 'Kundenkarte (CreditCard)', value: 'CreditCard' },
                { label: 'Bon (Gift)', value: 'Gift' },
              ],
              defaultValue: 'Gift',
            }),
            eyebrow: fields.text({ label: 'Kategorie (kurz)' }),
            summary: fields.text({ label: 'Zusammenfassung' }),
            details: fields.array(fields.text({ label: 'Detail' }), {
              label: 'Details',
              itemLabel: (p) => p.value,
            }),
          }),
          { label: 'Aktionen & Treuevorteile', itemLabel: (p) => p.fields.eyebrow.value },
        ),
      },
    }),

    team: singleton({
      label: 'Vorstand',
      path: 'content/team',
      format: { data: 'json' },
      schema: {
        members: fields.array(
          fields.object({
            name: fields.text({ label: 'Name' }),
            role: fields.text({ label: 'Rolle' }),
            photo: fields.image({
              label: 'Foto',
              directory: 'public/media/verein',
              publicPath: '/media/verein/',
            }),
          }),
          { label: 'Mitglieder', itemLabel: (p) => p.fields.name.value },
        ),
      },
    }),

    hours: singleton({
      label: 'Öffnungszeiten',
      path: 'content/hours',
      format: { data: 'json' },
      schema: {
        label: fields.text({ label: 'Titel' }),
        note: fields.text({ label: 'Hinweis', multiline: true }),
        hours: fields.array(
          fields.object({
            days: fields.text({ label: 'Tage' }),
            time: fields.text({ label: "Zeit (oder 'geschlossen')" }),
          }),
          { label: 'Zeiten', itemLabel: (p) => p.fields.days.value },
        ),
      },
    }),

    categories: singleton({
      label: 'Shop-Kategorien',
      path: 'content/categories',
      format: { data: 'json' },
      schema: {
        categories: fields.array(
          fields.object({
            id: fields.text({ label: 'ID (intern, z.B. "kleidung" — nicht ändern)' }),
            name: fields.text({ label: 'Name' }),
            description: fields.text({ label: 'Beschreibung', multiline: true }),
            image: fields.image({
              label: 'Foto',
              directory: 'public/media',
              publicPath: '/media/',
            }),
            alt: fields.text({ label: 'Alt-Text (Bildbeschreibung für Screenreader)' }),
            examples: fields.array(fields.text({ label: 'Beispiel' }), {
              label: 'Beispiele',
              itemLabel: (p) => p.value,
            }),
            featured: fields.checkbox({ label: 'Auf Startseite zeigen', defaultValue: false }),
          }),
          { label: 'Kategorien', itemLabel: (p) => p.fields.name.value },
        ),
      },
    }),

    services: singleton({
      label: 'Dienstleistungen',
      path: 'content/services',
      format: { data: 'json' },
      schema: {
        services: fields.array(
          fields.object({
            id: fields.text({ label: 'ID (intern, nicht ändern)' }),
            slug: fields.text({ label: 'Slug (für Anker-Link, nicht ändern)' }),
            title: fields.text({ label: 'Titel' }),
            subtitle: fields.text({ label: 'Untertitel' }),
            icon: fields.select({
              label: 'Icon',
              options: [
                { label: 'Umzug (Truck)', value: 'Truck' },
                { label: 'Räumung (Home)', value: 'Home' },
                { label: 'Reinigung (Sparkles)', value: 'Sparkles' },
                { label: 'Entsorgung (Recycle)', value: 'Recycle' },
                { label: 'Abholung (PackageCheck)', value: 'PackageCheck' },
              ],
              defaultValue: 'Truck',
            }),
            description: fields.text({ label: 'Beschreibung', multiline: true }),
            features: fields.array(fields.text({ label: 'Merkmal' }), {
              label: 'Merkmale',
              itemLabel: (p) => p.value,
            }),
            faq: fields.array(
              fields.object({
                question: fields.text({ label: 'Frage' }),
                answer: fields.text({ label: 'Antwort', multiline: true }),
              }),
              { label: 'FAQ', itemLabel: (p) => p.fields.question.value },
            ),
          }),
          { label: 'Services', itemLabel: (p) => p.fields.title.value },
        ),
      },
    }),
  },
})
