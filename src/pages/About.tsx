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
  Github,
  Linkedin,
  Mail,
  MapPin,
  User
} from "lucide-react";

const About: React.FC = () => {
  const skills = {
    languages: ["JavaScript", "TypeScript", "Java", "Python", "C++"],
    frontend: ["React.js", "Next.js", "Tailwind CSS", "Framer Motion"],
    backend: ["Node.js", "Express.js", "PostgreSQL", "MongoDB"],
    tools: ["Git", "Docker", "AWS", "Vercel"]
  };

  const achievements = [
    { title: "JavaGenex Winner", desc: "TSEC Java FullStack App" },
    { title: "Minithon 2.0 Winner", desc: "Sustainable Urban Farming AI" },
    { title: "Hackwarts Winner", desc: "Apna Rakshak Security System" },
    { title: "SPIT Minithon Top 3", desc: "Collab with IIIT Bhubaneswar" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-8 py-20 sm:py-24 max-w-7xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]"
      >
        {/* 1. Intro Card (Large) */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-2 lg:col-span-2 row-span-2 bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 flex flex-col justify-between hover:border-red-500/30 transition-colors group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <User size={120} />
          </div>
          <div>
            <h2 className="text-zinc-400 font-medium mb-2">About Me</h2>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
              I'm <span className="text-red-500">Darshan Soni</span>, a Full-Stack Developer crafting scalable web apps.
            </h1>
            <p className="text-zinc-400 leading-relaxed">
              Currently a B.Tech IT student at TSEC (2022–2026) and Intern at Winnovate Next. I've solved 350+ LeetCode problems and love building pixel-perfect interfaces.
            </p>
          </div>
          <div className="flex gap-4 mt-6">
            <a href="https://github.com/sonixx02" target="_blank" rel="noreferrer" className="p-2 bg-zinc-800 rounded-full hover:bg-red-600 hover:text-white transition-all">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/darshan-soni" target="_blank" rel="noreferrer" className="p-2 bg-zinc-800 rounded-full hover:bg-blue-600 hover:text-white transition-all">
              <Linkedin size={20} />
            </a>
            <a href="mailto:darshan@example.com" className="p-2 bg-zinc-800 rounded-full hover:bg-green-600 hover:text-white transition-all">
              <Mail size={20} />
            </a>
          </div>
        </motion.div>

        {/* 2. Resume Card */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-1 bg-gradient-to-br from-red-600 to-orange-600 rounded-3xl p-6 flex flex-col justify-between text-white hover:scale-[1.02] transition-transform cursor-pointer"
          onClick={() => window.open("/Darshan Soni.pdf", "_blank")}
        >
          <div className="flex justify-between items-start">
            <FileText size={32} />
            <ExternalLink size={20} className="opacity-70" />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-1">Resume</h3>
            <p className="text-red-100 text-sm">View my professional journey</p>
          </div>
        </motion.div>

        {/* 3. Location/Info Card */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-1 bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-center items-center text-center hover:border-orange-500/30 transition-colors"
        >
          <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mb-4 text-orange-500">
            <MapPin size={24} />
          </div>
          <h3 className="text-white font-semibold">Mumbai, India</h3>
          <p className="text-zinc-500 text-sm">Open to remote work</p>
        </motion.div>

        {/* 4. Skills - Languages */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-1 bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 hover:border-red-500/30 transition-colors"
        >
          <div className="flex items-center gap-2 mb-4 text-red-400">
            <Code size={20} />
            <h3 className="font-semibold text-white">Languages</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.languages.map((skill) => (
              <span key={skill} className="text-xs px-2 py-1 bg-zinc-800 rounded-md text-zinc-300">{skill}</span>
            ))}
          </div>
        </motion.div>

        {/* 5. Skills - Frontend */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-1 bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 hover:border-orange-500/30 transition-colors"
        >
          <div className="flex items-center gap-2 mb-4 text-orange-400">
            <Terminal size={20} />
            <h3 className="font-semibold text-white">Frontend</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.frontend.map((skill) => (
              <span key={skill} className="text-xs px-2 py-1 bg-zinc-800 rounded-md text-zinc-300">{skill}</span>
            ))}
          </div>
        </motion.div>

        {/* 6. Achievements (Wide) */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-2 bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 hover:border-red-500/30 transition-colors"
        >
          <div className="flex items-center gap-2 mb-6 text-yellow-500">
            <Trophy size={24} />
            <h3 className="text-xl font-bold text-white">Achievements</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievements.map((ach, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                <div>
                  <h4 className="text-white font-medium text-sm">{ach.title}</h4>
                  <p className="text-zinc-500 text-xs">{ach.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 7. Skills - Backend & Tools */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-2 lg:col-span-2 bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 hover:border-orange-500/30 transition-colors flex flex-col sm:flex-row gap-8"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4 text-purple-400">
              <Database size={20} />
              <h3 className="font-semibold text-white">Backend</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.backend.map((skill) => (
                <span key={skill} className="text-xs px-2 py-1 bg-zinc-800 rounded-md text-zinc-300">{skill}</span>
              ))}
            </div>
          </div>
          <div className="w-px bg-zinc-800 hidden sm:block" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4 text-blue-400">
              <Cpu size={20} />
              <h3 className="font-semibold text-white">Tools</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.tools.map((skill) => (
                <span key={skill} className="text-xs px-2 py-1 bg-zinc-800 rounded-md text-zinc-300">{skill}</span>
              ))}
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default About;
