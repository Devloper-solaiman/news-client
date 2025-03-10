import React, { Suspense } from "react";

import AdminProfile from "../_component/module/adminDashboard/profile";

import ProfileSkeleton from "@/src/components/ui/skeleton/profileSkeleton";

export default function AdminDashboard() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <AdminProfile />
    </Suspense>
  );
}
