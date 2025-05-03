import Image from "next/image";
import React from "react";
import { LuCalendarDays, LuClock } from "react-icons/lu";

interface PostHeaderProps {
  title: string;
  cover: string;
  author: string;
  createdAt: string;
  readingTime: number;
}

const PostHeader = ({
  title,
  author,
  cover,
  createdAt,
  readingTime,
}: PostHeaderProps) => {
  return (
    <div className="container mx-auto mb-14 sm:mb-12 lg:mb-20">
      <h1 className="text-3xl leading-snug sm:text-4xl lg:text-4xl lg:leading-normal font-bold">
        {title.toUpperCase().charAt(0)}
        {title.slice(1)}
      </h1>

      <div className="relative mt-8 h-96 w-full">
        <Image
          src={cover}
          alt={title}
          fill
          className="my-6 w-full h-full object-contain bg-gray-950"
          priority
        />
      </div>
    </div>
  );
};

export default PostHeader;
