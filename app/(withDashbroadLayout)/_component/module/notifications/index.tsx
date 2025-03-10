"use client";

import React from "react";
import { Avatar } from "@nextui-org/avatar";
import Link from "next/link";
import { Card } from "@nextui-org/card";

import { useAppSelector } from "@/src/redux/hook";
import { getNotifications } from "@/src/redux/features/message/notificationSlice";
import Empty from "@/src/components/ui/empty";

export default function Notification() {
  // Assuming notifications are stored in Redux state
  const notifications = useAppSelector(getNotifications);

  return (
    <div className="flex flex-col items-center space-y-4 p-4 mx-auto">
      {notifications.length === 0 ? (
        <Empty message="No Notification" />
      ) : (
        notifications.map((notification) => (
          <Card
            key={notification?._id}
            as={Link}
            className="w-full bg-default-50 rounded-lg border border-default-100 flex flex-row items-center space-x-4 px-4 py-2 hover:bg-default-100 transition-all duration-200"
            href={`/messages/${notification?.chat?._id}`}
          >
            {/* User Avatar */}
            <Avatar
              alt={notification?.sender?.name}
              as={Link}
              className="cursor-pointer text-[24px] font-bold w-10 h-10"
              href={`/profile/${notification?.sender?._id}`}
              name={notification?.sender?.name?.charAt(0)?.toUpperCase()}
              radius="full"
              src={notification?.sender?.image || undefined}
            />

            {/* Notification Content */}
            <div className="flex-1">
              <p className="text-default-700">
                <span className="font-semibold text-default-700">
                  {notification?.sender?.name}
                </span>{" "}
              </p>
              <p className="text-xs text-default-500">
                {notification?.content}
              </p>
            </div>

            <div>
              <p className="text-xs text-default-500 mt-1">
                {new Date(notification?.createdAt)?.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                · {new Date(notification?.createdAt)?.toLocaleDateString()}
              </p>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}
