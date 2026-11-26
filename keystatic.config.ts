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

// ─── Editor guard-rails ──────────────────────────────────────────────────────────────────────────
// The site is maintained by non-technical editors. Everything below exists so the Keystatic form
// itself prevents edits that would break the site — rather than relying on "nicht ändern" labels:
//  - internal links are a dropdown of real pages (no typos / wrong casing → no 404s);
//  - fields the layout needs are required, and short fields have a max length;
//  - URLs, e-mail and phone numbers are checked against a pattern;
//  - ids the code depends on (service ids) are a fixed dropdown, not free text.
// NOTE: src/lib/content.ts reads content through Keystatic's Reader, which re-validates these rules
// at build time. When tightening a rule, make sure the existing content in content/*.json passes.
//
// Media used directly by the code (logo, videos, showcase photos, OG image) lives in public/static/,
// which Keystatic never touches. Only public/media/ is managed by Keystatic image/file fields.

/** Pages of the site an internal button/link may point to. Add a page here when a new route is created. */
const SITE_PAGES = [
  { label: 'Startseite', value: '/' },
  { label: 'Services', value: '/services' },
  { label: 'Brockenhaus (Sortiment)', value: '/brockenhaus' },
  { label: 'Aktuelles (Blog)', value: '/blog' },
  { label: 'Verein – Über uns', value: '/verein' },
  { label: 'Verein – Spenden', value: '/verein#spenden' },
  { label: 'Verein – Angebot', value: '/verein/angebot' },
  { label: 'Verein – Werkstätte', value: '/verein/werkstaette' },
  { label: 'Kontakt', value: '/kontakt' },
]

function pageLink(label: string, defaultValue: string, description?: string) {
  return fields.select({
    label,
    description: description ?? 'Seite der Website, zu der der Button führt.',
    options: SITE_PAGES,
    defaultValue,
  })
}

type TextOptions = { description?: string; multiline?: boolean; max?: number }

// Multiline fields keep the editor's line breaks: the site renders them with `whitespace-pre-line`.
const LINE_BREAK_HINT = 'Enter = neue Zeile, leere Zeile = neuer Absatz.'

function withLineBreakHint(description: string | undefined, multiline: boolean | undefined) {
  if (!multiline) return description
  return description ? `${description} ${LINE_BREAK_HINT}` : LINE_BREAK_HINT
}

/** Required text: Keystatic refuses to save while it is empty. */
function requiredText(label: string, { description, multiline, max }: TextOptions = {}) {
  return fields.text({
    label,
    description: withLineBreakHint(description, multiline),
    multiline,
    validation: { isRequired: true, length: max ? { max } : undefined },
  })
}

/** Optional text: may be left empty — the website then simply hides it. */
function optionalText(label: string, { description, multiline, max }: TextOptions = {}) {
  return fields.text({
    label,
    description: withLineBreakHint(description ?? 'Optional — leer lassen, um nichts anzuzeigen.', multiline),
    multiline,
    validation: { length: max ? { max } : undefined },
  })
}

function httpsUrl(label: string, description: string) {
  return fields.text({
    label,
    description,
    validation: {
      isRequired: true,
      pattern: { regex: /^https:\/\/\S+$/, message: 'Bitte einen vollständigen Link angeben, der mit https:// beginnt.' },
    },
  })
}

export default config({
  // Falls back to 'local' storage whenever the GitHub App credentials aren't set yet (local dev,
  // or a production deploy before the GitHub App is created) — Keystatic's 'github' storage mode
  // throws a hard error at build time if KEYSTATIC_GITHUB_CLIENT_ID/SECRET/KEYSTATIC_SECRET are
  // missing, which would break `next build` for the whole site, not just /keystatic.
  storage: isGithubStorageConfigured
    ? { kind: 'github', repo: { owner: 'rosabrockenhaus', name: 'rosabrockenhaus-ch' } }
    : { kind: 'local' },

  ui: {
    brand: { name: 'Rosa Brockenhaus' },
    navigation: {
      Startseite: ['homepage', 'banner'],
      Brockenhaus: ['categories', 'hours'],
      Services: ['services'],
      Verein: ['verein', 'vereinAngebot', 'vereinWerkstaetten', 'team'],
      Allgemein: ['contact', 'blog'],
    },
  },

  collections: {
    blog: collection({
      label: 'Blog / Aktuelles',
      path: 'content/blog/*',
      slugField: 'title',
      format: { contentField: 'body' },
      schema: {
        title: fields.slug({
          name: { label: 'Titel', validation: { isRequired: true, length: { max: 90 } } },
          slug: {
            label: 'Adresse (URL)',
            description: 'Wird automatisch aus dem Titel erzeugt. Nach dem Veröffentlichen nicht mehr ändern, sonst funktionieren geteilte Links nicht mehr.',
          },
        }),
        excerpt: requiredText('Auszug', {
          description: '1–2 Sätze, die in der Übersicht unter dem Titel erscheinen.',
          multiline: true,
          max: 220,
        }),
        // Two kinds of posts, see src/lib/blog.ts. Only the fields of the chosen kind are shown.
        kind: fields.conditional(
          fields.select({
            label: 'Art des Beitrags',
            description:
              'Ratgeber = gilt immer (z.B. «Neue Ware alle 3–4 Tage»). Aktuell = Aktion oder Anlass mit Datum (z.B. «50% am 12.12.») – verschwindet nach dem letzten Tag automatisch aus den Listen.',
            options: [
              { label: 'Ratgeber / Info (immer gültig)', value: 'ratgeber' },
              { label: 'Aktuell (Aktion oder Anlass mit Datum)', value: 'aktuell' },
            ],
            defaultValue: 'ratgeber',
          }),
          {
            ratgeber: fields.object({
              order: fields.integer({
                label: 'Reihenfolge',
                description: '1 = wird zuerst angezeigt, 2 = danach, usw. Aktuelle Beiträge stehen immer davor.',
                defaultValue: 10,
                validation: { isRequired: true, min: 1, max: 99 },
              }),
            }),
            aktuell: fields.object({
              date: fields.date({
                label: 'Datum',
                description: 'Tag der Aktion bzw. erster Tag.',
                validation: { isRequired: true },
              }),
              endDate: fields.date({
                label: 'Letzter Tag (optional)',
                description: 'Nur bei mehrtägigen Aktionen. Leer lassen = nur ein Tag.',
              }),
              time: optionalText('Uhrzeit (optional)', { description: "z.B. '10–17 Uhr'.", max: 30 }),
            }),
          }
        ),
        category: fields.select({
          label: 'Kategorie',
          options: [
            { label: 'Brockenhaus', value: 'Brockenhaus' },
            { label: 'Nachhaltigkeit', value: 'Nachhaltigkeit' },
            { label: 'Verein', value: 'Verein' },
            { label: 'Werkstätte', value: 'Werkstätte' },
          ],
          defaultValue: 'Brockenhaus',
        }),
        readingTime: fields.integer({
          label: 'Lesezeit (Minuten)',
          defaultValue: 2,
          validation: { isRequired: true, min: 1, max: 60 },
        }),
        // The site reads content/blog/*.md; Keystatic's default would be .mdoc, which made it
        // list no existing posts and save new ones where the site never looks.
        body: fields.markdoc({ label: 'Inhalt', extension: 'md' }),
      },
    }),
  },

  singletons: {
    banner: singleton({
      label: 'Ankündigungsbanner',
      path: 'content/banner',
      format: { data: 'json' },
      schema: {
        enabled: fields.checkbox({
          label: 'Banner anzeigen',
          description: 'Pop-up, das beim ersten Besuch der Website erscheint.',
          defaultValue: true,
        }),
        startDate: fields.date({
          label: 'Anzeigen ab (optional)',
          description: 'Leer lassen = sofort. So kann das Banner im Voraus vorbereitet werden.',
        }),
        endDate: fields.date({
          label: 'Anzeigen bis und mit (optional)',
          description: 'Leer lassen = bis es ausgeschaltet wird. Danach verschwindet es automatisch.',
        }),
        discount: optionalText('Rabatt (in der rosa Bubble)', {
          description: "Gross in der rosa Bubble, z.B. '50%'. Leer lassen = Banner ohne Bubble (z.B. für einen Anlass).",
          max: 6,
        }),
        discountDate: fields.date({
          label: 'Tag des Rabatts (optional)',
          description:
            'Steht in der Bubble unter dem Rabatt, z.B. «Sa., 12.12.». Leer lassen = nur der Rabatt. Ist «Anzeigen bis» leer, verschwindet das Banner nach diesem Tag automatisch.',
        }),
        message: requiredText('Nachricht', { description: 'Kurz halten — eine Zeile auf dem Handy.', max: 90 }),
        post: fields.relationship({
          label: 'Beitrag verlinken (optional)',
          description: 'Zeigt im Banner einen Button «Mehr erfahren» zu diesem Blog-Beitrag.',
          collection: 'blog',
        }),
      },
    }),

    homepage: singleton({
      label: 'Startseite',
      path: 'content/homepage',
      format: { data: 'json' },
      schema: {
        hero: fields.object(
          {
            headlineHighlight: requiredText('Titel – farbiger Teil', { description: "Das erste, farbig hervorgehobene Wort, z.B. 'Rosa'.", max: 20 }),
            headlineRest: requiredText('Titel – Rest des Satzes', { max: 40 }),
            subcopy: requiredText('Untertext', {
              description: 'Kurzer Text unter dem Titel.',
              multiline: true,
              max: 140,
            }),
            image: fields.image({
              label: 'Bild rechts',
              description:
                'Querformat (4:3), am besten kleiner als 1 MB. Leer lassen = Logo. Wird nur auf grösseren Bildschirmen angezeigt, nicht auf dem Handy.',
              directory: 'public/media/home',
              publicPath: '/media/home/',
            }),
            imageAlt: optionalText('Bildbeschreibung', {
              description: "Was ist auf dem Bild zu sehen? Für Google und blinde Menschen, z.B. 'Verkaufsraum mit Möbeln'.",
              max: 120,
            }),
            imageCaption: optionalText('Untertitel unter dem Bild', { max: 40 }),
            primaryCtaLabel: requiredText('Haupt-Button: Text', { max: 24 }),
            primaryCtaHref: pageLink('Haupt-Button: Ziel', '/services'),
            secondaryCtaLabel: requiredText('Zweiter Button: Text', { max: 24 }),
            secondaryCtaHref: pageLink('Zweiter Button: Ziel', '/brockenhaus'),
          },
          { label: 'Hero (oberster Bereich)' }
        ),
        promos: fields.array(
          fields.object({
            icon: fields.select({
              label: 'Icon',
              options: [
                { label: 'Studierende (Doktorhut)', value: 'GraduationCap' },
                { label: 'Kundenkarte (Karte)', value: 'CreditCard' },
                { label: 'Gutschein (Geschenk)', value: 'Gift' },
              ],
              defaultValue: 'Gift',
            }),
            eyebrow: requiredText('Titel (kurz)', { description: "z.B. 'Kundenkarte'.", max: 24 }),
            summary: requiredText('Zusammenfassung', { description: 'Eine Zeile, sichtbar ohne Aufklappen.', max: 60 }),
            details: fields.array(requiredText('Detail', { max: 90 }), {
              label: 'Details (beim Aufklappen sichtbar)',
              itemLabel: (p) => p.value,
            }),
          }),
          {
            label: 'Aktionen & Treuevorteile',
            itemLabel: (p) => p.fields.eyebrow.value,
            validation: { length: { max: 4 } },
          },
        ),
      },
    }),

    verein: singleton({
      label: 'Verein — Über uns',
      path: 'content/verein',
      format: { data: 'json' },
      schema: {
        eyebrow: optionalText('Kleiner Text über dem Titel', { max: 30 }),
        title: requiredText('Titel', { max: 40 }),
        intro: requiredText('Einleitungstext', { multiline: true }),
        missionEyebrow: optionalText('Mission: kleiner Text über dem Titel', { max: 30 }),
        missionHeading: requiredText('Mission: Titel', { max: 60 }),
        missionParagraphs: fields.array(requiredText('Absatz', { multiline: true }), {
          label: 'Mission: Absätze',
          itemLabel: (p) => p.value.slice(0, 60),
        }),
        stats: fields.array(
          fields.object({
            value: requiredText('Wert', { description: 'z.B. "2010"', max: 8 }),
            sub: requiredText('Beschriftung', { description: 'z.B. "gegründet"', max: 20 }),
          }),
          { label: 'Statistiken', itemLabel: (p) => `${p.fields.value.value} — ${p.fields.sub.value}` },
        ),
        links: fields.array(
          fields.object({
            icon: fields.select({
              label: 'Icon',
              options: [
                { label: 'Werkzeug', value: 'Wrench' },
                { label: 'Aktentasche', value: 'Briefcase' },
                { label: 'Herz', value: 'Heart' },
              ],
              defaultValue: 'Wrench',
            }),
            title: requiredText('Titel', { max: 30 }),
            href: pageLink(
              'Ziel',
              '/verein/werkstaette',
              'Der Untertitel der Karte wird auf der verlinkten Seite (Werkstätte / Angebot) bearbeitet.'
            ),
            cta: requiredText('Link-Text', { max: 30 }),
          }),
          { label: 'Link-Karten (neben der Mission)', itemLabel: (p) => p.fields.title.value },
        ),
        statutenPdf: fields.file({
          label: 'Statuten (PDF)',
          description: 'Wird als Download-Link unter dem Vorstand angezeigt.',
          directory: 'public/media/verein',
          publicPath: '/media/verein/',
        }),
        spenden: fields.object(
          {
            title: requiredText('Titel', { max: 40 }),
            text: requiredText('Text', { multiline: true }),
            bankName: requiredText('Bank'),
            iban: fields.text({
              label: 'IBAN',
              description: 'z.B. CH93 0076 2011 6238 5295 7',
              validation: {
                isRequired: true,
                pattern: { regex: /^[A-Z]{2}\d{2}[A-Z0-9 ]{10,32}$/, message: 'Bitte eine gültige IBAN eingeben (z.B. CH93 0076 2011 6238 5295 7).' },
              },
            }),
            beneficiary: optionalText('Begünstigter (Name, Adresse)'),
          },
          { label: 'Spenden (Karte vor dem Vorstand)' }
        ),
        mitgliedschaft: fields.object(
          {
            title: requiredText('Titel', { max: 40 }),
            text: requiredText('Text', { multiline: true }),
            fees: fields.array(
              fields.object({
                label: requiredText('Art', { description: 'z.B. Einzelmitglied', max: 40 }),
                price: requiredText('Beitrag', { description: 'z.B. Fr. 100.00 / Jahr', max: 30 }),
              }),
              { label: 'Beiträge', itemLabel: (p) => `${p.fields.label.value} — ${p.fields.price.value}` }
            ),
            ctaLabel: requiredText('Button: Text', { max: 30 }),
            ctaHref: pageLink('Button: Ziel', '/kontakt'),
          },
          { label: 'Mitglied werden (Karte vor dem Vorstand)' }
        ),
        ctaHeading: requiredText('Abschluss-Bereich: Titel', { max: 60 }),
        ctaText: requiredText('Abschluss-Bereich: Text', { multiline: true }),
      },
    }),

    vereinAngebot: singleton({
      label: 'Verein — Angebot',
      path: 'content/verein-angebot',
      format: { data: 'json' },
      schema: {
        title: requiredText('Titel', { max: 40 }),
        subtitle: requiredText('Untertitel', {
          description: 'Wird unter dem Titel und auf der Karte unter «Über uns» angezeigt.',
          multiline: true,
          max: 160,
        }),
        intro: requiredText('Einleitungstext', { multiline: true }),
        profiles: fields.array(
          fields.object({
            title: requiredText('Titel', { max: 60 }),
            description: requiredText('Beschreibung', { multiline: true }),
          }),
          { label: 'Zielgruppen', itemLabel: (p) => p.fields.title.value },
        ),
      },
    }),

    vereinWerkstaetten: singleton({
      label: 'Verein — Werkstätte',
      path: 'content/verein-werkstaetten',
      format: { data: 'json' },
      schema: {
        title: requiredText('Titel', { max: 40 }),
        subtitle: requiredText('Untertitel', {
          description: 'Wird unter dem Titel und auf der Karte unter «Über uns» angezeigt.',
          multiline: true,
          max: 160,
        }),
        intro: requiredText('Einleitungstext', { multiline: true }),
        workshops: fields.array(
          fields.object({
            name: requiredText('Name', { max: 60 }),
            description: requiredText('Beschreibung', { multiline: true }),
          }),
          { label: 'Werkstätte', itemLabel: (p) => p.fields.name.value },
        ),
      },
    }),

    contact: singleton({
      label: 'Kontaktdaten',
      path: 'content/contact',
      format: { data: 'json' },
      schema: {
        phone: fields.text({
          label: 'Telefon',
          description: "Mit Landesvorwahl, z.B. '+41 31 991 77 00'. Wird überall auf der Website angezeigt.",
          validation: {
            isRequired: true,
            pattern: { regex: /^\+\d[\d ]{6,20}$/, message: "Bitte im Format '+41 31 991 77 00' eingeben." },
          },
        }),
        email: fields.text({
          label: 'E-Mail',
          validation: {
            isRequired: true,
            pattern: { regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Bitte eine gültige E-Mail-Adresse eingeben.' },
          },
        }),
        addressLine1: requiredText('Adresse Zeile 1 (Strasse)', { max: 60 }),
        addressLine2: requiredText('Adresse Zeile 2 (PLZ Ort)', { max: 40 }),
        mapsUrl: httpsUrl(
          'Google-Maps-Link',
          'Die Adresse auf der Website verlinkt auf diese Seite (z.B. https://maps.app.goo.gl/…).'
        ),
        mapEmbedUrl: fields.text({
          label: 'Google Maps Embed-URL',
          description:
            'Karte auf der Kontaktseite. Nur ändern, wenn sich die Adresse ändert. Format: https://maps.google.com/maps?q=<Name, Adresse>&z=17&output=embed',
          multiline: true,
          validation: {
            isRequired: true,
            pattern: { regex: /^https:\/\/\S+output=embed\S*$/, message: 'Der Link muss mit https:// beginnen und "output=embed" enthalten.' },
          },
        }),
        instagramUrl: httpsUrl('Instagram-Link', 'Vollständiger Link zum Profil, z.B. https://www.instagram.com/…'),
        facebookUrl: httpsUrl('Facebook-Link', 'Vollständiger Link zur Seite, z.B. https://www.facebook.com/…'),
        footerTagline: requiredText('Footer: Kurzbeschreibung', { multiline: true, max: 160 }),
        serviceNote: optionalText('Hinweis unter den Öffnungszeiten', {
          description: 'z.B. dass Services auch ausserhalb der Öffnungszeiten möglich sind. Optional.',
          multiline: true,
          max: 160,
        }),
      },
    }),

    team: singleton({
      label: 'Vorstand',
      path: 'content/team',
      format: { data: 'json' },
      schema: {
        members: fields.array(
          fields.object({
            name: requiredText('Name', { max: 50 }),
            role: requiredText('Rolle', { max: 50 }),
            photo: fields.image({
              label: 'Foto',
              description: 'Quadratisches Foto, am besten kleiner als 1 MB. Ohne Foto wird ein Symbol angezeigt.',
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
        label: requiredText('Titel', { max: 40 }),
        note: optionalText('Hinweis', { multiline: true, max: 160 }),
        hours: fields.array(
          fields.object({
            days: requiredText('Tage', { description: "z.B. 'Di–Fr'", max: 20 }),
            time: requiredText('Zeit', { description: "z.B. '10:00–18:00' oder 'geschlossen'", max: 20 }),
          }),
          { label: 'Zeiten', itemLabel: (p) => `${p.fields.days.value}: ${p.fields.time.value}` },
        ),
      },
    }),

    categories: singleton({
      label: 'Brockenhaus-Kategorien',
      path: 'content/categories',
      format: { data: 'json' },
      schema: {
        categories: fields.array(
          fields.object({
            name: requiredText('Name', { max: 30 }),
            description: requiredText('Beschreibung', { multiline: true, max: 160 }),
            image: fields.image({
              label: 'Foto',
              description: 'Querformat, am besten kleiner als 1 MB.',
              directory: 'public/media',
              publicPath: '/media/',
            }),
            alt: requiredText('Bildbeschreibung', {
              description: 'Was ist auf dem Foto zu sehen? (für blinde Besucher und Google)',
              max: 140,
            }),
            examples: fields.array(requiredText('Beispiel', { max: 30 }), {
              label: 'Beispiele',
              itemLabel: (p) => p.value,
            }),
            featured: fields.checkbox({ label: 'Auf der Startseite zeigen', defaultValue: false }),
          }),
          { label: 'Kategorien', itemLabel: (p) => p.fields.name.value },
        ),
      },
    }),

    services: singleton({
      label: 'Services',
      path: 'content/services',
      format: { data: 'json' },
      schema: {
        services: fields.array(
          fields.object({
            // The code keys layout, badges, photo showcases and #anchor links on this id, so it
            // is a fixed dropdown rather than free text. A new service type needs a developer.
            id: fields.select({
              label: 'Service-Typ',
              description: 'Bestimmt Layout, Fotos und Link-Adresse dieses Services. Jeden Typ nur einmal verwenden.',
              options: [
                { label: 'Umzug', value: 'umzug' },
                { label: 'Räumung', value: 'raeumung' },
                { label: 'Reinigung', value: 'reinigung' },
                { label: 'Entsorgung', value: 'entsorgung' },
                { label: 'Abholung', value: 'abholung' },
              ],
              defaultValue: 'umzug',
            }),
            title: requiredText('Titel', { max: 30 }),
            subtitle: requiredText('Untertitel', { max: 80 }),
            icon: fields.select({
              label: 'Icon',
              options: [
                { label: 'Lastwagen (Umzug)', value: 'Truck' },
                { label: 'Haus (Räumung)', value: 'Home' },
                { label: 'Funkeln (Reinigung)', value: 'Sparkles' },
                { label: 'Recycling (Entsorgung)', value: 'Recycle' },
                { label: 'Paket (Abholung)', value: 'PackageCheck' },
              ],
              defaultValue: 'Truck',
            }),
            features: fields.array(requiredText('Merkmal', { max: 90 }), {
              label: 'Merkmale',
              itemLabel: (p) => p.value,
            }),
            faq: fields.array(
              fields.object({
                question: requiredText('Frage', { max: 140 }),
                answer: requiredText('Antwort', { multiline: true }),
              }),
              { label: 'Häufige Fragen', itemLabel: (p) => p.fields.question.value },
            ),
          }),
          { label: 'Services', itemLabel: (p) => p.fields.title.value },
        ),
      },
    }),
  },
})
