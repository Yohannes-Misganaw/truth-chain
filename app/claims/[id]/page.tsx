"use client";

import { use, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PostContent from "@/components/shared/PostContent";
import PostToc from "@/components/shared/PostToc";
import TiptapRenderer from "@/components/TiptapRenderer/ClientRenderer";

interface ClaimProps {
  id: string;
  cover_image: string;
  title: string;
  claim_body: string;
  evidences: Evidence[];
  tags: string[];
}

type EvidenceType = "link" | "image" | "video" | "file";

interface Evidence {
  id: string;
  type: EvidenceType;
  data: string | File | null;
}

export default function ClaimDetails() {
  const { id } = useParams();
  const [claim, setClaim] = useState<ClaimProps | null>();

  useEffect(() => {
    setClaim({
      id: "123",
      cover_image: "",
      title: "Breaking: Major Scientific Discovery Unveiled",
      claim_body: `
     <h2>Introduction</h2>

    `,
      evidences: [],
      tags: ["science", "energy", "innovation"],
    });
  }, []);

  return (
    <article className="relative min-h-screen w-full overflow-hidden bg-gradient-to-t from-stone-900/40 via-stone-900/40 to-black">
      <div className="relative mx-auto px-4 py-20 z-10">
        <div className="grid grid-cols-1 w-full lg:w-auto lg:grid-cols-[minmax(auto,256px)_minmax(720px,1fr)_minmax(auto,256px)] gap-6 lg:gap-8">
          <div className="w-5 h-full" />
          <PostContent>
            <TiptapRenderer>{claim?.claim_body || ""}</TiptapRenderer>
          </PostContent>
          <PostToc />
        </div>
      </div>
    </article>
  );
}
