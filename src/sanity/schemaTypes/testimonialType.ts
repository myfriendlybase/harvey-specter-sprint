import { defineField, defineType } from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'author', title: 'Author name', type: 'string' }),
    defineField({ name: 'quote', title: 'Quote', type: 'text' }),
    defineField({
      name: 'logo',
      title: 'Company logo',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
    defineField({
      name: 'rotation',
      title: 'CSS rotation class',
      type: 'string',
      description: 'e.g. rotate-[-6.85deg] — controls the card tilt on desktop',
      initialValue: 'rotate-[2deg]',
    }),
    defineField({ name: 'order', title: 'Display order', type: 'number' }),
  ],
  orderings: [
    { title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: { select: { title: 'author', subtitle: 'quote', media: 'logo' } },
})
