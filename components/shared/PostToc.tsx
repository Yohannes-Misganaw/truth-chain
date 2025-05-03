"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import useToc from "@/hooks/useToc";

const PostToc = ({ className }: { className?: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { items, activeId } = useToc({
    containerSelector: ".article-content",
    headingSelector: "h2, h3",
    observerOptions: { rootMargin: "0px 0px -75% 0px", threshold: 1 },
  });

  const scrollToHeading = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    router.push(`${pathname}#${id}`, { scroll: false });
  };

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  if (!items.length) return null;

  return (
    <div className={clsx("order-1 lg:order-3", className)}>
      <div className="lg:sticky lg:h-[calc(100vh-120px)] lg:top-24 overflow-auto">
        <h2 className="text-sm font-bold uppercase">On this page</h2>
        <ul className="mt-4 space-y-3.5 text-[13px] pl-5 border-l border-gray-700">
          {items.map((item) => (
            <li
              key={item.id}
              style={{
                paddingLeft: `${(item.level - 2) * 1}rem`,
              }}
            >
              <Link
                href={`#${item.id}`}
                onClick={scrollToHeading(item.id)}
                className={`hover:text-purple-500 transition-colors ${
                  activeId === item.id ? "text-purple-500" : "text-gray-400"
                }`}
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostToc;
