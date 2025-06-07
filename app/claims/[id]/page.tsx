"use client";

import { useEffect, useState } from "react";
import PostContent from "@/components/shared/PostContent";
import PostToc from "@/components/shared/PostToc";
import TiptapRenderer from "@/components/TiptapRenderer/ClientRenderer";
import PostHeader from "@/components/shared/PostHeader";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { FooterSmall } from "@/components/Footer";
import { Hatch } from "ldrs/react";
import "ldrs/react/Hatch.css";

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
  const [claim, setClaim] = useState<ClaimProps | null>();

  useEffect(() => {
    setClaim({
      id: "123",
      cover_image:
        "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "The Truth Chain",
      claim_body: `
     <h2>Introduction</h2>
<p>
  In web development, creating feature-rich text editors has always been
  challenging. Tiptap, a headless editor framework, combined with React and
  Next.js, opens up possibilities for sophisticated content management systems
  and collaborative editing tools.
</p>
<h3>What is Tiptap?</h3>
<p>
  Tiptap is built on ProseMirror, providing a modular architecture and headless
  functionality. This approach gives developers full control over the UI while
  offering powerful editing capabilities.
</p>
<h3>Key Features</h3>
<ul>
  <li><p>Extensible architecture with various extensions</p></li>
  <li><p>Collaborative editing support</p></li>
  <li><p>TypeScript support</p></li>
  <li><p>Framework-agnostic with excellent React support</p></li>
</ul>
<h2>Getting Started</h2>
<h3>Installation</h3>
<p>
  To integrate Tiptap into a Next.js project, install the necessary
  dependencies:
</p>
<pre><code class="language-bash">npm install @tiptap/react @tiptap/pm @tiptap/starter-kit</code></pre>
<h3>Basic Setup</h3>
<p>Create a basic Tiptap editor component:</p>
<pre><code class="language-javascript">import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const TiptapEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello, Tiptap!</p>',
  })

  return <EditorContent editor={editor} />
}

export default TiptapEditor</code></pre>


    `,
      evidences: [],
      tags: ["science", "energy", "innovation"],
    });
  }, []);

  if (!claim) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gradient-to-t from-stone-900/40 via-stone-900/40 to-black">
        <Hatch size="28" stroke="4" speed="3.5" color="white" />
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full overflow-auto bg-gradient-to-t from-stone-900/40 via-stone-900/40 to-black">
      <article>
        <div className="container mx-auto px-4 py-20 z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <div className="flex items-start flex-col space-y-7 pt-5 md:space-y-0 md:flex-row md:justify-between">
              <Link
                href={"/claims"}
                className="group flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back
              </Link>
            </div>
          </motion.div>
          <div className="flex flex-col md:flex-row justify-between px-4 lg:px-0">
            <div className="lg:w-3/4">
              <PostHeader
                title={claim?.title || ""}
                author="John Doe"
                createdAt="May 1, 2023"
                readingTime={2000}
                cover={claim?.cover_image || "/logo.jpg"}
              />

              <PostToc className="lg:hidden block mb-10" />
              <PostContent>
                <TiptapRenderer>{claim?.claim_body || ""}</TiptapRenderer>
              </PostContent>
            </div>

            <PostToc className="hidden lg:block" />
          </div>
        </div>

        {/* Evidences section */}
      </article>
      <FooterSmall />
    </div>
  );
}
