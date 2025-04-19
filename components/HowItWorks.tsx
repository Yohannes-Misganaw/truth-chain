"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Separator } from "./ui/separator";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const steps = [
  {
    title: "Claim & Media Submission",
    description:
      "Submit claims or media through our secure interface with optional private source protection.",
  },
  {
    title: "On-Chain Registration",
    description:
      "Immutable blockchain registration with timestamped metadata and content hashing.",
  },
  {
    title: "ZK Proof Generation",
    description:
      "Privacy-preserving verification using Zero-Knowledge Proofs for anonymous validation.",
  },
  {
    title: "Community Verification",
    description:
      "Decentralized consensus through authenticated fact-checker voting system.",
  },
  {
    title: "Immutable Archiving",
    description:
      "Permanent storage on IPFS with public audit trail and censorship-resistant access.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative min-h-screen space-y-10 w-full overflow-hidden bg-gradient-to-b from-purple-900/30 via-black to-black">
      <div className="container mx-auto px-4 py-24">
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
            className="text-gradient bg-gradient-to-b from-gray-300 via-gray-500 to-gray-500 bg-clip-text text-3xl font-bold !leading-tight text-transparent "
          >
            How Truth Chain Works
          </motion.h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden border border-gray-600 bg-black/30 p-6 backdrop-blur-sm"
              style={{
                borderImage:
                  "repeating-linear-gradient(-45deg, #364153 0, #364153 4px, transparent 4px, transparent 8px) 1.5",
              }}
            >
              <div className="mb-4 flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-700/30 text-sm font-bold text-purple-400">
                  0{index + 1}
                </div>
                <h3 className="text-lg font-semibold text-gray-200">
                  {step.title}
                </h3>
              </div>
              <p className="text-sm font-medium text-gray-400">
                {step.description}
              </p>

              <div className="absolute inset-0 -left-full h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-1000 group-hover:left-full" />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex items-start flex-col md:flex-row md:px-10 px-7 pb-8 space-y-20 md:space-y-0">
        <div className="space-y-8 md:w-1/2 w-full md:py-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <h2 className="mb-2 text-xl md:text-2xl font-bold text-gray-400">
              Join the Truth Chain Community
            </h2>
            <p className="text-sm font-medium text-gray-400">
              Be part of the future of fact-checking.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <Link
              href="/claims"
              className="group relative mx-auto inline-block overflow-hidden border border-gray-400 px-8 py-3 text-xs transition-all duration-300"
            >
              <div className="absolute inset-0 left-0 h-full w-0 bg-purple-700 transition-all duration-300 group-hover:w-full" />
              <span className="relative z-10 mix-blend-exclusion">
                Verify Claims
              </span>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="hidden md:block h-60 w-px border-l border-gray-800 mx-8"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="md:w-1/2 w-full space-y-7 lg:px-7"
        >
          <h1 className="text-xl md:text-2xl font-bold text-gray-400">
            Frequently Asked Questions
          </h1>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I submit a claim?</AccordionTrigger>
              <AccordionContent className="text-gray-400 my-5">
                <div className="flex items-start">
                  <div className="p-1.5 bg-purple-700 mr-2 mt-1" />
                  <p>
                    Connect your Lace Wallet, click “Submit Claim,” fill out the
                    form, and upload your evidence. Then hit “Submit” to record
                    it on-chain.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>What is Zero‑Knowledge Proof?</AccordionTrigger>
              <AccordionContent className="text-gray-400 my-5">
                <div className="flex items-start">
                  <div className="p-1.5 bg-purple-700 mr-2 mt-1" />
                  <p>
                    It’s a cryptographic method that lets you prove you
                    performed a fact-check without revealing your personal data
                    or the source material.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>
                Where is my verified data stored?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 my-5">
                All metadata and verification statuses are stored on the
                blockchain for immutability; the actual files are kept on IPFS
                for censorship‑resistant access.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
