"use client";

import React from "react";

import MessageCardList from "../_component/module/messages";

import { useUser } from "@/src/hooks/useUser";

export default function MessagePage() {
  const { userInfo } = useUser();

  return (
    <div className="scrollbar-hide">
      <MessageCardList />
    </div>
  );
}
