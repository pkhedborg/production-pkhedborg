"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import ProjectGrid from "../ui/ProjectGrid";
import { useSanityArticle } from "../../sanity/hooks/useSanityArticle";
import useSanityProjects from "../../sanity/hooks/useSanityProjects";
import { PortableText, PortableTextComponents } from '@portabletext/react';

interface PortableTextProps {
  children?: React.ReactNode;
}

const ArticleSection = () => {
  const { slug } = useParams();
  const { projects, isLoading: isProjectsLoading, error: projectsError } = useSanityProjects();
  const { articles, isLoading, error } = useSanityArticle();

  // Find the article that matches the slug
  const article = articles?.find(article => article._id === slug);
  
  // Filter out the current article from related articles
  const relatedProjects = projects?.filter(project => project._id !== slug) || [];

  if (!slug || typeof slug !== "string") {
    return <div>Error: Missing or invalid article slug.</div>;
  }

  if (isLoading) {
    return (
      <div className="animate-pulse">
        {/* Hero Skeleton */}
        <div className="relative w-full h-[500px] bg-gray-200">
          <div className="absolute inset-0 flex flex-col justify-center items-center p-4 md:p-6">
            <div className="w-11/12 md:w-3/4 lg:w-2/3 p-4 md:p-8">
              <div className="h-12 bg-gray-300 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-48 mx-auto"></div>
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 mt-8">
          {/* Sidebar Skeleton */}
          <aside className="md:col-span-1 space-y-8">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-gray-200 mb-3"></div>
              <div className="h-6 bg-gray-200 w-32 rounded"></div>
            </div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 w-24 rounded"></div>
              <div className="h-4 bg-gray-200 w-32 rounded"></div>
            </div>
          </aside>

          {/* Main Content Skeleton */}
          <div className="md:col-span-2">
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 w-24 rounded"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="h-[300px] bg-gray-200 rounded my-8"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error loading article: {error.message}</div>;
  }

  if (!article) {
    return <div>No article found.</div>;
  }

  // Add this before the return statement
  console.log('Media Content Debug:', {
    mediaContentType: article?.mediaContent?.type,
    hasYouTubeUrl: !!article?.mediaContent?.youtubeUrl,
    hasImage: !!article?.mediaContent?.image?.asset?.url,
    fullMediaContent: article?.mediaContent,
    imageAsset: article?.mediaContent?.image?.asset,
    imageSource: article?.mediaContent?.image?.source,
  });

  // Add this before the return statement
  console.log('Article Section Debug:', {
    articleId: article?._id,
    mediaContent: {
      type: article?.mediaContent?.type,
      hasImage: !!article?.mediaContent?.image,
      imageData: article?.mediaContent?.image,
      assetData: article?.mediaContent?.image?.asset,
      assetUrl: article?.mediaContent?.image?.asset?.url,
      source: article?.mediaContent?.image?.source,
    },
    fullArticle: article
  });

  // Update the PortableText components to handle both types
  const components: PortableTextComponents = {
    block: {
      normal: ({children}: PortableTextProps) => {
        const textContent = children?.toString() || '';
        const isBreakPoint = textContent.endsWith('.');
        return (
          <>
            <p className="mb-6">{children}</p>
            {isBreakPoint && article?.mediaContent && (
              <>
                {/* Only show YouTube videos in content */}
                {article.mediaContent.type === 'youtube' && article.mediaContent.youtubeUrl && (
                  <div className="my-12">
                    <iframe
                      width="100%"
                      height="400"
                      src={`https://www.youtube.com/embed/${article.mediaContent.youtubeUrl.split('v=')[1]}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
                
                {/* Only show image if it's different from the hero image */}
                {article.mediaContent.type === 'image' && 
                  article.mediaContent.image?.asset?.url && 
                  article.mediaContent.image.asset.url !== article.mainImage?.image.asset.url && (
                  <figure className="my-12">
                    <div className="relative w-full aspect-[16/9]">
                      <Image
                        src={article.mediaContent.image.asset.url}
                        alt="Article media"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 800px"
                      />
                    </div>
                    {article.mediaContent.image.source && (
                      <figcaption className="text-sm text-gray-600 mt-2 text-center">
                        Source: {article.mediaContent.image.source.name}
                      </figcaption>
                    )}
                  </figure>
                )}
              </>
            )}
          </>
        );
      }
    }
  };

  return (
    <div className="article-container relative">
      {/* Hero Image Section */}
      <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
        {article?.mainImage?.image?.asset?.url ? (
          <>
            <Image
              src={article.mainImage.image.asset.url}
              alt={article.headline || 'Article image'}
              fill
              className="object-cover object-center brightness-[0.85]"
              priority
              sizes="100vw"
              quality={90}
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
          </>
        ) : (
          // Fallback image
          <Image
            src="/icons/Headshot/Florence/Florence_2x.webp"
            alt="Test image"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        )}

        {/* Title overlay - centered with dark background */}
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <div className="w-full max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {article.headline}
            </h1>
            <p className="text-sm md:text-base text-gray-300 italic">
              Published on {new Date(article.publishedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Article Content Section */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-0 md:px-4">
        {/* Sidebar Information */}
        <aside className="md:col-span-1 mb-8 md:mb-0 mt-8">
          {/* Florence Headshot */}
          <div className="w-full flex flex-col items-center mb-8">
            <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden mb-4">
              <picture>
                <source
                  srcSet="/icons/Headshot/Florence/Florence_1x.webp 1x, 
                          /icons/Headshot/Florence/Florence_1_5x.webp 1.5x,
                          /icons/Headshot/Florence/Florence_2x.webp 2x,
                          /icons/Headshot/Florence/Florence_3x.webp 3x,
                          /icons/Headshot/Florence/Florence_4x.webp 4x"
                  type="image/webp"
                />
                <Image
                  src="/icons/Headshot/Florence/Florence_1x.webp"
                  alt="Florence Headshot"
                  fill
                  className="object-cover"
                  sizes="120px"
                  priority
                />
              </picture>
            </div>
            <h2 className="text-2xl font-serif">By Florence Oppenheim</h2>
          </div>

          {/* Divider */}
          <hr className="my-8 border-gray-200" />

          {/* Metadata */}
          <div className="bg-white w-full text-center px-4 md:px-0">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Published</h3>
              <p className="text-gray-700">
                {new Date(article.publishedAt).toLocaleDateString()}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Genres</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {article.genres?.map((genre: string, index: number) => (
                  <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Candidate Information */}
          {article.candidate && (
            <div className="w-full bg-gray-50 p-6 mt-16 md:w-[280px] md:mx-auto">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-black mb-1">Name:</h3>
                  <p className="text-gray-700">{article.candidate.name}</p>
                </div>
                <div>
                  <h3 className="font-medium text-black mb-1">Occupation:</h3>
                  <p className="text-gray-700">{article.candidate.occupation}</p>
                </div>
                <div>
                  <h3 className="font-medium text-black mb-1">Purpose:</h3>
                  <p className="text-gray-700">{article.candidate.applicationPurpose}</p>
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* Main Article Content */}
        <div className="md:col-span-2">
          <article className="w-full px-4 md:px-0">
            {/* Reading time */}
            <div className="container mx-auto max-w-3xl">
              <div className="text-gray-500 text-sm mb-12 mt-8">
                {article.readingTime} min read
              </div>
            </div>

            {/* Main text content */}
            <div className="container mx-auto max-w-3xl prose prose-lg">
              <div className="text-lg leading-relaxed text-gray-800">
                {article.excerpt && (
                  <p className="font-semibold mb-6">{article.excerpt}</p>
                )}
                {article.mainContent && (
                  <PortableText 
                    value={article.mainContent} 
                    components={components}
                  />
                )}
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* Related Articles Section */}
      <div className="container mx-auto py-10 px-4">
        <h2 className="text-2xl font-bold text-center mb-12">More Articles</h2>
        {isProjectsLoading && <div>Loading more articles...</div>}
        {projectsError && <div>Error loading articles: {projectsError.message}</div>}
        {!isProjectsLoading && projects && projects.length > 0 && (
          <ProjectGrid projects={relatedProjects} />
        )}
      </div>
    </div>
  );
};

export default ArticleSection;
