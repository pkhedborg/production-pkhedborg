import { useEffect, useState } from 'react'
import { client } from '../lib/sanity'

interface Project {
  _id: string;
  headline: string;
  excerpt: string;
  mainImage: {
    image: {
      asset: {
        url: string;
      };
    };
  };
  isHeaderArticle: boolean;
}

interface SanityError {
  message: string;
}

export default function useSanityProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<SanityError | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await client.fetch(`
          *[_type == "article" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
            _id,
            headline,
            excerpt,
            mainImage
          }
        `)
        setProjects(result)
      } catch (err) {
        setError({ message: (err as Error).message })
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return { projects, isLoading, error }
}