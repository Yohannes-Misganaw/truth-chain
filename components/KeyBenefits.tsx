"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { FaRegHandshake } from "react-icons/fa6";
import { PiUsersFour } from "react-icons/pi";
import { TbPlus } from "react-icons/tb";

const benefits = [
  {
    title: "Immutable Trust",
    description:
      "All claims and media hashes are permanently recorded on-chain, ensuring tamper‑proof verifications and a transparent audit trail.",
  },
  {
    title: "Privacy‑Preserving Validation",
    description:
      "Zero‑Knowledge Proofs allow users to prove they’ve fact‑checked or submitted evidence without exposing personal data or sensitive sources.",
  },
  {
    title: "Community‑Driven Accuracy",
    description:
      "Decentralized voting by verified fact‑checkers and public stakeholders eliminates single‑point biases and fosters collective accountability.",
  },
];

export default function KeyBenefits() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden ">
      <div className="absolute top-1/6 left-10 md:left-1/6 h-60 w-60  bg-white/30 blur-3xl" />
      <div className="absolute bottom-1/6 right-10 md:right-1/6 h-60 w-60  bg-purple-700/60 blur-3xl" />
      <div className="container relative mx-auto px-4 py-24 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gradient bg-gradient-to-b from-gray-300 via-gray-500 to-gray-500 bg-clip-text text-2xl font-bold !leading-tight text-transparent md:text-3xl lg:text-4xl"
          >
            Core Advantages
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-x border-gray-800/50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative border-2 md:border border-b-0 lg:border-b md:border-r-0 h-[calc(100vh-12rem)] bg-black/30 p-6 backdrop-blur-sm flex flex-col items-center justify-evenly hover:bg-gradient-to-b from-transparent via-white/10 to-transparent"
            style={{
              borderImage:
                "repeating-linear-gradient(-45deg, #4a5565 0, #4a5565 5px, transparent 5px, transparent 10px) 1",
            }}
          >
            <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 text-3xl text-gray-500">
              <TbPlus strokeWidth={1} />
            </div>

            <h3 className="text-xl font-bold text-gray-200">Immutable Trust</h3>
            <FaRegHandshake size={70} className="text-purple-500" />
            <p className="text-sm text-gray-400">
              Every claim and piece of media is permanently recorded on the
              blockchain with a timestamp and cryptographic hash, making it
              tamper-proof and publicly auditable. This ensures information
              integrity and establishes a reliable, verifiable history of facts
              for future reference.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="border-2 md:border h-[calc(100vh-12rem)] bg-black/30 p-6 backdrop-blur-sm flex flex-col items-center justify-around hover:bg-gradient-to-b from-transparent via-white/10 to-transparent"
            style={{
              borderImage:
                "repeating-linear-gradient(-45deg, #4a5565 0, #4a5565 5px, transparent 5px, transparent 10px) 1",
            }}
          >
            <h3 className="text-xl font-bold text-gray-200">
              Privacy-Preserving Validation
            </h3>
            <ShieldCheck size={70} className="text-purple-500" />
            <p className="text-sm text-gray-400">
              Zero-Knowledge Proofs allow users to validate claims and
              fact-check anonymously, proving participation without revealing
              personal identity or sensitive information. This protects
              whistleblowers, journalists, and sources while maintaining trust
              in the verification process.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="relative border-2 md:border md:border-t-0 border-t-0 lg:border-t lg:border-l-0 h-[calc(100vh-12rem)] bg-black/30 p-6 backdrop-blur-sm flex flex-col items-center justify-evenly hover:bg-gradient-to-b from-transparent via-white/10 to-transparent"
            style={{
              borderImage:
                "repeating-linear-gradient(-45deg, #4a5565 0, #4a5565 5px, transparent 5px, transparent 10px) 1",
            }}
          >
            <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 text-3xl font-bold text-gray-500">
              <TbPlus strokeWidth={1} />
            </div>

            <h3 className="text-xl font-bold text-gray-200">
              Community-Driven Accuracy
            </h3>
            <PiUsersFour size={70} className="text-purple-500" />
            <p className="text-sm text-gray-400">
              Verified fact-checkers and public contributors collaboratively
              review claims, casting transparent votes on validity. This
              decentralized consensus model eliminates single-point bias,
              promoting collective accountability and strengthening the
              reliability of public information.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-20 text-center"
        >
          <Link
            href="/about"
            className="group relative mx-auto inline-block overflow-hidden border border-gray-400 px-8 py-3 text-xs transition-all duration-300"
          >
            <div className="absolute inset-0 left-0 h-full w-0 bg-purple-700 transition-all duration-300 group-hover:w-full" />
            <span className="relative z-10 mix-blend-exclusion">
              Learn More About Our Technology
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
