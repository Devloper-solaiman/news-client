"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDisclosure } from "@nextui-org/modal";

import CommentEditModal from "../../../../modal/commentEditModal";
import CommentDeleteModal from "../../../../modal/commentDeleteModal";

import { TRenderedComment } from "./commentCard";

import { useUser } from "@/src/hooks/useUser";

interface CommentDropdownProps {
  comment: TRenderedComment;
}

export default function CommentDropdown({ comment }: CommentDropdownProps) {
  const { userInfo: currentUser } = useUser();

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditChange,
  } = useDisclosure();

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteChange,
  } = useDisclosure();

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button
            isIconOnly
            className="bg-default-100 hover:bg-default-200"
            radius="full"
            size="sm"
            startContent={<BsThreeDotsVertical />}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Comment Actions">
          <DropdownItem
            key="edit-post"
            className={`${comment?.user?._id === currentUser?._id && "hidden"}`}
            onClick={onEditOpen}
          >
            Edit post
          </DropdownItem>
          <DropdownItem
            key="delete-post"
            className={`text-danger ${comment?.user?._id === currentUser?._id && "hidden"}`}
            color="danger"
            onClick={onDeleteOpen}
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {/* Edit Comment Modal */}
      <CommentEditModal
        comment={comment}
        isOpen={isEditOpen}
        onOpenChange={onEditChange}
      />

      {/* Delete Comment Modal */}
      <CommentDeleteModal
        commentId={comment.comId}
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteChange}
      />
    </>
  );
}
