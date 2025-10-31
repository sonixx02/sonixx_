import React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  ExternalLink,
  Award,
  Code,
  Database,
  Wrench,
} from "lucide-react";

const About: React.FC = () => {
  const skills = {
    programming: ["C", "Java", "JavaScript"],
    web: [
      "HTML",
      "CSS",
      "JavaScript",
      "Node.js",
      "Express.js",
      "React.js",
      "Tailwind CSS",
    ],
    databases: ["MySQL", "MongoDB"],
    tools: ["Git", "GitHub"],
  };

  const achievements = [
    {
      title: "JavaGenex Winner",
      description:
        "Winner of JavaGenex exhibition at TSEC for Java FullStack Desktop Application",
    },
    {
      title: "Minithon 2.0 Winner",
      description:
        "Created sustainable urban farming platform with AI voice assistant",
    },
    {
      title: "Hackwarts Winner",
      description:
        "Developed Apna Rakshak smart security system with AI criminal detection",
    },
    {
      title: "SPIT Minithon Top 3",
      description: "Top 3 position in collaboration with IIIT Bhubaneswar",
    },
  ];

  return (
    <motion.div
      className="min-h-screen px-8 py-16"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: "spring", stiffness: 60 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl font-light mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, type: "spring" }}
        >
          <span className="text-emerald-400">About</span> Me
        </motion.h1>
        <motion.div
          className="space-y-8 text-lg text-gray-300 leading-relaxed mb-16"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
           I’m Darshan Soni, a Full-Stack Developer passionate about building modern, responsive, and scalable web applications using the MERN stack.

I’m pursuing a B.Tech in Information Technology from Thadomal Shahani Engineering College (2022–2026) and currently working as a Full Stack Developer Intern at Winnovate Next Pvt. Ltd.

With experience in React, Node.js, Express, and MongoDB, I’ve developed end-to-end projects, led the IETE-TSEC tech team, solved 350+ LeetCode problems, and won multiple hackathons for innovative solutions.

I’m driven by curiosity, clean code, and the desire to build products that truly make an impact.
          </motion.p>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            Outside of
            development, I enjoy playing chess and football, and I am always
            looking for new challenges to grow  technically .
          </motion.p>

          <div className="border-t border-gray-700 my-12"></div>
        </motion.div>

        <div className="mt-16">
          <a
            href="\Darshan Soni.pdf"
            className="inline-flex items-center space-x-3 bg-emerald-600 hover:bg-emerald-700 px-8 py-4 rounded-lg transition-colors duration-300 text-white"
          >
            <FileText size={20} />
            <span className="text-lg">Download Resume</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
