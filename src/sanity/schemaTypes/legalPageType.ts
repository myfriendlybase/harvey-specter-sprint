import { defineField, defineType } from 'sanity'

export const legalPageType = defineType({
  name: 'legalPage',
  title: 'Legal Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'lastUpdated', title: 'Last updated (e.g. May 2026)', type: 'string' }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'section',
          fields: [
            defineField({ name: 'heading', title: 'Heading', type: 'string' }),
            defineField({ name: 'body', title: 'Body text', type: 'text', rows: 4 }),
            defineField({
              name: 'items',
              title: 'List items (optional)',
              description: 'Leave label blank for plain bullet points.',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'listItem',
                  fields: [
                    defineField({ name: 'label', title: 'Label (bold)', type: 'string' }),
                    defineField({ name: 'text', title: 'Text', type: 'text', rows: 2 }),
                  ],
                  preview: { select: { title: 'label', subtitle: 'text' } },
                },
              ],
            }),
          ],
          preview: { select: { title: 'heading', subtitle: 'body' } },
        },
      ],
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'slug.current' } },
})
