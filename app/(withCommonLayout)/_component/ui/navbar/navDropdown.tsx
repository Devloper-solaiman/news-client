"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { toast } from "sonner";
import { useDisclosure } from "@nextui-org/modal";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { motion } from "framer-motion";
import {
  UserCircle,
  Settings,
  Users,
  MessageCircle,
  LogOut,
  UserPlus,
  Bell,
} from "lucide-react";
import { FaConnectdevelop } from "react-icons/fa";
import { TbPremiumRights } from "react-icons/tb";

import { ActiveAvatar } from "./activeAvatar";

import CreateGroupModal from "@/src/app/(withDashbroadLayout)/_component/modal/createGroupModal";
import { Logout } from "@/src/service/logout";
import { useUser } from "@/src/hooks/useUser";
import { clearCredentials, getUser } from "@/src/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hook";

const NavDropdown: FC = () => {
  const dispatch = useAppDispatch();
  const userExists = useAppSelector(getUser);
  const router = useRouter();

  const { userInfo } = useUser();
  const handleLogout = async () => {
    dispatch(clearCredentials());
    await Logout();
    router.push("/");
    toast.success("Logout successful");
  };

  const {
    isOpen: isGroupOpen,
    onOpen: onGroupOpen,
    onOpenChange: onGroupChange,
  } = useDisclosure();

  const dropdownItemClass =
    "flex items-center gap-2 transition-all duration-300 hover:bg-default-50 rounded";
  const dropdownItemClass2 =
    "flex items-center gap-2 transition-all duration-300 text-red-500 hover:text-red-600 bgt-transparent rounded";

  return (
    <>
      {userExists?.email ? (
        <Dropdown>
          <DropdownTrigger>
            <div>
              <ActiveAvatar
                className="cursor-pointer transition-transform hover:scale-105 mt-1"
                name={userInfo?.name.charAt(0).toUpperCase()}
                size="md"
                src={userInfo?.image || undefined}
                userId={userInfo?._id as string}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions">
            <DropdownItem
              as={Link}
              className={`block lg:hidden ${userInfo?.role === "USER" ? "block" : "hidden"} ${dropdownItemClass}`}
              href="/news-feed/premium-posts"
              startContent={<TbPremiumRights className="w-4 h-4" />}
            >
              Premium Posts
            </DropdownItem>
            <DropdownItem
              as={Link}
              className={`${userInfo?.role === "USER" ? "block" : "hidden"} ${dropdownItemClass}`}
              href={
                userInfo?.role === "ADMIN" ? "/admin-dashboard" : "/profile"
              }
              startContent={<UserCircle className="w-4 h-4" />}
            >
              Profile
            </DropdownItem>
            <DropdownItem
              as={Link}
              className={`block lg:hidden ${userInfo?.role === "USER" ? "block" : "hidden"} ${dropdownItemClass}`}
              href="/add-connections"
              startContent={<FaConnectdevelop className="w-4 h-4" />}
            >
              Add Connection
            </DropdownItem>
            <DropdownItem
              as={Link}
              className={dropdownItemClass}
              href="/messages"
              startContent={<MessageCircle className="w-4 h-4" />}
            >
              Chat
            </DropdownItem>
            <DropdownItem
              as={Link}
              className={`block lg:hidden ${userInfo?.role === "USER" ? "block" : "hidden"} ${dropdownItemClass}`}
              href="/notifications"
              startContent={<Bell className="w-4 h-4" />}
            >
              Notifications
            </DropdownItem>

            <DropdownItem
              className={dropdownItemClass}
              startContent={<Users className="w-4 h-4" />}
              onClick={onGroupOpen}
            >
              Create Group
            </DropdownItem>
            <DropdownItem
              className={dropdownItemClass}
              href="/settings"
              startContent={<Settings className="w-4 h-4" />}
            >
              Setting
            </DropdownItem>

            <DropdownItem
              className={dropdownItemClass2}
              startContent={<LogOut className="w-4 h-4" />}
              onClick={handleLogout}
            >
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <div className="flex justify-end">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              as={Link}
              className="secondary-button"
              href="/register"
              size="sm"
            >
              <UserPlus className="w-4 h-4" />
              Register
            </Button>
          </motion.div>
        </div>
      )}
      <CreateGroupModal isOpen={isGroupOpen} onOpenChange={onGroupChange} />
    </>
  );
};

export default NavDropdown;
