"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon, LaptopIcon } from "lucide-react";

const ThemeDropdown = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (selectedTheme: string) => {
    setTheme(selectedTheme);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          isIconOnly
          className="border-none"
          radius="full"
          startContent={
            theme === "dark" ? <MoonIcon size={18} /> : <SunIcon size={18} />
          }
          variant="bordered"
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Theme selection"
        onAction={(key) => handleThemeChange(key as string)}
      >
        <DropdownItem
          key="light"
          className="rounded"
          startContent={<SunIcon size={15} />}
        >
          Light Mode
        </DropdownItem>
        <DropdownItem
          key="dark"
          className="rounded"
          startContent={<MoonIcon size={15} />}
        >
          Dark Mode
        </DropdownItem>
        <DropdownItem
          key="system"
          className="rounded"
          startContent={<LaptopIcon size={15} />}
        >
          System
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ThemeDropdown;
