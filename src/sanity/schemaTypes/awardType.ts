import { defineField, defineType } from 'sanity'

export const awardType = defineType({
  name: 'award',
  title: 'Award',
  type: 'document',
  fields: [
    defineField({ name: 'year', title: 'Year', type: 'string' }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'org', title: 'Organisation', type: 'string' }),
    defineField({ name: 'order', title: 'Display order', type: 'number' }),
  ],
  orderings: [
    { title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: { select: { title: 'title', subtitle: 'year' } },
})
