"use client";

import React, { useState } from "react";
import { Input, Textarea } from "@nextui-org/input";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@nextui-org/button";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setName("");
      setEmail("");
      setMessage("");
    }, 2000);

    toast.success("Message sent successfully");
  };

  return (
    <div className="max-w-7xl w-full pt-8">
      {/* Header Section */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10 h-[60vh] mx-auto w-full flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-extrabold text-custom-header mb-4 text-default-700">
          Contact Us
        </h1>
        <p className="text-default-700 flex items-center justify-center my-2 text-sm font-light">
          <Link href={"/"}>Home</Link> &gt; Contact Us
        </p>
        <Image
          alt="doc image"
          className="w-[250px]"
          height={500}
          src={
            "https://uigaint.com/demo/html/staco_i/assets/images/services/skills-img.svg"
          }
          width={500}
        />
      </motion.div>

      {/* Form Section */}
      <div className="flex items-center justify-between gap-5 flex-col md:flex-row border border-default-100 p-5 bg-default-50/20 backdrop-blur-2xl rounded-md w-full">
        <Image
          alt="contact"
          className="w-full md:w-[350px]"
          height={500}
          src={
            "https://res.cloudinary.com/dihqveqyc/image/upload/v1735501607/gfqwg36s69s1bv99k4tg.svg"
          }
          width={500}
        />

        <form
          className="rounded-lg w-full md:w-[500px] space-y-7"
          onSubmit={handleSubmit}
        >
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-pink-600 tracking-wider text-sm md:text-lg my-3">
              Travel Platform
            </h2>
            <h1 className="text-2xl md:text-3xl font-bold">
              Do not hesitate to ask <br /> a question
            </h1>
          </motion.div>

          {/* Name Field */}
          <Input
            fullWidth
            required
            label="Your Name"
            placeholder="Enter your name"
            radius="full"
            value={name}
            variant="bordered"
            onChange={(e) => setName(e.target.value)}
          />

          {/* Email Field */}
          <Input
            fullWidth
            required
            label="Your Email"
            placeholder="Enter your email"
            radius="full"
            type="email"
            value={email}
            variant="bordered"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Message Field */}
          <Textarea
            fullWidth
            required
            label="Your Message"
            placeholder="Write your message here..."
            radius="full"
            value={message}
            variant="bordered"
            onChange={(e) => setMessage(e.target.value)}
          />

          {/* Submit Button */}

          <div className="flex items-center justify-center">
            <Button
              className="primary-button"
              disabled={isSubmitting}
              isLoading={isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>

      {/* Contact Information Section */}
      <div className="mt-10 p-5 bg-default-50/50 rounded-md border border-default-100 backdrop-blur-2xl">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 1.2 }}
        >
          <h2 className="text-2xl font-bold text-primaryColor">Get in Touch</h2>
          <p className="text-default-700 mt-2">
            We’d love to hear from you! Reach us via:
          </p>
          <div className="flex flex-col md:flex-row gap-4 items-center mt-4 justify-center">
            <p className="bg-default-50 rounded-md px-3 py-1 border border-default-100 text-xs">
              <strong>Phone:</strong> +123 456 7890
            </p>
            <p className="bg-default-50 rounded-md px-3 py-1 border border-default-100 text-xs">
              <strong>Email:</strong> contact@example.com
            </p>
            <p className="bg-default-50 rounded-md px-3 py-1 border border-default-100 text-xs">
              <strong>WhatsApp:</strong> +123 456 7890
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
