import { type SchemaTypeDefinition } from 'sanity'
import { portfolioType } from './portfolioType'
import { siteSettingsType } from './siteSettingsType'
import { aboutSettingsType } from './aboutSettingsType'
import { postType } from './postType'
import { serviceType } from './serviceType'
import { milestoneType } from './milestoneType'
import { experienceItemType } from './experienceItemType'
import { awardType } from './awardType'
import { testimonialType } from './testimonialType'
import { legalPageType } from './legalPageType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteSettingsType,
    aboutSettingsType,
    portfolioType,
    postType,
    serviceType,
    milestoneType,
    experienceItemType,
    awardType,
    testimonialType,
    legalPageType,
  ],
}
