"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

import SectionTitle from "../../../ui/sectionTitle";

const GoOnSection: React.FC = () => {
  // Set up intersection observer for both sides
  const { ref: leftRef, inView: leftInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { ref: rightRef, inView: rightInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <>
      <SectionTitle text="Go On" />
      <motion.section className="flex flex-col lg:flex-row items-center justify-between bg-gradient-to-b from-default-50/80 to-default-100/30 border border-default-100 rounded-lg p-8 lg:p-12 space-y-8 lg:space-y-0 mt-10">
        {/* Left Side - Large Image with Badge */}
        <motion.div
          ref={leftRef}
          animate={leftInView ? { opacity: 1, x: 0 } : {}}
          className="relative w-full lg:w-1/2 flex justify-center lg:justify-start"
          initial={{ opacity: 0, x: -150 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Large Image */}
          <div className="relative w-[300px] lg:w-[400px] overflow-hidden rounded-lg border-[5px]">
            <Image
              alt="Social Media Platform"
              className="object-cover h-[450px]"
              height={1200}
              src="https://media.licdn.com/dms/image/v2/D5612AQFsCjDdt3V4vQ/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1655822977116?e=2147483647&v=beta&t=8ZrReW-93gACSNdD34ky-PI0pJOUuOesdNP5hMV9FD8"
              width={1200}
            />
          </div>
          {/* Experience Badge */}
          <motion.div
            className="absolute top-6 right-6 bg-white px-6 py-6 rounded-full shadow-lg flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {leftInView && ( // Conditionally render CountUp when in view
              <CountUp
                className="text-xl font-bold text-pink-500"
                duration={2.5}
                end={12}
                prefix="+"
                separator=","
              />
            )}
            <span className="text-gray-600 text-xs">YEAR EXPERIENCE</span>
          </motion.div>
          {/* Circular Image Overlay */}
          <div className="absolute bottom-20 right-10 size-32 lg:size-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <Image
              alt="Happy Traveler"
              className="object-cover size-32 lg:size-48"
              height={1000}
              src="https://img.freepik.com/free-photo/photo-stunned-young-bearded-man-indicates-right-side-demonstrates-something-amazing-gasps-with-wonder-wears-spectacles-casual-jumper-poses-against-pink-wall-promotion-concept_273609-42822.jpg?t=st=1735496297~exp=1735499897~hmac=c75c8f64fd561b41aa0ae92501046ae5d3b6cd84314148c97a839d8cc3d63c47&w=996"
              width={1000}
            />
          </div>
        </motion.div>

        {/* Right Side - Content */}
        <motion.div
          ref={rightRef}
          animate={rightInView ? { opacity: 1, x: 0 } : {}}
          className="w-full lg:w-1/2 text-center lg:text-left space-y-6"
          initial={{ opacity: 0, x: 150 }} // Starts from right
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Heading */}
          <h2 className="text-3xl lg:text-4xl font-bold text-default-800">
            Sharing <span className="text-pink-500">Travel Tips</span> and{" "}
            <br />
            Destination Guides!
          </h2>
          {/* Description */}
          <p className="text-default-800 text-sm lg:text-base">
            Discover incredible destinations, insider travel tips, and advice
            from experienced explorers. Join our community to plan unforgettable
            journeys and connect with fellow travelers.
          </p>

          {/* Feature List */}
          <div className="flex flex-col md:flex-row md:gap-5 border-y border-default-200 py-3">
            <div className="space-y-2 text-default-800 text-sm lg:text-base">
              <p className="flex items-center text-xs">
                <span className="text-pink-500 mr-2">✔</span> Expert travel
                tips and guides.
              </p>
              <p className="flex items-center text-xs">
                <span className="text-pink-500 mr-2">✔</span> Inspiration for
                unique destinations.
              </p>
            </div>
            <div className="space-y-2 text-default-800 text-sm lg:text-base">
              <p className="flex items-center text-xs">
                <span className="text-pink-500 mr-2">✔</span> Community-driven
                recommendations.
              </p>
              <p className="flex items-center text-xs">
                <span className="text-pink-500 mr-2">✔</span> Tips for
                budget-friendly travel.
              </p>
            </div>
          </div>

          {/* Profile and Button */}
          <div className="flex items-center justify-center lg:justify-start space-x-4">
            {/* Profile */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                  alt="Maggie Wilson"
                  className="object-cover"
                  height={40}
                  src="https://demo.xperthemes.com/sociohub/wp-content/uploads/sites/10/2024/07/cheerful-man-and-woman-with-laptops-pointing.jpg"
                  width={40}
                />
              </div>
              <div className="text-default-800 text-sm">
                <span className="block font-semibold">Maggie Wilson</span>
                <span>CEO, HEAD DIRECTOR</span>
              </div>
            </div>
            {/* Button */}
            <Button as={Link} className="secondary-button" href="/about">
              More About Us
            </Button>
          </div>
        </motion.div>
      </motion.section>
    </>
  );
};

export default GoOnSection;
