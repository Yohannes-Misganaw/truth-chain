"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Github,
  CircuitBoard,
  Network,
  Shield,
  Cpu,
  ArrowUpRight,
} from "lucide-react";
import { TbBrandGithub } from "react-icons/tb";
import { FooterLarge } from "@/components/Footer";

const teamMembers = [
  {
    name: "Yohannes Misganaw",
    role: "Project Developer & Designer",
    github: "yohannes-misganaw",
    photo: "https://avatars.githubusercontent.com/u/99452117?v=4",
  },
  {
    name: "Hidaya Ayoub",
    role: "Project Designer",
    github: "hiduayoub",
    photo: "",
  },
  {
    name: "Ab",
    role: "Project Designer",
    github: "myCoder452",
    photo: "",
  },
  {
    name: "Leyutsega Abebaw",
    role: "Pitch Designer",
    github: "",
    photo: "",
  },
];

const DecorativeIcon = () => {
  const icons = [
    <CircuitBoard key="circuit" />,
    <Network key="network" />,
    <Cpu key="cpu" />,
    <Shield key="shield" />,
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="relative w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />

        <div className="grid grid-cols-8 grid-rows-4 gap-8 opacity-50 text-purple-500">
          {Array.from({ length: 25 }).map((_, i) => {
            const IconComponent = icons[i % 4];
            const size = 20 + Math.random() * 50;
            const rotation = Math.random() * 360;

            return (
              <div
                key={i}
                className="relative"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  width: `${size}px`,
                  height: `${size}px`,
                }}
              >
                {IconComponent}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default function About() {
  return (
    <div>
      <div className="relative min-h-screen w-full bg-gradient-to-t from-purple-900/30 via-black to-black">
        <div className="container mx-auto px-4 py-24 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20 text-center"
          >
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gradient bg-gradient-to-b from-gray-300 via-gray-500 to-gray-500 bg-clip-text text-xl font-bold !leading-tight text-transparent md:text-3xl lg:text-4xl"
            >
              Behind Truth Chain
            </motion.h2>
          </motion.div>

          {/* Team Members Grid */}
          <div className="space-y-16">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${index % 2 === 0 ? "" : "md:grid-flow-col-dense"}`}
              >
                {/* Member Card */}
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className={`group relative overflow-hidden border bg-black/30 backdrop-blur-sm ${index % 2 === 0 ? "" : "md:col-start-2"}`}
                  style={{
                    borderImage:
                      "repeating-linear-gradient(-45deg, #1e2939 0, #1e2939 4px, transparent 4px, transparent 8px) 1.5",
                  }}
                >
                  <div className="flex items-center gap-6">
                    <div className="border border-gray-800 w-36 h-36 md:w-52 md:h-52 relative">
                      {member.photo || member.github ? (
                        <Image
                          src={
                            member.photo ||
                            `https://avatars.githubusercontent.com/${member.github}`
                          }
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center text-purple-400 text-2xl font-bold">
                          {member.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-200 mb-2">
                        {member.name}
                      </h3>
                      <p className="text-sm font-medium text-gray-400 mb-6">
                        {member.role}
                      </p>

                      {member.github && (
                        <div className="flex items-center space-x-4 pl-3 border-l-2 border-gray-800">
                          <TbBrandGithub className="w-8 h-8 text-gray-300" />
                          <div className="space-y-1">
                            <a
                              href={`https://github.com/${member.github}`}
                              target="_blank"
                              className="flex items-center text-purple-400 hover:text-purple-300 text-sm p-2 bg-purple-900/50"
                            >
                              @{member.github}
                              <ArrowUpRight className="w-4 h-4 ml-2" />
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="absolute inset-0 -left-full h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-1000 group-hover:left-full" />
                </motion.div>

                {/* Decorative Icon */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className={`hidden relative md:flex ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}
                >
                  <DecorativeIcon />
                </motion.div>
              </div>
            ))}
          </div>

          {/* Competition Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-20 border bg-black/30 p-8 backdrop-blur-sm"
            style={{
              borderImage:
                "repeating-linear-gradient(-45deg, #364153 0, #364153 4px, transparent 4px, transparent 8px) 1.5",
            }}
          >
            <h3 className="text-xl font-semibold text-gray-200 mb-4">
              African Blockchain Championship 2025
            </h3>
            <p className="text-sm font-medium text-gray-400">
              Developed exclusively for the African blockchain Championship
              competition
            </p>
          </motion.div>
        </div>
      </div>
      <FooterLarge />
    </div>
  );
}
