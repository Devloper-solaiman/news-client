"use client";

import React from "react";
import { Avatar, AvatarProps } from "@nextui-org/avatar";
import { Badge } from "@nextui-org/badge";

import { useIsConnected } from "@/src/context/isConnectProvider";

interface ActiveAvatarProps extends AvatarProps {
  userId: string;
  showConnectionStatus?: boolean;
}

export const ActiveAvatar: React.FC<ActiveAvatarProps> = ({
  userId,
  showConnectionStatus = true,
  ...props
}) => {
  const { onlineUsers } = useIsConnected();

  // Check if the current user is online
  const isOnline = onlineUsers.includes(userId);

  return (
    <Badge
      color="success"
      content=""
      isInvisible={!showConnectionStatus || !isOnline}
      placement="bottom-right"
      shape="circle"
      size="sm"
    >
      <Avatar {...props} />
    </Badge>
  );
};
