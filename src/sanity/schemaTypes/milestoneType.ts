import { defineField, defineType } from 'sanity'

export const milestoneType = defineType({
  name: 'milestone',
  title: 'Milestone',
  type: 'document',
  fields: [
    defineField({ name: 'year', title: 'Year (e.g. 2017 or Now)', type: 'string' }),
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'body', title: 'Body', type: 'text' }),
    defineField({ name: 'order', title: 'Display order', type: 'number' }),
  ],
  orderings: [
    { title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: { select: { title: 'heading', subtitle: 'year' } },
})
