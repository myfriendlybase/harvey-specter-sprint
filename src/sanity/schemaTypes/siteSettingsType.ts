import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'email', title: 'Email address', type: 'string' }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({
      name: 'isAvailable',
      title: 'Available for new projects',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'availabilityLabel',
      title: 'Availability label',
      type: 'string',
      initialValue: 'Open to new projects',
    }),
    defineField({
      name: 'bio',
      title: 'Bio text',
      type: 'text',
      description: 'Short bio shown on the home page',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({ name: 'platform', title: 'Platform', type: 'string' }),
            defineField({ name: 'url', title: 'URL', type: 'url' }),
          ],
          preview: { select: { title: 'platform', subtitle: 'url' } },
        },
      ],
    }),
  ],
})
