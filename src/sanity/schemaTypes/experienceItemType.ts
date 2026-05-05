import { defineField, defineType } from 'sanity'

export const experienceItemType = defineType({
  name: 'experienceItem',
  title: 'Experience Item',
  type: 'document',
  fields: [
    defineField({ name: 'year', title: 'Year', type: 'string' }),
    defineField({ name: 'client', title: 'Client', type: 'string' }),
    defineField({ name: 'role', title: 'Role', type: 'string' }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: { list: ['Brand', 'Design', 'Web', 'Photo'] },
    }),
    defineField({ name: 'order', title: 'Display order', type: 'number' }),
  ],
  orderings: [
    { title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: { select: { title: 'client', subtitle: 'year' } },
})
