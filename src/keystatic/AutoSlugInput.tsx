'use client'

// Form part of autoSlugTitle (see autoSlug.tsx). Kept in its own client module because
// keystatic.config.ts is also imported on the server (Reader, API route).
import { useState } from 'react'
import type { fields } from '@keystatic/core'
import { Flex } from '@keystar/ui/layout'
import { TextField } from '@keystar/ui/text-field'
import slugify from '@sindresorhus/slugify'

type InputProps = Parameters<ReturnType<typeof fields.slug>['Input']>[0] & {
  label: string
  urlPrefix: string
  maxLength?: number
}

export default function AutoSlugInput({ value, onChange, autoFocus, forceValidation, label, urlPrefix, maxLength }: InputProps) {
  // Decided once when the form opens: a new entry starts with an empty slug.
  const [isNew] = useState(() => value.slug === '')

  const nameError = !forceValidation
    ? undefined
    : value.name.trim() === ''
      ? `${label} darf nicht leer sein.`
      : maxLength && value.name.length > maxLength
        ? `${label} darf höchstens ${maxLength} Zeichen lang sein.`
        : undefined

  return (
    <Flex direction="column" gap="large">
      <TextField
        label={label}
        value={value.name}
        autoFocus={autoFocus}
        isRequired
        errorMessage={nameError}
        onChange={(name) => onChange({ name, slug: isNew ? slugify(name) : value.slug })}
      />
      <TextField
        label="Adresse (URL)"
        description={
          isNew
            ? 'Wird automatisch aus dem Titel erzeugt. Nach dem Speichern bleibt sie fest, damit geteilte Links funktionieren.'
            : 'Fest seit der Erstellung, auch wenn der Titel geändert wird – so funktionieren geteilte Links weiterhin.'
        }
        value={`${urlPrefix}${value.slug}`}
        isReadOnly
      />
    </Flex>
  )
}
