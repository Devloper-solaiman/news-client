"use client";

import React from "react";
import { NavbarItem } from "@nextui-org/navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavRoutes } from "./navRoute";

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col md:flex-row gap-8 justify-start lg:ml-10">
      {NavRoutes.map((item) => {
        const isActive = pathname === item.href;

        return (
          <NavbarItem key={item.href}>
            <Link
              className={`${
                isActive
                  ? "text-pink-400 font-medium text-[14px]"
                  : "text-default-800 text-[14px]"
              }`}
              href={item.href}
            >
              {item.label}
            </Link>
          </NavbarItem>
        );
      })}
    </ul>
  );
}
