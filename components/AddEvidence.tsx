import { useState } from "react";
import { Plus, X, Upload, Image, Video, File, Link2 } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { motion } from "framer-motion";

type EvidenceType = "link" | "image" | "video" | "file";

interface Evidence {
  id: string;
  type: EvidenceType;
  data: string | File | null;
}

export default function AddEvidence() {
  const [evidences, setEvidences] = useState<Evidence[]>([]);

  const addEvidence = () => {
    const newEvidence: Evidence = {
      id: Math.random().toString(36).substr(2, 9),
      type: "link",
      data: null,
    };
    setEvidences([...evidences, newEvidence]);
  };

  const removeEvidence = (id: string) => {
    setEvidences(evidences.filter((e) => e.id !== id));
  };

  const updateEvidenceType = (id: string, type: EvidenceType) => {
    setEvidences(
      evidences.map((e) => (e.id === id ? { ...e, type, data: null } : e))
    );
  };

  const handleEvidenceData = (id: string, data: string | File) => {
    setEvidences(evidences.map((e) => (e.id === id ? { ...e, data } : e)));
  };

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <Upload className="h-6 w-6 text-purple-400" />
        <h2 className="text-lg font-semibold text-gray-200">Evidence Upload</h2>
      </div>

      <div className="space-y-4">
        {evidences.map((evidence) => (
          <div key={evidence.id}>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 bg-black/20 border border-gray-700 rounded-lg relative"
            >
              <button
                onClick={() => removeEvidence(evidence.id)}
                className="absolute top-2 right-2 p-1 text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <Select
                  value={evidence.type}
                  onValueChange={(value) =>
                    updateEvidenceType(evidence.id, value as EvidenceType)
                  }
                >
                  <SelectTrigger className="bg-black/40 border border-gray-700 rounded-md px-3 py-1.5 text-sm text-gray-200 gap-2 w-[180px]">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/80 border border-gray-700">
                    <SelectItem value="link" className="hover:bg-purple-900/20">
                      <div className="flex items-center gap-2">
                        <Link2 className="h-4 w-4 text-purple-400" />
                        <span>Web Link</span>
                      </div>
                    </SelectItem>
                    <SelectItem
                      value="image"
                      className="hover:bg-purple-900/20"
                    >
                      <div className="flex items-center gap-2">
                        <Image className="h-4 w-4 text-purple-400" />
                        <span>Image</span>
                      </div>
                    </SelectItem>
                    <SelectItem
                      value="video"
                      className="hover:bg-purple-900/20"
                    >
                      <div className="flex items-center gap-2">
                        <Video className="h-4 w-4 text-purple-400" />
                        <span>Video</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="file" className="hover:bg-purple-900/20">
                      <div className="flex items-center gap-2">
                        <File className="h-4 w-4 text-purple-400" />
                        <span>Document</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {evidence.type === "link" ? (
                <input
                  type="url"
                  placeholder="https://example.com/evidence"
                  onChange={(e) =>
                    handleEvidenceData(evidence.id, e.target.value)
                  }
                  className="w-full bg-black/20 border border-gray-700 px-4 py-2 text-sm text-gray-200 focus:outline-none focus:border-purple-700 rounded-md"
                />
              ) : (
                <div className="border-2 border-dashed border-gray-800 hover:border-purple-700 rounded-md p-4 text-center cursor-pointer">
                  <label className="block">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-400">
                      Click to upload {evidence.type}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {evidence.type === "image" && "JPEG, PNG, GIF (Max 10MB)"}
                      {evidence.type === "video" && "MP4, MOV (Max 500MB)"}
                      {evidence.type === "file" && "PDF, DOC, DOCX (Max 25MB)"}
                    </p>
                    <input
                      type="file"
                      className="hidden"
                      accept={
                        evidence.type === "image"
                          ? "image/*"
                          : evidence.type === "video"
                            ? "video/*"
                            : ".pdf,.doc,.docx"
                      }
                      onChange={(e) =>
                        e.target.files?.[0] &&
                        handleEvidenceData(evidence.id, e.target.files[0])
                      }
                    />
                  </label>
                </div>
              )}
            </motion.div>
          </div>
        ))}

        <button
          onClick={addEvidence}
          className="group w-full text-center bg-black/20 border border-gray-700 px-4 py-3 text-sm text-gray-200 hover:border-purple-700 flex items-center justify-center gap-2"
        >
          <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" />
          Add Evidence
        </button>
      </div>
    </div>
  );
}
