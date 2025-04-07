"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProjectCard from "./ProjectCard";

interface Project {
  _id: string;
  headline: string;
  excerpt: string;
  mainImage: any;
}

interface ProjectGridProps {
  projects: Project[];
  currentArticleId?: string;
}

const ProjectGrid = ({ projects, currentArticleId }: ProjectGridProps) => {
  // Filter out current article and shuffle the rest
  const filteredProjects = projects
    .filter(project => project._id !== currentArticleId)
    .sort(() => Math.random() - 0.5);

  return (
    <div className="w-full max-w-[2400px] mx-auto px-4">
      <Carousel>
        <CarouselContent className="-ml-4">
          {filteredProjects.map((project) => (
            <CarouselItem key={project._id} className="pl-4 md:basis-1/2 lg:basis-1/3 flex justify-center">
              <div className="w-[350px] h-[450px]">
                <ProjectCard
                  title={project.headline}
                  cardDescription={project.excerpt}
                  mainImage={project.mainImage}
                  _id={project._id}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-4 bg-gray-200 hover:bg-gray-300 text-gray-800 border-none shadow-lg transition-all duration-300" />
        <CarouselNext className="mr-4 bg-gray-200 hover:bg-gray-300 text-gray-800 border-none shadow-lg transition-all duration-300" />
      </Carousel>
    </div>
  );
};

export default ProjectGrid;
