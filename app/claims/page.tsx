"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, FileText, Search, Vote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FooterSmall } from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function Claims() {
  const claims = [
    {
      id: 1,
      title: "Climate Change Impact Report Accuracy",
      excerpt: "Recent UN report on arctic ice melt figures verification...",
      status: "verified",
      date: "2024-03-15",
      category: "Environment",
      evidenceCount: 4,
      votes: 2345,
      comments: 89,
      imageUrl:
        "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      title: "Economic Growth Figures Discrepancy",
      excerpt: "Q4 2023 GDP numbers comparison between official reports...",
      status: "pending",
      date: "2024-03-14",
      category: "Economy",
      evidenceCount: 2,
      votes: 891,
      comments: 45,
      imageUrl:
        "https://images.unsplash.com/photo-1611244763972-aa9c8368ef14?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      title: "Climate Change Impact Report Accuracy",
      excerpt: "Recent UN report on arctic ice melt figures verification...",
      status: "rejected",
      date: "2024-03-12",
      category: "Environment",
      evidenceCount: 4,
      votes: 2345,
      comments: 89,

      imageUrl:
        "https://images.unsplash.com/photo-1613510574898-9c830e5192c5?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      title: "Economic Growth Figures Discrepancy",
      excerpt: "Q4 2023 GDP numbers comparison between official reports...",
      status: "pending",
      date: "2024-03-10",
      category: "Economy",
      evidenceCount: 2,
      votes: 891,
      comments: 45,
      imageUrl:
        "https://images.unsplash.com/photo-1589878722745-a808de2fe798?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-t from-stone-900/40 via-stone-900/40 to-black">
      <div className="relative py-20 md:px-10 z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-col gap-4 px-5 md:flex-row md:justify-between md:items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Claims</h1>
              <p className="text-sm text-gray-400 mt-1">
                1,234 claims submitted · 89% verification rate
              </p>
            </div>

            <div className="flex gap-2 w-full md:w-96">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search claims..."
                  className="w-full bg-black/20 border border-gray-700 px-10 py-3 text-sm text-gray-200 focus:outline-none focus:border-purple-700 peer"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 peer-focus:text-purple-400 transition-colors" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-3 md:py-8 md:px-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {claims.map((claim, index) => (
              <motion.div
                key={claim.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative flex flex-col justify-between overflow-hidden border border-gray-800 bg-stone-900 p-6 backdrop-blur-sm hover:border-purple-700/50 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        claim.status === "verified"
                          ? "bg-green-900/30 text-green-400"
                          : claim.status === "pending"
                            ? "bg-yellow-900/30 text-yellow-400"
                            : "bg-red-900/30 text-red-400"
                      }`}
                    >
                      {claim.status === "verified" && (
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                      )}
                      {claim.status === "pending" && (
                        <Clock className="h-4 w-4 mr-2" />
                      )}
                      {claim.status.charAt(0).toUpperCase() +
                        claim.status.slice(1)}
                    </div>
                    <span className="text-xs text-gray-500">{claim.date}</span>
                  </div>

                  <div className="relative h-48 w-full mb-4 overflow-hidden">
                    {claim.imageUrl ? (
                      <Image
                        src={claim.imageUrl}
                        alt={claim.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-800 animate-pulse" />
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-200 mb-2">
                    {claim.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">{claim.excerpt}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-purple-900/30 text-purple-400 text-xs ">
                      {claim.category}
                    </span>
                    <span className="px-2 py-1 bg-gray-800/30 text-gray-400 text-xs flex items-center">
                      <FileText className="h-4 w-4 mr-1" />
                      {claim.evidenceCount} evidences
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between space-x-3 border-t border-gray-800 pt-4">
                  <div className="flex items-center space-x-2.5 md:space-x-4">
                    <button className="flex items-center text-gray-400 hover:text-purple-400 transition-colors">
                      <Vote className="h-5 w-5 mr-1" />
                      <span className="text-sm">{claim.votes} votes</span>
                    </button>
                    <div className="text-xs bg-gray-900 px-2 py-1 text-gray-400">
                      30% vote True
                    </div>
                  </div>
                  <Link
                    href={`/claims/${claim.id}`}
                    className="bg-purple-900/30 hover:bg-purple-900/50 text-purple-400 px-4 py-2 text-sm flex items-center"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <FooterSmall />
    </div>
  );
}
