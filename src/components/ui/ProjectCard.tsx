"use client";

import Link from "next/link";
import Image from "next/image";
import { urlFor } from '../../sanity/lib/sanity'; // Update this import to match your Sanity client setup

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
}

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

const ProjectCard = ({ project, priority = false }: ProjectCardProps) => {
  return (
    <Link 
      href={`/article/${project._id}`}
      className="block h-full w-full group"
    >
      <div className="bg-zinc-900 rounded-lg overflow-hidden h-full w-full flex flex-col transition-transform duration-300 group-hover:scale-[1.02]">
        <div className="w-full h-[200px] sm:h-[250px] md:h-[200px] relative">
          <Image
            src={urlFor(project.mainImage.image).url()}
            alt={project.headline}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            priority={priority}
          />
        </div>
        <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
          <h3 className="text-sm sm:text-base font-semibold mb-2 text-white line-clamp-3 min-h-[4.5rem]">
            {project.headline}
          </h3>
          <p className="text-gray-400 mb-4 text-xs line-clamp-3 flex-grow">
            {project.excerpt}
          </p>
          <span className="text-red-500 group-hover:text-red-400 inline-flex items-center text-xs sm:text-sm mt-auto transition-colors">
            Read More
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;