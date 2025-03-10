"use client";

import React from "react";
import { motion } from "framer-motion";
import { Divider } from "@nextui-org/divider";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import CountUp from "react-countup";
import Link from "next/link";

import BrandLogo from "@/src/components/shared/logo";
import Container from "@/src/components/shared/container";

const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-default-50/80 to-default-100/20 py-12 text-default-800 md:mx-2 mt-5 border-t border-default-100">
      <Container>
        {/* Top Section */}
        <div className="flex flex-wrap justify-between items-start mb-8 space-y-8 md:space-y-0">
          {/* Logo Section */}
          <motion.div
            animate={{ opacity: 1 }}
            className="w-full md:w-1/3 flex flex-col items-start"
            initial={{ opacity: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link className="flex items-center gap-2" href="/">
              <BrandLogo />
              <p className="font-bold text-pink-600 text-xl">TT&DG</p>
            </Link>
            <p className="mt-4 text-sm">
              Exploring the World, one adventure at a time. Connecting travelers
              everywhere and your journey starts here.
            </p>
            {/* Satisfied Travelers */}
            <motion.div
              animate={{ opacity: 1 }}
              className="w-full md:w-1/3 flex flex-col items-start text-start"
              initial={{ opacity: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-sm font-semibold text-default-900 mb-2 mt-5 whitespace-nowrap">
                Satisfied Travelers
              </h3>
              <div className="text-4xl font-bold text-pink-500">
                <CountUp duration={2.5} end={5879} separator="," />
              </div>
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            animate={{ opacity: 1 }}
            className="w-full md:w-1/3"
            initial={{ opacity: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-lg font-semibold text-pink-600 mb-4 mt-1">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-4 text-sm text-default-600">
              <li>
                <Link className="hover:text-pink-600" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="hover:text-pink-600" href="/about">
                  About Us
                </Link>
              </li>
              <li>
                <Link className="hover:text-pink-600" href="/features">
                  Features
                </Link>
              </li>
              <li>
                <Link className="hover:text-pink-600" href="/privacy-policy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="hover:text-pink-600" href="/terms-of-service">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Stay Connected Section */}
          <motion.div
            animate={{ opacity: 1 }}
            className="w-full md:w-1/3"
            initial={{ opacity: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-lg font-semibold text-pink-600 mb-4 mt-1">
              Stay Connected
            </h3>
            <div className="flex space-x-4 mb-4">
              <Link className="text-pink-500 hover:text-pink-600" href="#">
                <FaFacebookF size={24} />
              </Link>
              <Link className="text-pink-500 hover:text-pink-600" href="#">
                <FaTwitter size={24} />
              </Link>
              <Link className="text-pink-500 hover:text-pink-600" href="#">
                <FaInstagram size={24} />
              </Link>
              <Link className="text-pink-500 hover:text-pink-600" href="#">
                <FaLinkedinIn size={24} />
              </Link>
            </div>
            <div className="text-sm text-default-700 space-y-2">
              <p className="flex items-center gap-1">
                <p>Email:</p>{" "}
                <a
                  className="text-pink-500 hover:text-pink-600"
                  href="mailto:info@fitnessgear.com"
                >
                  info@fitnessgear.com
                </a>
              </p>
              <p className="flex items-center gap-1">
                <p>Phone:</p>{" "}
                <a
                  className="text-pink-500 hover:text-pink-600"
                  href="tel:+1234567890"
                >
                  +1 234 567 890
                </a>
              </p>
              <p className="flex items-center gap-1">
                Address: 123 Fitness Lane, Wellness City, Fitland 45678
              </p>
            </div>
          </motion.div>
        </div>

        <Divider className="my-8" />

        {/* Bottom Section */}
        <div className="flex justify-center items-center">
          {/* Footer Copyright */}
          <p className="text-sm text-default-500 text-center">
            © {date} TT&DG. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
