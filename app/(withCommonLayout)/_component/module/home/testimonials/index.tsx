"use client";

import { motion } from "framer-motion";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { Avatar } from "@nextui-org/avatar";

import SectionTitle from "../../../ui/sectionTitle";

import { useGetAllReviewsQuery } from "@/src/redux/features/review/reviewApi";
import { TReview } from "@/src/types";

export default function Testimonials() {
  const { data: reviewData } = useGetAllReviewsQuery(undefined);
  const reviews = reviewData?.data?.slice(0, 4) ?? ([] as TReview[]);

  return (
    <>
      <SectionTitle text="Testimonials" />
      <section className="mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map(({ user, quote }: TReview, index: number) => {
              const variant =
                index === 0 || index === 3
                  ? "bg-pink-500 text-white"
                  : "bg-default-50 text-default-700 border border-default-100";

              return (
                <motion.div
                  key={user?.name}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-2xl p-6 ${variant}`}
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="relative h-16 w-16 flex-shrink-0">
                      <Avatar
                        className="text-xl"
                        name={user?.name?.charAt(0)?.toUpperCase()}
                        radius="full"
                        size="lg"
                        src={user?.image || undefined}
                      />
                    </div>
                    <div className="space-y-1">
                      <blockquote className="text-sm">
                        {quote.slice(0, 45) + "..."}
                      </blockquote>
                      <div
                        className={`${index === 0 || index === 3 ? "text-default-50" : "text-default-700"}`}
                      >
                        <p className="font-medium">{user?.name}</p>
                        <p className="text-sm">{user?.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
          >
            <div className="space-y-4">
              <h2 className="text-lg md:text-2xl lg:text-4xl font-bold text-pink-500">
                Join Our Travel Community & Explore Hidden Gems!
              </h2>
              <p className="text-gray-600">
                Discover expert travel tips, must-visit destinations, and
                exclusive guides curated by real travelers. Whether you are a
                solo backpacker, a luxury traveler, or someone planning a family
                getaway, our community is here to help you make the most of
                every adventure. Get insider recommendations, find hidden gems
                off the beaten path, and connect with fellow travelers who share
                your passion for exploration. Share your stories, ask for
                advice, and stay updated on the latest travel trends—all in one
                place!
              </p>
            </div>

            <Button
              as={Link}
              className="font-medium secondary-button"
              href="/reviews"
              radius="full"
              variant="solid"
            >
              MORE REVIEWS
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
