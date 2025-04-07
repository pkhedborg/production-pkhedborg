import { useEffect, useState } from 'react'
import { client } from '../lib/sanity'

export default function useSanityArticleHeader() {
  const [articleHeader, setArticleHeader] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const query = `*[_type == "article" && isHeaderArticle == true][0]{
      _id,
      headline,
      excerpt,
      mainImage {
        image {
          asset-> {
            _id,
            url
          },
          hotspot,
          crop
        },
        source {
          name,
          url
        }
      },
      mediaContent {
        type,
        image {
          asset {
            _id,
            url
          },
          source {
            name,
            url
          }
        },
        youtubeUrl
      },
      genres,
      publishedAt,
      readingTime
    }`

    client.fetch(query)
      .then(data => {
        setArticleHeader(data)
        setIsLoading(false)
      })
      .catch(err => {
        setError(err)
        setIsLoading(false)
      })
  }, [])

  return { articleHeader, isLoading, error }
}