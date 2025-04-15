"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Starfield from "./ui/Starfield";

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      <Starfield
        starCount={1000}
        starColor={[255, 255, 255]}
        speedFactor={0.01}
        backgroundColor="black"
      />
      <div className="relative h-full w-full bg-gradient-to-t from-purple-900/30 via-black to-black">
        <div className="container relative mx-auto flex h-full flex-col items-center justify-center lg:justify-start lg:py-40 px-4 font-ibm-plex-mono">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center"
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gradient bg-gradient-to-b from-gray-300 via-gray-500 to-gray-500 bg-clip-text text-3xl font-bold !leading-tight text-transparent md:text-5xl lg:text-6xl"
            >
              Preserving Truth in
              <br />
              the Digital Age
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mx-auto mt-6 max-w-2xl text-balance text-sm font-medium text-gray-400"
            >
              A decentralized network for immutable fact verification and
              historical media preservation. Powered by blockchain technology
              and community governance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-8 flex justify-center space-x-4"
            >
              <button className="group relative overflow-hidden border border-gray-400 text-xs items-center px-6 py-3 rounded transition-all duration-300">
                <div className="absolute inset-0 left-0 h-full w-0 bg-purple-700 transition-all duration-300 group-hover:w-full rounded" />

                <span className="relative z-10 mix-blend-exclusion">
                  Explore The Archive
                </span>
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute bottom-0 z-0 w-full max-w-6xl"
          >
            <div className="relative aspect-[2.4/1] w-full">
              <Image
                src="/globe.png"
                alt="Decentralized network globe visualization"
                fill
                className="object-contain object-bottom"
                quality={100}
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
