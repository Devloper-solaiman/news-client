"use client";

import React, { useState } from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Pagination } from "@nextui-org/pagination";

import ContentTable from "./contentTable";

import { TPost } from "@/src/types";
import {
  useGetAllPostsNormalForAnalyticsQuery,
  useGetAllPostsPremiumForAnalyticsQuery,
} from "@/src/redux/features/adminManagement/managePostApi";
import TableSkeleton from "@/src/components/ui/skeleton/tableSkeleton";

export default function ManageContent() {
  // Separate state for page for each tab
  const [pageAll, setPageAll] = useState(1);
  const [pagePremium, setPagePremium] = useState(1);
  const limit = 10;

  // Fetch all posts and premium posts with pagination
  const {
    data: allPostsData,
    isLoading: isLoadingAllPosts,
    isError: isErrorAllPosts,
  } = useGetAllPostsNormalForAnalyticsQuery({
    sort: "-createdAt",
    limit: limit.toString(),
    page: pageAll.toString(),
  });

  const {
    data: premiumPostsData,
    isLoading: isLoadingPremiumPosts,
    isError: isErrorPremiumPosts,
  } = useGetAllPostsPremiumForAnalyticsQuery({
    page: pagePremium,
    limit,
  });

  // Destructure post data
  const allPosts: TPost[] = allPostsData?.data || [];
  const premiumPosts: TPost[] = premiumPostsData?.data || [];
  const metaAll = allPostsData?.meta;
  const metaPremium = premiumPostsData?.meta;

  // Handle page change for all posts
  const handlePageChangeAll = (newPage: number) => {
    setPageAll(newPage); // Update page state for all posts
  };

  // Handle page change for premium posts
  const handlePageChangePremium = (newPage: number) => {
    setPagePremium(newPage); // Update page state for premium posts
  };

  return (
    <div className="flex w-full flex-col">
      {isLoadingAllPosts || isLoadingPremiumPosts ? (
        <TableSkeleton />
      ) : (
        <>
          <Tabs aria-label="Post Categories">
            <Tab key="normal" title="All Posts">
              <ContentTable isLoading={isLoadingAllPosts} posts={allPosts} />
              {/* Pagination for All Posts */}

              {metaAll?.total > metaAll?.limit && (
                <>
                  {" "}
                  <div className="mt-10 flex justify-center items-start">
                    <Pagination
                      showControls
                      className="mb-5 px-5 py-2 mx-3 border-none shadow-none rounded-full bg-default-50"
                      color="default"
                      page={pageAll}
                      total={metaAll?.totalPage || 1}
                      variant="flat"
                      onChange={handlePageChangeAll}
                    />
                  </div>
                </>
              )}
            </Tab>
            <Tab key="premium" title="Premium Posts">
              <ContentTable
                isLoading={isLoadingPremiumPosts}
                posts={premiumPosts}
              />
              {/* Pagination for Premium Posts */}
              {metaPremium?.total > metaPremium?.limit && (
                <>
                  <div className="mt-10 flex justify-center items-start">
                    <Pagination
                      showControls
                      className="mb-5 px-5 py-2 mx-3 border-none shadow-none rounded-full bg-default-50"
                      color="default"
                      page={pagePremium}
                      total={metaPremium?.totalPage || 1}
                      variant="flat"
                      onChange={handlePageChangePremium}
                    />
                  </div>
                </>
              )}
            </Tab>
          </Tabs>
        </>
      )}
    </div>
  );
}
