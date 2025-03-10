// src/components/MenuBar.tsx
"use client";

import React from "react";
import { FaBell, FaConnectdevelop, FaUsers } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { TbArrowAutofitContentFilled, TbPremiumRights } from "react-icons/tb";
import { RiSecurePaymentFill } from "react-icons/ri";
import { FaFacebookMessenger } from "react-icons/fa6";
import { MdAnalytics, MdDynamicFeed } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@nextui-org/modal";

import PremiumModal from "../premiumModal";

import MenubarButton from "./menubarButton";

import { useAppSelector } from "@/src/redux/hook";
import { useUser } from "@/src/hooks/useUser";

interface TMenuBarProps {
  className: string;
}

export default function MenuBar({ className }: TMenuBarProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { userInfo } = useUser();
  const router = useRouter();
  const token = useAppSelector((state) => state.auth?.token);

  if (!token) {
    router.push("/login");
  }

  return (
    <div
      className={`${className} flex flex-row justify-between lg:justify-center lg:flex-col gap-4 overflow-y-auto scrollbar-hide`}
    >
      {userInfo?.role === "USER" && (
        <>
          {/* Common Menu Items */}
          <MenubarButton
            className="hidden lg:block"
            href="/add-connections"
            icon={<FaConnectdevelop className="text-[17px] md:text-[20px]" />}
            title="Add Connection"
          />
          <MenubarButton
            href="/news-feed/posts"
            icon={<MdDynamicFeed className="text-[17px] md:text-[20px]" />}
            title="News Feed"
          />
          {userInfo?.verified ? (
            <MenubarButton
              href="/news-feed/premium-posts"
              icon={<TbPremiumRights className="text-[17px] md:text-[20px]" />}
              title="Premium Posts"
              onClick={onOpen}
            />
          ) : (
            <MenubarButton
              href="/news-feed/premium-posts"
              icon={<TbPremiumRights className="text-[17px] md:text-[20px]" />}
              title="Get Premium"
              onClick={onOpen}
            />
          )}
          {/* rest of the MenuBar component */}
          <PremiumModal
            isOpen={isOpen}
            user={userInfo}
            onOpenChange={onOpenChange}
          />
          <MenubarButton
            href="/followers"
            icon={<FaUsers className="text-[17px] md:text-[20px]" />}
            title="Followers"
          />
          <MenubarButton
            href="/following"
            icon={
              <IoIosCheckmarkCircle className="text-[17px] md:text-[20px]" />
            }
            title="Flowing"
          />
          <MenubarButton
            href="/notifications"
            icon={<FaBell className="text-[17px] md:text-[20px]" />}
            title="Notifications"
          />
          <MenubarButton
            href="/messages"
            icon={
              <FaFacebookMessenger className="text-[17px] md:text-[20px]" />
            }
            title="Messages"
          />
        </>
      )}

      {/* Admin-specific Menu Items */}
      {userInfo?.role === "ADMIN" && (
        <>
          <MenubarButton
            href="/admin-dashboard/analytics"
            icon={<MdAnalytics className="text-[17px] md:text-[20px]" />}
            title="View Analytics"
          />
          <MenubarButton
            href="/admin-dashboard/manage-users"
            icon={<FaUsers className="text-[17px] md:text-[20px]" />}
            title="Manage Users"
          />
          <MenubarButton
            href="/admin-dashboard/manage-content"
            icon={
              <TbArrowAutofitContentFilled className="text-[17px] md:text-[20px]" />
            }
            title="Manage Content"
          />
          <MenubarButton
            href="/admin-dashboard/payments"
            icon={
              <RiSecurePaymentFill className="text-[17px] md:text-[20px]" />
            }
            title="Payments"
          />
          <MenubarButton
            href="/news-feed/posts"
            icon={<MdDynamicFeed className="text-[17px] md:text-[20px]" />}
            title="News Feed"
          />
          {userInfo?.verified ? (
            <MenubarButton
              className="hidden lg:block"
              href="/news-feed/premium-posts"
              icon={<TbPremiumRights className="text-[17px] md:text-[20px]" />}
              title="Premium Posts"
            />
          ) : (
            <MenubarButton
              className="hidden lg:block"
              href="/news-feed/premium-posts"
              icon={<TbPremiumRights className="text-[17px] md:text-[20px]" />}
              title="Get Premium"
              onClick={onOpen}
            />
          )}
          {/* rest of the MenuBar component */}
          <PremiumModal
            isOpen={isOpen}
            user={userInfo}
            onOpenChange={onOpenChange}
          />
          <MenubarButton
            className="hidden lg:block"
            href="/add-connections"
            icon={<FaConnectdevelop className="text-[17px] md:text-[20px]" />}
            title="Add Connection"
          />
          <MenubarButton
            href="/notifications"
            icon={<FaBell className="text-[17px] md:text-[20px]" />}
            title="Notifications"
          />
          <MenubarButton
            href="/messages"
            icon={
              <FaFacebookMessenger className="text-[17px] md:text-[20px]" />
            }
            title="Messages"
          />
        </>
      )}
    </div>
  );
}
