import { fields } from '@keystatic/core'
import slugify from '@sindresorhus/slugify'
import AutoSlugInput from './AutoSlugInput'

// A title field whose URL (slug) is derived from the title and cannot be typed by editors.
// Storage and behaviour are Keystatic's own fields.slug (the slug is the file name):
//  - new entry: the URL follows the title while typing, made unique ("-1") if already used;
//  - existing entry: the URL stays as it is, even if the title changes, so links already shared
//    (Instagram, Google, WhatsApp) keep working.

export function autoSlugTitle({ label, maxLength }: { label: string; maxLength?: number }) {
  const base = fields.slug({
    name: { label, validation: { isRequired: true, length: { max: maxLength } } },
    slug: {
      label: 'Adresse (URL)',
      description:
        'Wird automatisch aus dem Titel erzeugt und kann nicht geändert werden. Nach dem ersten Speichern bleibt sie fest (auch wenn der Titel geändert wird), damit geteilte Links funktionieren. Ist sie schon vergeben, wird «-1» angehängt.',
      generate: (name) => slugify(name),
    },
  })

  return {
    ...base,
    Input(props: Parameters<typeof base.Input>[0]) {
      return <AutoSlugInput {...props} native={base.Input} />
    },
  }
}
