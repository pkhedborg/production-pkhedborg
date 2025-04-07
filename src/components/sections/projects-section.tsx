"use client";

import Link from 'next/link';
import useSanityArticleHeader from '../../sanity/hooks/useSanityArticleHeader';
import ProjectGrid from '../ui/ProjectGrid';
import useSanityProjects from '../../sanity/hooks/useSanityProjects';
import SkeletonLoader from '../ui/SkeletonLoader';
import Image from 'next/image';

const ProjectSection = () => {
  const { projects, isLoading: isProjectsLoading, error: projectsError } = useSanityProjects();
  const { articleHeader, isLoading: isHeaderLoading, error: headerError } = useSanityArticleHeader();

  // Debug logs
  console.log('Projects:', projects);
  console.log('Article Header:', articleHeader);
  console.log('Loading States:', { isProjectsLoading, isHeaderLoading });
  console.log('Errors:', { projectsError, headerError });

  // Filter to show only non-header articles
  const carouselProjects = projects?.filter(project => !project.isHeaderArticle) || [];
  console.log('Filtered Carousel Projects:', carouselProjects);

  // Function to truncate text to first few sentences
  const truncateText = (text: string) => {
    if (!text) return '';
    return text.length > 400 ? `${text.slice(0, 400)}...` : text;
  };

  return (
    <section className="project-section py-16 bg-[#252932] text-white">
      <div className="container mx-auto max-w-[2400px] py-10 px-4">
        {/* Header Article */}
        {isHeaderLoading ? (
          <div className="w-full lg:w-1/2">
            <SkeletonLoader />
          </div>
        ) : articleHeader ? (
          <div className="flex flex-col-reverse lg:flex-row w-full gap-8">
            {/* Content Section */}
            <div className="w-full lg:w-1/2 text-center lg:text-left lg:pl-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                {articleHeader.headline}
              </h2>
              <p className="text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-[600px] leading-relaxed px-4 sm:px-0">
                {truncateText(articleHeader.excerpt)}
              </p>

              <div className="flex justify-center lg:justify-start">
                <Link 
                  href={`/article/${articleHeader._id}`}
                  className="text-red-500 font-semibold hover:text-red-400 inline-flex items-center"
                >
                  Learn more →
                </Link>
              </div>
            </div>

            {/* Image Section */}
            <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
              <div className="relative w-full aspect-[16/10] group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                {articleHeader.mainImage && (
                  <Image
                    src={articleHeader.mainImage.image.asset.url}
                    alt={articleHeader.headline}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 600px"
                    priority
                  />
                )}
              </div>
            </div>
          </div>
        ) : null}

        {/* Carousel Projects */}
        <div className="w-full max-w-none py-10 px-4">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-8 sm:mb-12">More Articles</h2>

          {isProjectsLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <SkeletonLoader key={i} />
              ))}
            </div>
          ) : carouselProjects.length > 0 ? (
            <ProjectGrid projects={carouselProjects} />
          ) : (
            <div className="text-center">No additional articles found.</div>
          )}
        </div>

        {/* Error handling */}
        {projectsError && <div className="text-center text-red-500">Error loading articles: {projectsError.message}</div>}
        {headerError && <div className="text-center text-red-500">Error loading header article: {headerError.message}</div>}
      </div>
    </section>
  );
};

export default ProjectSection;
