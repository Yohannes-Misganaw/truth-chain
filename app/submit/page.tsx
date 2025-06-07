"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Upload,
  Shield,
  FileText,
  AlertCircle,
  ArrowLeft,
  Plus,
  X,
  Check,
} from "lucide-react";
import Link from "next/link";
import AddEvidence from "@/components/AddEvidence";
import { useForm, Controller } from "react-hook-form";
import TiptapEditor from "@/components/TiptapEditor";
import { FooterSmall } from "@/components/Footer";
import PostContent from "@/components/shared/PostContent";
import TiptapRenderer from "@/components/TiptapRenderer/ClientRenderer";

interface PostForm {
  title: string;
  content: string;
  tags: string[];
  evidences: Evidence[];
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
  const [currentStep, setCurrentStep] = useState(1);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [evidences, setEvidences] = useState<Evidence[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { control, register, handleSubmit, watch } = useForm<PostForm>({
    defaultValues: { title: "", content: "", tags: [], evidences: [] },
  });

  useEffect(() => {
    if (!coverFile) {
      setCoverPreview(null);
      return;
    }
    const url = URL.createObjectURL(coverFile);
    setCoverPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [coverFile]);

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
    if (file) handleFileChange({ target: { files: [file] } } as any);
  };

  const handleAreaClick = () => fileInputRef.current?.click();
  const handleRemoveCover = () => setCoverFile(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageAdding(true);
    const file = e.target.files?.[0] ?? null;
    if (file && file.size <= 10 * 1024 * 1024) setCoverFile(file);
    setImageAdding(false);
  };

  const handleAddTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) {
      setTags((prev) => [...prev, t]);
      setTagInput("");
    }
  };
  const handleRemoveTag = (i: number) =>
    setTags((prev) => prev.filter((_, idx) => idx !== i));

  const onSubmitInfo = (data: PostForm) => {
    const errors: string[] = [];
    if (!data.title) errors.push("Title is required.");
    if (!data.content) errors.push("Body content is required.");
    if (!coverFile) errors.push("Cover image is required.");
    if (errors.length) {
      setFormErrors(errors);
      return;
    }
    setFormErrors([]);
    setCurrentStep(2);
  };

  const onFinalSubmit = async () => {
    const formData = new FormData();
    formData.append("title", watch("title"));
    formData.append("content", watch("content"));
    formData.append("cover", coverFile!);
    tags.forEach((t) => formData.append("tags", t));
    evidences.forEach((ev) => {
      if (ev.data instanceof File) {
        formData.append("evidences[]", ev.data, ev.id);
      } else if (typeof ev.data === "string") {
        const blob = new Blob([ev.data], { type: "text/plain" });
        formData.append("evidences[]", blob, `${ev.id}.txt`);
      }
    });

    try {
      const res = await fetch("/api/claims", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Submission failed");
      const result = await res.json();
      console.log(result);
      setCurrentStep(3);
    } catch (err: any) {
      console.error(err);
      setFormErrors(["Something went wrong while submitting."]);
      setCurrentStep(2);
    }
  };

  const onBack = () => setCurrentStep((s) => s - 1);

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
                Step {currentStep} of 3 ·{" "}
                {currentStep === 1
                  ? "Claim Information"
                  : currentStep === 2
                    ? "Review"
                    : "Submit"}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex-1 text-center relative">
                <div
                  className={`h-1 absolute top-3 left-0 right-0 -z-10 ${
                    step <= currentStep ? "bg-purple-700" : "bg-gray-700"
                  }`}
                  style={
                    step === 1
                      ? { right: "50%" }
                      : step === 3
                        ? { left: "50%" }
                        : {}
                  }
                />
                <div
                  className={`h-6 w-6 mx-auto rounded-full flex items-center justify-center mb-1 ${
                    step < currentStep
                      ? "bg-purple-700"
                      : step === currentStep
                        ? "bg-purple-700 ring-2 ring-purple-300 ring-opacity-50"
                        : "bg-gray-700"
                  }`}
                >
                  {step < currentStep ? (
                    <Check className="h-3 w-3 text-white" />
                  ) : (
                    <span className="text-xs">{step}</span>
                  )}
                </div>
                <span
                  className={`text-xs font-medium ${
                    step < currentStep
                      ? "text-purple-500"
                      : step === currentStep
                        ? "text-white"
                        : "text-gray-500"
                  }`}
                >
                  {step === 1
                    ? "Information"
                    : step === 2
                      ? "Review"
                      : "Submit"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {formErrors.length > 0 && currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-red-900/50 border border-red-700 p-4 mb-6 max-w-4xl mx-auto"
            >
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-red-200">
                    Please correct the following issues:
                  </p>
                  <ul className="list-disc list-inside mt-1 text-xs text-red-300">
                    {formErrors.map((error, i) => (
                      <li key={i}>{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {currentStep === 1 && (
          <motion.form
            onSubmit={handleSubmit(onSubmitInfo)}
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
                {...register("title")}
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
                  className={`relative border-2 border-dashed ${
                    isDragActive
                      ? "border-purple-700 bg-purple-700/10"
                      : "border-gray-800 hover:border-purple-700"
                  } p-8 text-center cursor-pointer transition-colors`}
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
                        src={coverPreview!}
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
                {tags.map((tag, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1 bg-purple-700/20 border border-purple-700 text-purple-300 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(i)}
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
                <button
                  type="button"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                  onClick={() => {
                    /* TODO: draft save */
                  }}
                >
                  Save Draft
                </button>
                <button
                  type="submit"
                  className="group relative overflow-hidden border border-gray-400 px-8 py-3 text-xs transition-all duration-300 rounded-lg"
                >
                  <div className="absolute inset-0 left-0 h-full w-0 bg-purple-700 transition-all duration-300 group-hover:w-full" />
                  <span className="relative z-10 mix-blend-exclusion">
                    Continue to Review
                  </span>
                </button>
              </div>
            </div>
          </motion.form>
        )}

        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-auto p-3 md:max-w-4xl md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <FileText className="h-6 w-6 text-purple-500" />
              <h2 className="text-lg font-semibold text-gray-200">
                Review Your Claim
              </h2>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Title
              </label>
              <div className="w-full bg-black/10 border border-gray-700 px-4 py-3 text-sm text-gray-200">
                {watch("title")}
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Cover Image
              </label>
              {coverPreview ? (
                <div className="border border-gray-700 overflow-hidden flex items-center h-64">
                  <img
                    src={coverPreview}
                    alt="Cover preview"
                    className="h-full w-full object-contain"
                  />
                </div>
              ) : (
                <div className="bg-black/10 border border-gray-700 px-4 py-6 text-center text-gray-500 rounded">
                  No cover image selected
                </div>
              )}
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Body
              </label>
              <div className="bg-black/10 border border-gray-700 p-4 max-h-80 overflow-auto">
                <PostContent>
                  <TiptapRenderer>{watch("content")}</TiptapRenderer>
                </PostContent>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {tags.length > 0 ? (
                  tags.map((t, i) => (
                    <span
                      key={i}
                      className="bg-purple-700/20 border border-purple-700 text-purple-300 px-3 py-1 rounded-full text-sm"
                    >
                      {t}
                    </span>
                  ))
                ) : (
                  <div className="text-gray-500 text-sm">No tags added</div>
                )}
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Evidence
              </label>
              {evidences.length > 0 ? (
                <ul className="list-disc list-inside text-gray-200">
                  {evidences.map((e) => (
                    <li key={e.id} className="mb-1">
                      <span className="font-medium text-gray-300 capitalize">
                        {e.type}
                      </span>
                      {": "}
                      <span>
                        {typeof e.data === "string"
                          ? e.data
                          : e.data instanceof File
                            ? `${e.data.name} (${Math.round(e.data.size / 1024)} KB)`
                            : "—"}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-gray-500 text-sm">No evidence added</div>
              )}
            </div>

            <div className="mt-10 flex justify-between border-t border-gray-800 pt-8">
              <button
                onClick={onBack}
                className="px-6 py-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                ← Back
              </button>
              <button
                type="submit"
                onClick={onFinalSubmit}
                className="group relative overflow-hidden border border-gray-400 px-8 py-3 text-xs transition-all duration-300 rounded-lg"
              >
                <div className="absolute inset-0 left-0 h-full w-0 bg-purple-700 transition-all duration-300 group-hover:w-full" />
                <span className="relative z-10 mix-blend-exclusion">
                  Submit Claim
                </span>
              </button>
            </div>
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-auto p-16 md:max-w-2xl text-center"
          >
            <Check className="mx-auto mb-4 h-12 w-12 text-green-500" />
            <h2 className="text-2xl font-semibold text-white mb-10">
              Claim Submitted!
            </h2>
            <p className="text-gray-400 mb-14 text-sm">
              Thank you. Your claim has been received and is open for review.
            </p>
            <Link
              href="/"
              className="group relative overflow-hidden border border-gray-400 px-8 py-3 text-xs transition-all duration-300 rounded-lg"
            >
              <div className="absolute inset-0 left-0 h-full w-0 bg-purple-700 transition-all duration-300 group-hover:w-full" />
              <span className="relative z-10 mix-blend-exclusion">
                Return Home
              </span>
            </Link>
          </motion.div>
        )}
      </div>

      <FooterSmall />
    </div>
  );
}
