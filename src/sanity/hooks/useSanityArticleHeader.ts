import { useEffect, useState } from 'react'
import { client } from '../lib/sanity'

interface ArticleHeader {
  _id: string;
  title: string;
  description: string;
  slug: string;
  image: string;
}

interface SanityError {
  message: string;
}

const useStoryblokArticleHeader = () => {
  const [articleHeader, setArticleHeader] = useState<ArticleHeader | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<SanityError | null>(null)

  useEffect(() => {
    const fetchArticleHeader = async () => {
      try {
        const result = await client.fetch(`
          *[_type == "article" && isHeaderArticle == true][0] {
            _id,
            title,
            description,
            "slug": slug.current,
            "image": mainImage.image.asset->url
          }
        `)
        setArticleHeader(result)
      } catch (err) {
        setError({ message: (err as Error).message })
      } finally {
        setIsLoading(false)
      }
    }

    fetchArticleHeader()
  }, [])

  return { articleHeader, isLoading, error }
}

export default useStoryblokArticleHeader