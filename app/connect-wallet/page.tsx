"use client";

import { motion } from "framer-motion";
import { Wallet2, ChevronRight, Check } from "lucide-react";
import Link from "next/link";

export default function ConnectWalletPage() {
  return (
    <div className="min-h-screen bg-gradient-to-t from-purple-700/50 via-black to-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-black/80 backdrop-blur-lg rounded-2xl border border-purple-700/30 p-8 max-w-md w-full"
      >
        <div className="text-center space-y-6">
          <div className="flex justify-center items-center">
            <div className="p-4 rounded-full bg-purple-700/20 border border-purple-700/30">
              <Wallet2 className="w-12 h-12 text-purple-500" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">Connect Your Wallet</h1>
          <p className="text-purple-300/80 mb-8">
            Use <strong className="text-purple-500">Lace Wallet</strong> to
            interact with Truth Chain.
          </p>

          <button className="w-full group bg-purple-700 hover:bg-purple-600 text-white h-12 text-lg px-6 rounded-xl transition-all duration-200">
            <div className="flex items-center justify-between">
              <Wallet2 className="w-5 h-5" />
              <span className="tracking-tight text-sm">
                Connect Lace Wallet
              </span>
              <ChevronRight
                size={20}
                className="group-hover:translate-x-2 transition-transform"
              />
            </div>
          </button>

          <p className="text-sm text-purple-400/60 mt-4">
            Don’t have Lace?{" "}
            <a
              href="https://www.lace.io"
              target="_blank"
              className="text-purple-500 hover:underline"
            >
              Download here
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
