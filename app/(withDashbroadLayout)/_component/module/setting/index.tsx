"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import { useTheme } from "next-themes";
import { FiMoon, FiSun, FiBell, FiShield } from "react-icons/fi";
import { Avatar } from "@nextui-org/avatar";
import { Switch } from "@nextui-org/switch";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import Link from "next/link";

import UpdateUserModal from "../../modal/updateUserModal";
import ChangePasswordModal from "../../modal/passwordChangeModal";

import { useUser } from "@/src/hooks/useUser";
import ThemeDropdown from "@/src/components/modal/themeDropdown";

export default function Settings() {
  const { userInfo } = useUser();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen">
      <div className="w-full mx-auto bg-default-50  rounded-xl shadow-2xl overflow-hidden border border-default-100">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-xl font-bold text-pink-600 ">Settings</h1>
            <Link href={`/profile/${userInfo?._id}`}>
              <Avatar
                className="rounded-full object-cover text-[22px]"
                name={userInfo?.name?.charAt(0).toUpperCase()}
                size="lg"
                src={userInfo?.image || undefined}
              />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Change Password Button */}
            <ChangePasswordModal />

            {/* Edit Profile Button */}
            <UpdateUserModal
              address={userInfo?.address}
              bio={userInfo?.bio || ""}
              country={userInfo?.country}
              defaultImage={userInfo?.image}
              defaultName={userInfo?.name || ""}
              userId={userInfo?._id || ""}
            />

            {/* Theme Toggle */}
            <div className="flex items-center justify-between bg-default-100 border border-default-200 p-4 rounded-lg">
              <p className="text-pink-600  flex items-center gap-2">
                {theme === "dark" ? <FiMoon /> : <FiSun />} Theme
              </p>
              <ThemeDropdown />
            </div>

            {/* Notification Preferences */}
            <div className="bg-default-100 border border-default-200 p-4 rounded-lg">
              <p className="text-pink-600  flex items-center gap-2 mb-2">
                <FiBell /> Notifications
              </p>
              <div className="flex flex-col gap-2">
                <Switch defaultSelected color="danger">
                  Email Notifications
                </Switch>
                <Switch defaultSelected color="danger">
                  Push Notifications
                </Switch>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="bg-default-100 border border-default-200 p-4 rounded-lg col-span-full">
              <p className="text-pink-600  flex items-center gap-2 mb-2">
                <FiShield /> Privacy
              </p>
              <div className="flex flex-col gap-2">
                <Switch defaultSelected color="danger">
                  Make profile public
                </Switch>
                <Switch color="danger">
                  Allow others to see online status
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      <Modal
        className="bg-white  p-6 rounded-2xl"
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      >
        <ModalHeader>
          <p className="text-2xl font-bold text-pink-600 ">Change Password</p>
        </ModalHeader>
        <ModalBody>
          <Input
            className="mb-4"
            label="Current Password"
            name="current"
            type="password"
            value={password.current}
            onChange={handlePasswordChange}
          />
          <Input
            className="mb-4"
            label="New Password"
            name="new"
            type="password"
            value={password.new}
            onChange={handlePasswordChange}
          />
          <Input
            label="Confirm New Password"
            name="confirm"
            type="password"
            value={password.confirm}
            onChange={handlePasswordChange}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onPress={() => setIsPasswordModalOpen(false)}>
            Change Password
          </Button>
        </ModalFooter>
      </Modal>

      {/* Edit Profile Modal */}
      <Modal
        className="bg-white  p-6 rounded-2xl"
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      >
        <ModalHeader>
          <p className="text-2xl font-bold text-pink-600 ">Edit Profile</p>
        </ModalHeader>
        <ModalBody>
          <Input className="mb-4" label="Name" placeholder="Your Name" />
          <Input
            className="mb-4"
            label="Email"
            placeholder="your.email@example.com"
          />
          <Input label="Bio" placeholder="Tell us about yourself" />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onPress={() => setIsProfileModalOpen(false)}>
            Save Changes
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
