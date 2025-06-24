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
            I’m Darshan Soni, a Full-Stack Developer with a strong focus on
            building modern, responsive, and scalable web applications using the
            MERN stack (MongoDB, Express, React, Node.js). I am currently
            pursuing my Bachelor’s degree in Information Technology from
            Thadomal Shahani Engineering College. I enjoy developing efficient
            solutions to real-world problems, working on interactive user
            interfaces, and continuously learning new technologies. My technical
            experience includes: Building frontend applications with React,
            Vite, Tailwind CSS, Shadcn/UI, and GSAP for smooth user experiences
            Developing secure and scalable backend services with Node.js,
            Express, and MongoDB Solving over 150+ Data Structures and
            Algorithms problems to strengthen my problem-solving skills
            Participating in multiple hackathons and competitions, with
            achievements including winning the Java Genix competition
          </motion.p>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            Outside of
            development, I enjoy playing chess and football, and I am always
            looking for new challenges to grow both technically and personally.
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
