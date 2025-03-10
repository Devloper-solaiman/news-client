import React from "react";
import Marquee from "react-fast-marquee";

import PremiumPostSuggestionCard from "./premiumPostSuggestionCard";

import { TPost } from "@/src/types";

interface PremiumPostsMarqueeProps {
  posts: TPost[];
}

export default function PremiumPostsMarquee({
  posts,
}: PremiumPostsMarqueeProps) {
  return (
    <div className="w-full my-5 block lg:hidden">
      <Marquee
        gradient={false} // Disable gradient for a cleaner look
        pauseOnHover={true} // Stops scrolling on hover
        speed={50} // Speed of the marquee scroll
      >
        {posts?.map((post) => (
          <div key={post._id} className="mx-2">
            <PremiumPostSuggestionCard post={post} />
          </div>
        ))}
      </Marquee>
    </div>
  );
}
