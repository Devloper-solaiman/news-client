"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { toast } from "sonner";

import { TRenderedComment } from "../module/posts/postActions/postComments/commentCard";

import GlassLoader from "@/src/components/shared/glassLoader";
import { useUpdateCommentsForPostsMutation } from "@/src/redux/features/post/commentApi";

interface CommentEditModalProps {
  comment: TRenderedComment;
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function CommentEditModal({
  comment,
  isOpen,
  onOpenChange,
}: CommentEditModalProps) {
  const [editCommentFn, { isLoading }] = useUpdateCommentsForPostsMutation();
  const [updatedCommentText, setUpdatedCommentText] = useState<string>(
    comment.text,
  );
  const [isError, setIsError] = useState<string>("");

  const handleEdit = async () => {
    const newData = {
      commentId: comment.comId,
      data: { text: updatedCommentText },
    };

    try {
      await editCommentFn(newData);
      toast.success("Comment edited successfully");
      setIsError("");
      onOpenChange(); // Close the modal
    } catch (error) {
      setIsError("Failed to edit comment");
      toast.error("Failed to edit comment");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      size="md"
      onOpenChange={onOpenChange}
    >
      {isLoading && <GlassLoader />}
      <ModalContent className="m-2">
        <ModalHeader>Edit Comment</ModalHeader>
        <ModalBody>
          {isError && <p className="text-center text-red-500">{isError}</p>}
          <textarea
            className="w-full p-2 border rounded-md border-default-100 text-xs focus:border-default-300 focus:outline-none"
            rows={4}
            value={updatedCommentText}
            onChange={(e) => setUpdatedCommentText(e.target.value)}
          />
        </ModalBody>
        <ModalFooter className="flex items-center gap-8 my-3 justify-end">
          <Button className="primary-button" onClick={handleEdit}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
