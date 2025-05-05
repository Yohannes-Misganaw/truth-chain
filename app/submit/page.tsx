"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Shield,
  FileText,
  AlertCircle,
  ArrowLeft,
  Plus,
  X,
} from "lucide-react";
import Link from "next/link";
import AddEvidence from "@/components/AddEvidence";
import { useForm, Controller } from "react-hook-form";
import TiptapEditor from "@/components/TiptapEditor";
import { FooterSmall } from "@/components/Footer";

interface PostForm {
  content: string;
}

export type EvidenceType = "link" | "image" | "video" | "file";

export interface Evidence {
  id: string;
  type: EvidenceType;
  data: string | File | null;
}

export default function SubmitClaim() {
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [imageAdding, setImageAdding] = useState(false);
  const [evidences, setEvidences] = useState<Evidence[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { control } = useForm<PostForm>();

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const onDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileChange({ target: { files: [file] } } as any);
    }
  };

  useEffect(() => {
    if (!coverFile) {
      setCoverPreview(null);
      return;
    }
    const url = URL.createObjectURL(coverFile);
    setCoverPreview(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [coverFile]);

  const handleAreaClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveCover = () => {
    setCoverFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageAdding(true);
    const file = e.target.files?.[0] ?? null;
    if (file && file.size <= 10 * 1024 * 1024) {
      setCoverFile(file);
    } else {
      setCoverFile(null);
    }
    setImageAdding(false);
  };

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

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

        <motion.form
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
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Title
            </label>
            <input
              type="text"
              className="w-full bg-black/20 border border-gray-700 px-4 py-3 text-sm text-gray-200 focus:outline-none focus:border-purple-700"
              placeholder="Claim / News Title"
            />
          </div>

          <div className="mb-12">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Cover Image
            </label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/gif"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            {imageAdding ? (
              <div className="flex items-center justify-center text-sm text-gray-400 p-8 border-2 border-dashed border-gray-800">
                Uploading...
              </div>
            ) : (
              <div
                onClick={!coverPreview ? handleAreaClick : undefined}
                onDragOver={onDragOver}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className={`
              relative border-2 border-dashed
              ${isDragActive ? "border-purple-700 bg-purple-700/10" : "border-gray-800 hover:border-purple-700"}
              p-8 text-center cursor-pointer transition-colors
            `}
              >
                {!coverPreview ? (
                  <>
                    <div className="mb-4 text-gray-400">
                      <Upload className="h-8 w-8 mx-auto" />
                    </div>
                    <p className="text-sm text-gray-400">
                      Drag and drop a file or click to upload
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Supported formats: JPEG, PNG, GIF (Max 10MB)
                    </p>
                  </>
                ) : (
                  <>
                    <img
                      src={coverPreview}
                      alt="Cover preview"
                      className="mx-auto max-h-48 object-contain"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveCover}
                      className="absolute top-2 right-2 bg-black/60 rounded-full p-1 hover:bg-black/80 transition"
                    >
                      <X className="h-4 w-4 text-white" />
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="mb-12">
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
                  placeholder={{ paragraph: "Write your claim / news here" }}
                  onContentChange={field.onChange}
                  initialContent={field.value}
                  contentMinHeight={400}
                />
              )}
            />
          </div>

          <div className="mb-12">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddTag())
                }
                className="flex-1 bg-black/20 border border-gray-700 px-4 py-3 text-sm text-gray-200 focus:outline-none focus:border-purple-700"
                placeholder="Enter a tag and press Enter"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="text-center bg-black/20 border border-gray-700 px-4 py-3 text-sm text-gray-200 hover:border-purple-700 flex items-center justify-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Tag
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 bg-purple-700/20 border border-purple-700 text-purple-300 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(index)}
                    className="text-purple-400 hover:text-white"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <AddEvidence evidences={evidences} setEvidences={setEvidences} />

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
        </motion.form>
      </div>
      <FooterSmall />
    </div>
  );
}
