"use client";

import Link from "next/link";
import Image from "next/image";
import { urlFor } from '../../sanity/lib/sanity'; // Update this import to match your Sanity client setup

interface ProjectCardProps {
  title: string;
  cardDescription: string;
  mainImage: any; // Sanity image type
  _id: string; // Using Sanity's _id for the slug/link
}

const ProjectCard = ({
  title,
  cardDescription,
  mainImage,
  _id,
}: ProjectCardProps) => {
  return (
    <div className="bg-zinc-900 rounded-lg overflow-hidden h-full w-full flex flex-col">
      <div className="w-full h-[200px] sm:h-[250px] md:h-[200px] relative">
        <Image
          src={urlFor(mainImage.image).url()}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        />
      </div>
      <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
        <h3 className="text-base sm:text-lg font-semibold mb-2 text-white line-clamp-4 min-h-[6rem]">
          {title}
        </h3>
        <p className="text-gray-400 mb-4 text-sm sm:text-base line-clamp-2 flex-grow">
          {cardDescription}
        </p>
        <Link 
          href={`/article/${_id}`}
          className="text-red-500 hover:text-red-400 inline-flex items-center text-sm sm:text-base mt-auto"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;