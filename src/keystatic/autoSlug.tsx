import { fields } from '@keystatic/core'
import slugify from '@sindresorhus/slugify'
import AutoSlugInput from './AutoSlugInput'

// A title field whose URL (slug) is derived from the title and cannot be typed by editors.
// Storage is Keystatic's own fields.slug (the slug is the file name), only the form is replaced:
//  - new entry: the URL follows the title while typing;
//  - existing entry: the URL stays as it is, even if the title changes, so links already shared
//    (Instagram, Google, WhatsApp) keep working.

type Args = {
  label: string
  /** Path shown before the slug in the read-only preview, e.g. '/blog/' */
  urlPrefix: string
  maxLength?: number
}

export function autoSlugTitle({ label, urlPrefix, maxLength }: Args) {
  const base = fields.slug({
    name: { label, validation: { isRequired: true, length: { max: maxLength } } },
    slug: { label: 'Adresse (URL)', generate: (name) => slugify(name) },
  })

  return {
    ...base,
    Input(props: Parameters<typeof base.Input>[0]) {
      return <AutoSlugInput {...props} label={label} urlPrefix={urlPrefix} maxLength={maxLength} />
    },
  }
}
