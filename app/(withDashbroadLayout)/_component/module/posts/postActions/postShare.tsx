"use client";

import React from "react";
import { motion } from "framer-motion";
import { RiShareForwardLine } from "react-icons/ri";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "react-share";

interface ShareButtonProps {
  url: string;
  title: string;
}

const PostShare: React.FC<ShareButtonProps> = ({ url, title }) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <motion.button
          className="flex items-center text-xs md:text-sm text-default-600 hover:text-blue-500 gap-1 rounded py-1 focus:outline-none border-none"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <RiShareForwardLine size={18} />
          Share
        </motion.button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Share options">
        <DropdownItem key="facebook">
          <FacebookShareButton title={`${title ? title : ""}`} url={url}>
            <div className="flex items-center gap-2">
              <FacebookIcon round size={32} />
              <span>Facebook</span>
            </div>
          </FacebookShareButton>
        </DropdownItem>
        <DropdownItem key="twitter">
          <TwitterShareButton title={title} url={url}>
            <div className="flex items-center gap-2">
              <TwitterIcon round size={32} />
              <span>Twitter</span>
            </div>
          </TwitterShareButton>
        </DropdownItem>
        <DropdownItem key="linkedin">
          <LinkedinShareButton title={title} url={url}>
            <div className="flex items-center gap-2">
              <LinkedinIcon round size={32} />
              <span>LinkedIn</span>
            </div>
          </LinkedinShareButton>
        </DropdownItem>
        <DropdownItem key="whatsapp">
          <WhatsappShareButton title={title} url={url}>
            <div className="flex items-center gap-2">
              <WhatsappIcon round size={32} />
              <span>WhatsApp</span>
            </div>
          </WhatsappShareButton>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default PostShare;
