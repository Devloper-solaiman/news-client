import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { format, formatDistanceToNow } from "date-fns";

import PostDropdown from "../postActions/postDropdown";
import FollowForPost from "../../userProfile/followForPost";

import { TPost } from "@/src/types";
import { ActiveAvatar } from "@/src/app/(withCommonLayout)/_component/ui/navbar/activeAvatar";

interface PostHeaderProps {
  post: TPost;
}

export default function PostHeader({ post }: PostHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-3">
      <div className="flex items-center gap-3">
        <Link href={`/profile/${post?.user?._id}`}>
          <ActiveAvatar
            className="cursor-pointer"
            name={post?.user?.name?.charAt(0).toUpperCase()}
            size="md"
            src={post?.user?.image || undefined}
            userId={post?.user?._id as string}
          />
        </Link>
        <div className="flex flex-col items-start -mt-2">
          <div className="flex flex-row gap-1 items-center">
            <Link
              className="font-semibold text-default-900 flex items-center gap-1 mt-0.5 whitespace-nowrap"
              href={`/profile/${post?.user?._id}`}
            >
              {post?.user?.name}{" "}
              {post?.user?.verified && (
                <GoVerified className="text-primaryColor" />
              )}
            </Link>
            <div className="-mt-2 mx-2">
              <FollowForPost userId={post?.user?._id} />
            </div>
          </div>
          <p className="block text-xs text-default-500">
            {formatDistanceToNow(post?.createdAt, { addSuffix: true })} (
            {format(post?.createdAt, "MMMM do, yyyy")})
          </p>
        </div>
      </div>
      <PostDropdown postData={post} userInfo={post?.user} />
    </div>
  );
}
