"use client";

import React, { FC, useState } from "react";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { toast } from "sonner";

const SubscriptionSection: FC = () => {
  // State to manage the email input
  const [email, setEmail] = useState("");

  const { ref: leftRef, inView: leftInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: rightRef, inView: rightInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Handle subscription
  const handleSubscribe = () => {
    // Simple email validation
    if (!email) {
      toast.error("Please enter your email address");

      return;
    }

    // Show success toast
    toast.success("Subscribed successfully!");

    // Clear the input field
    setEmail("");
  };

  return (
    <motion.section className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 my-10 bg-gradient-to-b from-default-50/80 to-default-100/30 border border-default-100 rounded-lg p-3 md:p-8 lg:16">
      {/* Left Side - Text and Subscription Form */}
      <motion.div
        ref={leftRef}
        animate={leftInView ? { opacity: 1, x: 0 } : {}}
        className="text-center lg:text-left w-full lg:w-1/2 space-y-4"
        initial={{ opacity: 0, x: -150 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h2 className="text-3xl lg:text-4xl font-bold text-default-800">
          Discover <span className="text-pink-500">Hidden Gems</span> <br />
          Around the World
        </h2>
        <p className="text-default-800 text-sm lg:text-base">
          Stay updated with the latest travel tips, destination guides, and
          insider recommendations to make your next adventure unforgettable.
          Join our community of travelers today!
        </p>

        {/* Subscription Form */}
        <div className="flex items-center w-full">
          <input
            required
            className="p-3 rounded-l-full focus:outline-none bg-white text-gray-700 placeholder:text-gray-700 w-full border border-default-300 h-[41px] text-sm"
            placeholder="Enter Your Email Address.."
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
          />
          <Button
            className="bg-default-50/20 border border-l-default-50 border-pink-500 text-pink-500 font-semibold px-4 md:px-6 py-2.5 rounded-r-full transition duration-300 ease-in-out hover:bg-pink-500 hover:text-white"
            onClick={handleSubscribe} // Handle subscription on click
          >
            Subscribe
          </Button>
        </div>
      </motion.div>

      {/* Right Side - iPhone Mockup Image */}
      <motion.div
        ref={rightRef}
        animate={leftInView ? { opacity: 1, x: 0 } : {}}
        className="relative w-full lg:w-1/2 flex justify-center lg:justify-end"
        initial={{ opacity: 0, x: 150 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="relative w-[200px] md:w-[300px]">
          <Image
            alt="iPhone Mockup"
            className="object-cover"
            height={600}
            src="https://demo.xperthemes.com/sociohub/wp-content/uploads/sites/10/2024/07/social-media-iphone-v-1.png"
            width={300}
          />
        </div>
      </motion.div>
    </motion.section>
  );
};

export default SubscriptionSection;
