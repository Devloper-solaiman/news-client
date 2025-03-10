"use client";

import type { EmojiClickData } from "emoji-picker-react";

import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { PaperclipIcon, SendIcon, SmileIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { Theme as EmojiPickerTheme } from "emoji-picker-react";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

interface MessageBarProps {
  onSendMessage: (
    message: string,
    event: KeyboardEvent<HTMLInputElement> | undefined,
  ) => void;
  typingHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function MessageBar({
  onSendMessage,
  typingHandler,
}: MessageBarProps) {
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState<boolean>(false);
  const { theme } = useTheme();

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setInputMessage((prev) => prev + emojiData.emoji);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
    typingHandler(e);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSendMessage(inputMessage, e);
      setInputMessage("");
    }
  };

  const handleSendClick = () => {
    onSendMessage(inputMessage, undefined);
    setInputMessage("");
  };

  return (
    <div className="pt-5 bg-background border-t border-default-100">
      <div className="flex items-center gap-2">
        <Button isIconOnly aria-label="Attach document" radius="full" size="sm">
          <PaperclipIcon className="h-5 w-5 text-pink-500" />
        </Button>
        <Popover
          isOpen={isEmojiPickerOpen}
          placement="right"
          onOpenChange={setIsEmojiPickerOpen}
        >
          <PopoverTrigger>
            <Button
              isIconOnly
              aria-label="Select emoji"
              radius="full"
              size="sm"
            >
              <SmileIcon className="h-5 w-5 text-pink-500" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="mb-28">
            <EmojiPicker
              theme={(theme === "dark" ? "dark" : "light") as EmojiPickerTheme}
              onEmojiClick={handleEmojiClick}
            />
          </PopoverContent>
        </Popover>
        <Input
          className="flex-grow text-xs"
          placeholder="Type a message..."
          radius="full"
          size="sm"
          value={inputMessage}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <Button
          aria-label="Send message"
          radius="md"
          size="sm"
          onClick={handleSendClick}
        >
          <SendIcon className="h-5 w-5 text-pink-500" />
        </Button>
      </div>
    </div>
  );
}
