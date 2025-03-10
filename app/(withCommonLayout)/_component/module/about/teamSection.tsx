import { Avatar } from "@nextui-org/avatar";
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    instagram: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: "Md Rijwan Jannat",
    role: "Founder",
    imageUrl: "https://i.ibb.co.com/fVg8DVg/sketch1699926435270.png",
    socialLinks: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
    },
  },
  {
    name: "Abu Talha",
    role: "Co-Founder",
    imageUrl: "https://i.ibb.co/kmqWZ9x/IMG-0044.jpg",
    socialLinks: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
    },
  },
  {
    name: "Debra Cavender",
    role: "Web Developer",
    imageUrl: "https://picsum.photos/200/200?random=3",
    socialLinks: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
    },
  },
  {
    name: "Vicky O. Harrell",
    role: "UI Designer",
    imageUrl: "https://picsum.photos/200/200?random=4",
    socialLinks: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
    },
  },
];

const TeamSection: React.FC = () => {
  return (
    <section className="py-16 bg-default-50 text-center">
      <h3 className="text-pink-600 font-semibold uppercase mb-4 text-xs md:text-sm">
        Team Members
      </h3>
      <h2 className="text-xl md:text-2xl font-bold mb-8">Meet the Crew</h2>

      <div className="flex flex-wrap justify-center gap-8">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.name}
            className="max-w-xs bg-default-50 shadow-lg rounded-lg p-6 flex flex-col items-center space-y-4 transform hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 30 }}
            transition={{
              delay: index * 0.1,
              duration: 0.5,
              type: "spring",
              stiffness: 100,
            }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <motion.div
              className="w-32 h-32 rounded-full overflow-hidden bg-default-100"
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.1 }}
            >
              <Avatar
                alt={member.name}
                className="w-full h-full object-cover"
                size="sm"
                src={member.imageUrl}
              />
            </motion.div>
            <div className="text-center">
              <h4 className="text-xl font-semibold">{member.name}</h4>
              <p className="text-default-500">{member.role}</p>
            </div>
            <div className="flex space-x-4">
              <motion.a
                aria-label="Facebook"
                className="text-pink-500"
                href={member.socialLinks.facebook}
                transition={{ type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.2, color: "#E1306C" }}
              >
                <FaFacebook size={20} />
              </motion.a>
              <motion.a
                aria-label="Twitter"
                className="text-pink-500"
                href={member.socialLinks.twitter}
                transition={{ type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.2, color: "#E1306C" }}
              >
                <FaTwitter size={20} />
              </motion.a>
              <motion.a
                aria-label="Instagram"
                className="text-pink-500"
                href={member.socialLinks.instagram}
                transition={{ type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.2, color: "#E1306C" }}
              >
                <FaInstagram size={20} />
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
