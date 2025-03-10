"use client";

import { Bell } from "lucide-react";
import React from "react";
import { Badge } from "@nextui-org/badge";
import Link from "next/link";
import { motion } from "framer-motion";

import NavDropdown from "@/src/app/(withCommonLayout)/_component/ui/navbar/navDropdown";
import { useAppSelector } from "@/src/redux/hook";
import { getNotifications } from "@/src/redux/features/message/notificationSlice";
import ThemeDropdown from "@/src/components/modal/themeDropdown";

export default function NavRightContent() {
  const notifications = useAppSelector(getNotifications);

  return (
    <div className="flex items-center justify-center gap-5">
      {notifications?.length ? (
        <motion.div
          animate={{ scale: 1 }}
          className="mt-2.5"
          initial={{ scale: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <Badge
            as={Link}
            className="text-[8px]"
            color="danger"
            content={notifications.length}
            href="/notifications"
            shape="circle"
            size="sm"
          >
            <Bell size={18} />
          </Badge>
        </motion.div>
      ) : (
        <Bell size={18} />
      )}
      <ThemeDropdown />
      <NavDropdown />
    </div>
  );
}
