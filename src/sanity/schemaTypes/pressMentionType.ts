import { defineField, defineType } from 'sanity'

export const pressMentionType = defineType({
  name: 'pressMention',
  title: 'Press Mention',
  type: 'document',
  fields: [
    defineField({ name: 'publication', title: 'Publication', type: 'string' }),
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'order', title: 'Display order', type: 'number' }),
  ],
  orderings: [
    { title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: { select: { title: 'headline', subtitle: 'publication' } },
})
