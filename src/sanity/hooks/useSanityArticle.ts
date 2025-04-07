import { useEffect, useState } from 'react'
import { client } from '../lib/sanity'

interface Article {
  _id: string
  headline: string
  excerpt?: string
  mainContent?: any
  mainImage?: {
    image: {
      asset: {
        _id: string
        url: string
      }
      hotspot?: any
      crop?: any
    }
    source?: {
      name: string
      url?: string
    }
  }
  mediaContent?: {
    type: string
    image?: {
      asset: {
        _id: string
        url: string
      }
      source?: {
        name: string
        url?: string
      }
    }
    youtubeUrl?: string
  }
  publishedAt: string
  genres?: string[]
  readingTime?: number
  candidate?: {
    name: string
    occupation: string
    applicationPurpose: string
  }
  isHeaderArticle: boolean
}

export function useSanityArticle() {
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    client.fetch(`*[_type == "article"] {
      _id,
      headline,
      excerpt,
      mainContent,
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
      "mediaContent": mediaContent {
        "type": type,
        "image": {
          "asset": {
            "_id": image.asset.asset._ref,
            "url": image.asset.asset->url
          },
          "source": image.source
        },
        "youtubeUrl": youtubeUrl
      },
      publishedAt,
      genres,
      readingTime,
      candidate,
      isHeaderArticle
    }`)
    .then(data => {
      console.log('Article Data Debug:', {
        totalArticles: data.length,
        firstArticle: {
          id: data[0]?._id,
          hasMediaContent: !!data[0]?.mediaContent,
          mediaType: data[0]?.mediaContent?.type,
          mediaImage: data[0]?.mediaContent?.image,
          mediaImageAsset: data[0]?.mediaContent?.image?.asset,
          mediaImageUrl: data[0]?.mediaContent?.image?.asset?.url,
        },
        rawData: data
      });
      setArticles(data)
      setIsLoading(false)
    })
    .catch(err => {
      console.error('Article Fetch Error:', err);
      setError(err)
      setIsLoading(false)
    })
  }, [])

  return { articles, isLoading, error }
}