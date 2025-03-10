"use client";

import React, { useState } from "react";
import Link from "next/link";

import { TComment } from "@/src/types";

import "react-comments-section/dist/index";
import { GoVerified } from "react-icons/go";

import ReplyCommentInput from "./replyCommentInput";
import CommentInput from "./commentInput";
import CommentDropdown from "./commentDropdown";

import {
  useAddCommentsForPostsMutation,
  useGetCommentsForPostsQuery,
  useReplayCommentsForPostsMutation,
} from "@/src/redux/features/post/commentApi";
import { useUser } from "@/src/hooks/useUser";
import { ActiveAvatar } from "@/src/app/(withCommonLayout)/_component/ui/navbar/activeAvatar";

// Component Props
interface DetailsCommentCardProps {
  postId: string;
}

// Comment Data Interface for rendering purposes
interface RenderedComment {
  [x: string]: any;
  userId: string;
  comId: string;
  fullName: string;
  avatarUrl: string | undefined;
  text: string;
  replies?: RenderedComment[];
}

const DetailsCommentCard: React.FC<DetailsCommentCardProps> = ({ postId }) => {
  // Fetching comments data using hook query
  const { data: commentsData } = useGetCommentsForPostsQuery(postId);
  const comments = commentsData?.data as TComment[] | undefined;

  // Current user
  const { userInfo: currentUser } = useUser();

  // Extract replies' _id from comments
  const repliesId =
    comments?.flatMap((comment) =>
      comment?.replies?.map((reply) => reply._id),
    ) ?? [];

  // Filter out comments whose _id matches any replies' _id
  const filteredComments =
    comments?.filter((comment) => !repliesId.includes(comment._id)) ?? [];

  // Transform comments for rendering
  const transformedComments: RenderedComment[] = filteredComments.map(
    (comment) => ({
      userId: comment.user._id,
      verified: comment?.user?.verified,
      comId: comment._id,
      fullName: comment.user.name,
      avatarUrl: comment.user.image,
      text: comment.text,
      replies: comment.replies?.map((reply) => ({
        userId: reply.user?._id,
        comId: reply._id,
        verified: reply?.user?.verified,
        fullName: reply.user?.name || "Anonymous",
        avatarUrl: reply.user?.image || undefined,
        text: reply.text,
      })),
    }),
  );

  // Comment hook mutations
  const [addComment] = useAddCommentsForPostsMutation();
  const [replyComment] = useReplayCommentsForPostsMutation();

  // State management
  const [newComment, setNewComment] = useState<string>("");
  const [replyCommentText, setReplyCommentText] = useState<string>("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  // New Comment Submission Handler
  const handleNewCommentSubmit = async () => {
    try {
      const commentData = { post: postId, text: newComment };

      await addComment(commentData);
      setNewComment("");
    } catch (error) {
      console.error("Error submitting new comment:", error);
    }
  };

  // Reply Comment Submission Handler
  const handleReplySubmit = async () => {
    if (!replyingTo) return;

    try {
      const replyData = {
        commentId: replyingTo,
        data: { post: postId, text: replyCommentText },
      };

      await replyComment(replyData);
      setReplyCommentText("");
      setReplyingTo(null);
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  // Handle canceling reply action
  const handleReplyCancel = () => {
    setReplyCommentText("");
    setReplyingTo(null);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xs font-semibold">Comments</h2>
      {transformedComments.map((comment) => (
        <div key={comment.comId} className="space-y-2">
          <div className="flex items-start justify-between space-x-3">
            <div className="flex items-start space-x-3">
              <Link href={`/profile/${comment?.userId}`}>
                {" "}
                <ActiveAvatar
                  alt={`${comment.fullName}'s avatar`}
                  className="cursor-pointer"
                  name={comment.fullName.charAt(0).toUpperCase()}
                  size="sm"
                  src={comment.avatarUrl}
                  userId={comment?.userId as string}
                />
              </Link>
              <div>
                <Link
                  className="font-semibold text-sm flex items-center gap-1 text-default-700"
                  href={`/profile/${comment?.userId}`}
                >
                  {comment.fullName}
                  {comment?.verified! && (
                    <GoVerified className="text-primaryColor" />
                  )}{" "}
                </Link>
                <div className="text-xs">{comment.text}</div>

                {replyingTo === comment.comId ? (
                  <ReplyCommentInput
                    value={replyCommentText}
                    onCancel={handleReplyCancel}
                    onChange={(e) => setReplyCommentText(e.target.value)}
                    onSubmit={handleReplySubmit}
                  />
                ) : (
                  <button
                    className="text-xs text-pink-500 hover:underline"
                    onClick={() => setReplyingTo(comment.comId)}
                  >
                    Reply
                  </button>
                )}
              </div>
            </div>
            {/* Dropdown for Edit/Delete options */}
            {comment.userId === currentUser?._id && (
              <CommentDropdown comment={comment} />
            )}
          </div>

          {/* Render replies */}
          {comment?.replies?.length! > 0 && (
            <div className="mt-4 space-y-2 pl-8 border-l-2 border-default-200">
              {comment?.replies?.map((reply) => (
                <div
                  key={reply.comId}
                  className="flex items-start justify-between space-x-3"
                >
                  <div className="flex items-start space-x-3">
                    <Link href={`/profile/${reply?.userId}`}>
                      <ActiveAvatar
                        alt={`${reply.fullName}'s avatar`}
                        className="cursor-pointer"
                        name={reply.fullName.charAt(0).toUpperCase()}
                        size="sm"
                        src={reply.avatarUrl}
                        userId={reply?._id as string}
                      />
                    </Link>
                    <div>
                      <Link
                        className="font-semibold text-sm flex items-center gap-1 text-default-700"
                        href={`/profile/${comment?.userId}`}
                      >
                        {reply.fullName}{" "}
                        {reply?.verified! && (
                          <GoVerified className="text-primaryColor" />
                        )}
                      </Link>
                      <div className="text-xs">{reply.text}</div>
                    </div>
                  </div>
                  {/* Dropdown for replies as well */}
                  {reply.userId === currentUser?._id && (
                    <CommentDropdown comment={reply} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Comment Input for new comments */}
      <CommentInput
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        onSubmit={handleNewCommentSubmit}
      />
    </div>
  );
};

export default DetailsCommentCard;
