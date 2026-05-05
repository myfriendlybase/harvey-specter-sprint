import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings'),
        ),
      S.divider(),
      S.documentTypeListItem('post').title('News'),
      S.documentTypeListItem('portfolio').title('Portfolio'),
      S.documentTypeListItem('service').title('Services'),
      S.documentTypeListItem('testimonial').title('Testimonials'),
      S.divider(),
      S.documentTypeListItem('legalPage').title('Legal Pages'),
      S.divider(),
      S.listItem()
        .title('About Page')
        .child(
          S.list()
            .title('About Page')
            .items([
              S.listItem()
                .title('Stats')
                .id('aboutSettings')
                .child(
                  S.document()
                    .schemaType('aboutSettings')
                    .documentId('aboutSettings')
                    .title('Stats'),
                ),
              S.documentTypeListItem('milestone').title('Story / Milestones'),
              S.documentTypeListItem('experienceItem').title('Experience'),
              S.documentTypeListItem('award').title('Awards'),
            ]),
        ),
    ])
