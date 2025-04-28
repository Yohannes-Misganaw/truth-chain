"use client";

import { motion } from "framer-motion";
import {
  Upload,
  Shield,
  FileText,
  AlertCircle,
  ArrowLeft,
  Plus,
} from "lucide-react";
import Link from "next/link";
import AddEvidence from "@/components/AddEvidence";
import { useState } from "react";
import TiptapEditor from "@/components/TiptapEditor";
import { useForm, Controller } from "react-hook-form";
import { FooterSmall } from "@/components/Footer";

interface PostForm {
  content: string;
}

export default function SubmitClaim() {
  const [isLoading, setIsLoading] = useState(true);
  const { control, reset, watch } = useForm<PostForm>();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-t from-stone-900/40 via-stone-900/40 to-black">
      <div className="container relative mx-auto px-4 py-20 z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-start flex-col space-y-7 pt-5 md:space-y-0 md:flex-row md:justify-between">
            <Link
              href="/"
              className="group flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            <div className="md:text-right">
              <h1 className="text-2xl font-bold text-white">
                Submit New Claim
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Step 1 of 3 · Claim Information
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mx-auto p-3 md:max-w-4xl md:p-8"
        >
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="h-6 w-6 text-purple-500" />
              <h2 className="text-lg font-semibold text-gray-200">
                Claim Details
              </h2>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Title
              </label>
              <input
                type="text"
                className="w-full bg-black/20 border border-gray-700 px-4 py-3 text-sm text-gray-200 focus:outline-none focus:border-purple-700"
                placeholder="Claim / News Title"
              />
            </div>
          </div>

          <div className="mb-12">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Cover Image
            </label>

            <div className="border-2 border-dashed border-gray-800 hover:!border-purple-700 p-8 text-center">
              <div className="mb-4 text-gray-400">
                <Upload className="h-8 w-8 mx-auto" />
              </div>
              <p className="text-sm text-gray-400">
                Drag and drop a file or click to upload
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Supported formats: JPEG, PNG, GIF (Max 10MB)
              </p>
            </div>
          </div>

          <div className="mb-12">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Claim / News Body
              </label>

              <Controller
                control={control}
                name="content"
                render={({ field }) => (
                  <TiptapEditor
                    ssr={true}
                    output="html"
                    placeholder={{
                      paragraph: "Write your claim / news here",
                    }}
                    onContentChange={field.onChange}
                    initialContent={field.value}
                    contentMinHeight={400}
                  />
                )}
              />
            </div>
          </div>

          {/* <div className="flex">
            <PostContent>
              <TiptapRenderer>{watch("content")}</TiptapRenderer>
            </PostContent>
            <PostToc />
          </div> */}

          <div className="mb-12">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Tags
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 bg-black/20 border border-gray-700 px-4 py-3 text-sm text-gray-200 focus:outline-none focus:border-purple-700"
                placeholder="Tags"
              />

              <button
                type="button"
                className="text-center bg-black/20 border border-gray-700 px-4 py-3 text-sm text-gray-200 hover:border-purple-700 flex items-center justify-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Tag
              </button>
            </div>
          </div>

          <AddEvidence />

          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-6 w-6 text-purple-400" />
              <h2 className="text-lg font-semibold text-gray-200">
                Source Protection
              </h2>
            </div>

            <div className="bg-black/20 p-4 border border-gray-800">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-300">
                    Any sensitive source information entered here will be
                    encrypted locally and never stored on our servers.
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Protected by Zero-Knowledge Proofs (ZKP)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex justify-between items-center">
              <button className="text-sm text-gray-400 hover:text-white transition-colors">
                Save Draft
              </button>
              <button className="group relative overflow-hidden border border-gray-400 px-8 py-3 text-xs transition-all duration-300 rounded-lg">
                <div className="absolute inset-0 left-0 h-full w-0 bg-purple-700 transition-all duration-300 group-hover:w-full" />
                <span className="relative z-10 mix-blend-exclusion">
                  Continue to Review
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      <FooterSmall />
    </div>
  );
}
