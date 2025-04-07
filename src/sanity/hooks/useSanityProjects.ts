import { useEffect, useState } from 'react'
import { client } from '../lib/sanity'

export default function useSanityProjects() {
  const [projects, setProjects] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // Updated query to include all necessary fields and the URL for the image
    const query = `*[_type == "article"] {
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
      isHeaderArticle,
      publishedAt,
      readingTime
    }`

    console.log('Fetching with query:', query)
    
    client.fetch(query)
      .then(data => {
        console.log('Received data:', data)
        console.log('Full data structure:', JSON.stringify(data, null, 2))
        setProjects(data)
        setIsLoading(false)
      })
      .catch(err => {
        console.error('Error fetching projects:', err)
        setError(err)
        setIsLoading(false)
      })
  }, [])

  return { projects, isLoading, error }
}