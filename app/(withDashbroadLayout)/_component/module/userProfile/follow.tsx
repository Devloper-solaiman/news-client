"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/button";
import { UserPlusIcon, X } from "lucide-react";

import {
  useFollowMutation,
  useGetSingleUserQuery,
  useUnFollowMutation,
} from "@/src/redux/features/user/userApi";
import { useUser } from "@/src/hooks/useUser";

interface TFollowProps {
  userId: string | undefined;
}

export default function Follow({ userId }: TFollowProps) {
  const [followFn, { isLoading: followIsLoading }] = useFollowMutation();
  const [unFollowFn, { isLoading: unFollowIsLoading }] = useUnFollowMutation();
  const { data: userData } = useGetSingleUserQuery(userId);
  const user = userData?.data;
  const { userInfo: currentUser } = useUser();
  const currentUserId = currentUser?._id;
  const exists = user?.follower?.includes(currentUserId);

  const followHandler = async () => {
    try {
      await followFn(userId);
    } catch (error) {
      console.error("Follow failed===>", error);
    }
  };

  const unFollowHandler = async () => {
    try {
      await unFollowFn(userId);
    } catch (error) {
      console.error("Unfollow failed===>", error);
    }
  };

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-4 mt-4 justify-center w-full"
      initial={{ opacity: 0, y: 10 }}
      transition={{ delay: 0.3, duration: 0.4 }}
    >
      {exists ? (
        <Button
          className="secondary-button"
          disabled={unFollowIsLoading}
          isLoading={unFollowIsLoading}
          radius="full"
          size="sm"
          startContent={<X className="size-4" />}
          onClick={unFollowHandler}
        >
          {unFollowIsLoading ? "Unfollowing..." : "Unfollow"}
        </Button>
      ) : (
        <Button
          className="primary-button"
          disabled={followIsLoading}
          isLoading={followIsLoading}
          radius="full"
          size="sm"
          startContent={<UserPlusIcon className="size-4" />}
          onClick={followHandler}
        >
          {followIsLoading ? "Following..." : "Follow Back"}
        </Button>
      )}
    </motion.div>
  );
}
