"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FaFilePdf } from "react-icons/fa6";
import { Button } from "@nextui-org/button";

import { TPost } from "@/src/types";
import { generatePDF } from "@/src/utils/generatePDF";

interface PostContentProps {
  post: TPost;
}

export default function PostContent({ post }: PostContentProps) {
  useEffect(() => {
    if (!post) {
      return;
    }
  }, [post]);

  // Function to safely render HTML content
  const createMarkup = (html: string) => {
    return { __html: html };
  };

  // Function to style links in the description
  const styleLinksInDescription = (html: string) => {
    return html.replace(
      /<a\s+(href="[^"]*")/g,
      `<a class="text-pink-500 hover:underline" $1`,
    );
  };

  // Title, description pdf creations
  const downloadPDF = async () => {
    generatePDF(post);
  };

  return (
    <div>
      <Link
        className="text-lg font-bold text-default-700"
        href={`/news-feed/posts/${post?._id}`}
      >
        {post?.title}
      </Link>
      <div className="flex items-center gap-1">
        <div
          dangerouslySetInnerHTML={createMarkup(
            styleLinksInDescription(post?.description),
          )}
          className="text-xs md:text-sm text-default-800 mt-2"
        />
      </div>

      {/* Button to download the description and images as a PDF */}
      <div className="flex w-full items-end justify-end">
        <Button
          className="mt-3 h-8 text-pink-500"
          size="sm"
          startContent={<FaFilePdf size={18} />}
          onClick={downloadPDF}
        >
          Download
        </Button>
      </div>
    </div>
  );
}
