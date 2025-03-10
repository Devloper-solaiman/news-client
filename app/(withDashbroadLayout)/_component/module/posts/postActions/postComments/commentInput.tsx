import React from "react";
import { IoSend } from "react-icons/io5";
import { Button } from "@nextui-org/button";
import { motion } from "framer-motion";
import Link from "next/link";

import { useUser } from "@/src/hooks/useUser";
import { ActiveAvatar } from "@/src/app/(withCommonLayout)/_component/ui/navbar/activeAvatar";

interface CommentInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

export default function CommentInput({
  value,
  onChange,
  onSubmit,
}: CommentInputProps) {
  const { userInfo: currentUser } = useUser();

  return (
    <div className="flex items-center justify-between rounded-lg shadow-sm gap-4 w-full mt-3">
      <div className="flex items-center gap-2 w-full">
        {/* Avatar */}
        <Link href={`/profile/${currentUser?._id}`}>
          <ActiveAvatar
            alt="Profile Picture"
            className="cursor-pointer"
            name={currentUser?.name.charAt(0).toUpperCase()}
            size="md"
            src={currentUser?.image || undefined}
            userId={currentUser?._id as string}
          />
        </Link>
        {/* Input Box */}
        <input
          className="flex-grow bg-default-50 px-2 py-1 text-xs rounded-full border border-default-200 focus:outline-none focus:ring-1 focus:ring-default-300 w-full"
          placeholder="Write a comment..."
          type="text"
          value={value}
          onChange={onChange}
        />
      </div>
      {/* Send Icon with Framer Motion Animation */}
      <motion.div
        whileHover={{ scale: 1.1 }} // Scale animation on hover
        whileTap={{ scale: 0.9 }} // Scale down slightly on tap/click
      >
        <Button
          isIconOnly
          className="bg-default-50"
          radius="full"
          size="sm"
          startContent={<IoSend className="text-primaryColor" size={18} />}
          onPress={onSubmit}
        />
      </motion.div>
    </div>
  );
}
