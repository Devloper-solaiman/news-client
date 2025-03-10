"use client";

import React from "react";
import { Avatar } from "@nextui-org/avatar";
import { motion } from "framer-motion";
import Link from "next/link";

import Follow from "../publicProfile/follow";

import { TUser } from "@/src/types";
import { useUser } from "@/src/hooks/useUser";

interface TUserSuggestionCardProps {
  user: TUser;
}

export default function ConnectionsSuggestionCard({
  user,
}: TUserSuggestionCardProps) {
  const { userInfo: currentUser } = useUser();

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      className="bg-default-50 border border-default-200 rounded-md p-2 duration-300 ease-in-out"
      initial={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.7 }}
    >
      <div className="flex items-center justify-between gap-3">
        <Link className="flex items-center gap-2" href={`/profile/${user._id}`}>
          <Avatar
            alt={user.name}
            className="text-[20px] text-primaryColor"
            name={user.name.charAt(0).toUpperCase()}
            size="md"
            src={user.image}
          />
          <div className="flex-1">
            <h3 className="font-semibold text-sm text-default-900">
              {user.name}
            </h3>
            <p className="text-default-500 text-xs">{user.email}</p>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          {currentUser?.email !== user.email && <Follow userId={user?._id} />}
        </div>
      </div>
    </motion.div>
  );
}
