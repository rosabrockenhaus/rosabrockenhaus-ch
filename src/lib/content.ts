import 'server-only'
import { cache } from 'react'
import { createReader, type Entry } from '@keystatic/core/reader'
import keystaticConfig from '../../keystatic.config'

// All CMS content is read through Keystatic's Reader instead of importing the JSON files directly.
// The Reader parses every file against the schema in keystatic.config.ts, so:
//  - a text field the editors cleared (Keystatic then drops the key from the JSON) comes back as ''
//    instead of `undefined`, so the build no longer breaks on a missing key;
//  - the types below are derived from the schema itself, so code and CMS form can't drift apart.
// Reading uses the filesystem, so this module is server-only: client components get the data as
// props from their server parent and import only the types (`import type`).

const reader = createReader(process.cwd(), keystaticConfig)

type Singletons = (typeof keystaticConfig)['singletons']

export type Banner = Entry<Singletons['banner']>
export type Homepage = Entry<Singletons['homepage']>
export type HeroContent = Homepage['hero']
export type Promo = Homepage['promos'][number]
export type TeamMember = Entry<Singletons['team']>['members'][number]
export type ShopHours = Entry<Singletons['hours']>
export type ShopCategory = Entry<Singletons['categories']>['categories'][number]
export type Service = Entry<Singletons['services']>['services'][number]
export type Verein = Entry<Singletons['verein']>
export type VereinAngebot = Entry<Singletons['vereinAngebot']>
export type VereinWerkstaetten = Entry<Singletons['vereinWerkstaetten']>
export type Contact = Entry<Singletons['contact']>

// `cache` dedupes reads within one render (e.g. layout + page both asking for contact data).
export const getBanner = cache(() => reader.singletons.banner.readOrThrow())
export const getHomepage = cache(() => reader.singletons.homepage.readOrThrow())
export const getTeam = cache(async () => (await reader.singletons.team.readOrThrow()).members)
export const getShopHours = cache(() => reader.singletons.hours.readOrThrow())
export const getShopCategories = cache(
  async () => (await reader.singletons.categories.readOrThrow()).categories
)
export const getFeaturedCategories = cache(async () =>
  (await getShopCategories()).filter((c) => c.featured)
)
export const getServices = cache(async () => (await reader.singletons.services.readOrThrow()).services)
export const getVerein = cache(() => reader.singletons.verein.readOrThrow())
export const getVereinAngebot = cache(() => reader.singletons.vereinAngebot.readOrThrow())
export const getVereinWerkstaetten = cache(() => reader.singletons.vereinWerkstaetten.readOrThrow())
export const getContact = cache(() => reader.singletons.contact.readOrThrow())
