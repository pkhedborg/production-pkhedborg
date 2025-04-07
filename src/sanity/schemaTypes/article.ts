import { defineType, defineField } from 'sanity'
import { PreviewValue } from 'sanity'

export default defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'isHeaderArticle',
      title: 'Set as Header Article',
      type: 'boolean',
      description: 'Check this box to feature this article as a header article',
      initialValue: false
    }),

    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string'
    }),

    defineField({
      name: 'excerpt',
      title: 'Article Preview',
      type: 'text',
      description: 'A brief preview/summary of the article'
    }),

    defineField({
      name: 'mainContent',
      title: 'Article Content',
      type: 'array',
      of: [{type: 'block'}]
    }),

    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'object',
      fields: [
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true
          }
        },
        {
          name: 'source',
          title: 'Image Source',
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Source Name',
              type: 'string',
              description: 'e.g., "Unsplash", "Getty Images", "Photographer Name"'
            },
            {
              name: 'url',
              title: 'Source URL',
              type: 'url',
              description: 'Link to the original image or photographer\'s page'
            }
          ]
        }
      ]
    }),

    defineField({
      name: 'mediaContent',
      title: 'Media Content',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Media Type',
          type: 'string',
          options: {
            list: [
              {title: 'Image', value: 'image'},
              {title: 'YouTube Video', value: 'youtube'}
            ]
          }
        },
        {
          name: 'image',
          title: 'Additional Image',
          type: 'object',
          hidden: ({parent}: {parent: {type?: string}}) => parent?.type !== 'image',
          fields: [
            {
              name: 'asset',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true
              }
            },
            {
              name: 'source',
              title: 'Image Source',
              type: 'object',
              fields: [
                {
                  name: 'name',
                  title: 'Source Name',
                  type: 'string',
                  description: 'e.g., "Unsplash", "Getty Images", "Photographer Name"'
                },
                {
                  name: 'url',
                  title: 'Source URL',
                  type: 'url',
                  description: 'Link to the original image or photographer\'s page'
                }
              ]
            }
          ]
        },
        {
          name: 'youtubeUrl',
          title: 'YouTube Video URL',
          type: 'url',
          hidden: ({parent}: {parent: {type?: string}}) => parent?.type !== 'youtube'
        }
      ]
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime'
    }),

    defineField({
      name: 'genres',
      title: 'Genres',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      },
      description: 'Add one or more genres (press Enter after each genre)'
    }),

    defineField({
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number'
    }),

    defineField({
      name: 'candidate',
      title: 'Candidate Information',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string'
        },
        {
          name: 'occupation',
          title: 'Occupation',
          type: 'string'
        },
        {
          name: 'applicationPurpose',
          title: 'Purpose of Application',
          type: 'text'
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'publishedAt',
      media: 'mainImage.image',
      isHeader: 'isHeaderArticle'
    },
    prepare(selection: Record<string, any>): PreviewValue {
      const {title, subtitle, media, isHeader} = selection
      return {
        title: `${isHeader ? '📌 ' : ''}${title || ''}`,
        subtitle,
        media
      }
    }
  }
})