"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Star } from "lucide-react";
import { useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { TbBrandGithub, TbCircleCheck } from "react-icons/tb";

const useCountUp = (end: number, duration: number) => {
  const count = useRef(0);
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    const increment = end / (duration * 60);
    const updateCount = () => {
      if (count.current < end) {
        count.current = Math.min(end, count.current + increment);
        setDisplayCount(Math.floor(count.current));
        requestAnimationFrame(updateCount);
      }
    };
    updateCount();
  }, [end, duration]);

  return displayCount;
};

export default function HomeStats() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const [stars, setStars] = useState(0);

  useEffect(() => {
    fetch("https://api.github.com/repos/yohannes-misganaw/truth-chain")
      .then((res) => res.json())
      .then((data) => setStars(data.stargazers_count))
      .catch(() => setStars(0));
  }, []);

  const claimsCount = useCountUp(12560, 3);
  const starsCount = useCountUp(stars, 3);

  return (
    <section className="relative w-full py-10 bg-gradient-to-b from-transparent via-stone-900/50 to-transparent backdrop-blur-3xl">
      <div className="container relative mx-auto flex items-center justify-center px-4 pb-20 z-10">
        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="group relative overflow-hidden p-8"
          >
            <div className="mb-6 flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-12 w-12 items-center justify-center bg-purple-700/30"
              >
                <ShieldCheck className="h-6 w-6 text-purple-400" />
              </motion.div>
              <h3 className="text-lg font-semibold text-gray-200">
                Verified Claims
              </h3>
            </div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-4xl font-semibold tracking-tight text-gray-100 flex items-center gap-3"
            >
              <TbCircleCheck size={30} className="text-green-400" />
              <div>{claimsCount.toLocaleString()}</div>
            </motion.span>

            <p className="mt-4 text-sm text-gray-400">
              Historical claims preserved immutably on-chain
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group relative overflow-hidden p-8"
          >
            <div className="mb-6 flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-12 w-12 items-center justify-center bg-purple-700/30"
              >
                <TbBrandGithub className="h-6 w-6 text-purple-400" />
              </motion.div>
              <h3 className="text-lg font-semibold text-gray-200">
                GitHub Stars
              </h3>
            </div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-4xl font-semibold tracking-tight text-gray-100 flex items-center gap-3"
            >
              <Star size={30} className="text-yellow-400" />
              <div>{starsCount.toLocaleString()}</div>
            </motion.span>

            <p className="mt-4 text-sm text-gray-400">
              Star the project on{" "}
              <a
                href="https://github.com/yohannes-misganaw/truth-chain"
                target="_blank"
                className="text-purple-400 hover:underline"
              >
                GitHub
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
