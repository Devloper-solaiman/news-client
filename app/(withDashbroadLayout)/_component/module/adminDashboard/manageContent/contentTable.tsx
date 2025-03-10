"use client";

import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Avatar } from "@nextui-org/avatar";
import { Chip } from "@nextui-org/chip";
import Link from "next/link";
import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";
import { BsTrash } from "react-icons/bs";
import { PiCrownSimpleDuotone } from "react-icons/pi";
import { useDisclosure } from "@nextui-org/modal";

import DeletePostModal from "../../../modal/deletePostModal";

import { TPost } from "@/src/types";

type ContentTableProps = {
  posts: TPost[];
  isLoading: boolean;
};

const ContentTable: React.FC<ContentTableProps> = ({ posts }) => {
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteChange,
  } = useDisclosure();

  const [postToDelete, setPostToDelete] = useState<string>("");

  const handleDeleteClick = (postId: string) => {
    setPostToDelete(postId);
    onDeleteOpen();
  };

  return (
    <>
      <Table aria-label="Post Table" className="overflow-x-auto">
        <TableHeader>
          <TableColumn>Profile</TableColumn>
          <TableColumn>Title</TableColumn>
          <TableColumn>Description</TableColumn>
          <TableColumn>Category</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Subscription</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post._id}>
              <TableCell>
                <div className="flex gap-1">
                  <Tooltip content={post.user?.name}>
                    <Avatar
                      as={Link}
                      href={`/profile/${post.user?._id}`}
                      name={post.user?.name?.charAt(0)?.toUpperCase()}
                      size="sm"
                      src={post.user?.image || undefined}
                    />
                  </Tooltip>
                </div>
              </TableCell>

              <TableCell>
                <Link
                  className="whitespace-nowrap hover:underline"
                  href={`/news-feed/posts/${post._id}`}
                >
                  {post.title?.length > 15
                    ? post.title.slice(0, 15) + "..."
                    : post.title}
                </Link>
              </TableCell>
              <TableCell>
                <div
                  className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap"
                  title={post.description.replace(/<[^>]+>/g, "")} // Show full description on hover
                >
                  {post.description.replace(/<[^>]+>/g, "").length > 30
                    ? post.description.replace(/<[^>]+>/g, "").slice(0, 30) +
                      "..."
                    : post.description.replace(/<[^>]+>/g, "")}
                </div>
              </TableCell>

              <TableCell>
                <Chip className="w-[100px]" size="sm" variant="bordered">
                  {post.category}
                </Chip>
              </TableCell>
              <TableCell>
                {post.status === "FREE" ? (
                  <Chip color="success" size="sm" variant="dot">
                    Available
                  </Chip>
                ) : (
                  <Chip color="danger" size="sm" variant="dot">
                    Unavailable
                  </Chip>
                )}
              </TableCell>
              <TableCell>
                {post.status === "FREE" ? (
                  <Chip
                    className="bg-primaryColor bg-opacity-30 border border-default-200"
                    size="sm"
                    variant="flat"
                  >
                    Free
                  </Chip>
                ) : (
                  <Chip
                    color="warning"
                    endContent={
                      <PiCrownSimpleDuotone className="text-warning" />
                    }
                    size="sm"
                    variant="flat"
                  >
                    Premium
                  </Chip>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Button
                    isIconOnly
                    size="sm"
                    startContent={<BsTrash className="text-primaryColor" />}
                    onClick={() => handleDeleteClick(post._id)} // Handle delete click
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Modal for deleting the post */}
      <DeletePostModal
        isOpen={isDeleteOpen}
        postId={postToDelete}
        onOpenChange={onDeleteChange}
      />
    </>
  );
};

export default ContentTable;
