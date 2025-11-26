import React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  ExternalLink,
  Code,
  Database,
  Terminal,
  Cpu,
  Trophy,
} from "lucide-react";

const About: React.FC = () => {
  const skills = [
    { category: "Languages", items: ["JavaScript (ES6+)", "TypeScript", "Java", "Python", "C++"], icon: Code },
    { category: "Frontend", items: ["React.js", "Next.js", "Tailwind CSS", "Framer Motion", "Redux"], icon: Terminal },
    { category: "Backend", items: ["Node.js", "Express.js", "PostgreSQL", "MongoDB", "Appwrite"], icon: Database },
    { category: "Tools", items: ["Git", "Docker", "AWS", "Vercel", "Postman"], icon: Cpu },
  ];

  const achievements = [
    {
      title: "JavaGenex Winner",
      description: "Winner of JavaGenex exhibition at TSEC for Java FullStack Desktop Application",
      icon: Trophy
    },
    {
      title: "Minithon 2.0 Winner",
      description: "Created sustainable urban farming platform with AI voice assistant",
      icon: Trophy
    },
    {
      title: "Hackwarts Winner",
      description: "Developed Apna Rakshak smart security system with AI criminal detection",
      icon: Trophy
    },
    {
      title: "SPIT Minithon Top 3",
      description: "Top 3 position in collaboration with IIIT Bhubaneswar",
      icon: Trophy
    },
  ];

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-8 py-12 sm:py-20 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8">
            About <span className="text-gradient">Me</span>
          </h1>
          <div className="prose prose-invert max-w-none text-zinc-400 text-lg leading-relaxed space-y-6">
            <p>
              I’m <span className="text-white font-medium">Darshan Soni</span>, a Full-Stack Developer passionate about building modern, responsive, and scalable web applications using the MERN stack.
            </p>
            <p>
              I’m pursuing a B.Tech in Information Technology from Thadomal Shahani Engineering College (2022–2026) and currently working as a Full Stack Developer Intern at Winnovate Next Pvt. Ltd.
            </p>
            <p>
              With experience in React, Node.js, Express, and MongoDB, I’ve developed end-to-end projects, led the IETE-TSEC tech team, solved 350+ LeetCode problems, and won multiple hackathons for innovative solutions.
            </p>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <Code className="text-emerald-400" /> Technical Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <div key={index} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-emerald-500/30 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                    <skill.icon size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{skill.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, i) => (
                    <span key={i} className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-300 border border-zinc-700">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <Trophy className="text-emerald-400" /> Achievements
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:bg-zinc-900 transition-colors">
                <h3 className="text-lg font-semibold text-white mb-2">{achievement.title}</h3>
                <p className="text-zinc-400 text-sm">{achievement.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Resume Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <a
            href="/Darshan Soni.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-emerald-500/25"
          >
            <FileText size={20} />
            Download Resume
            <ExternalLink size={16} />
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
