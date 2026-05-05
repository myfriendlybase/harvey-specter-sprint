import { defineField, defineType } from 'sanity'

export const aboutSettingsType = defineType({
  name: 'aboutSettings',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'stats',
      title: 'Stats',
      description: 'Numbers shown on the About page',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'stat',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'number' }),
            defineField({ name: 'suffix', title: 'Suffix (e.g. +)', type: 'string' }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
          ],
          preview: { select: { title: 'label', subtitle: 'value' } },
        },
      ],
    }),
  ],
})
