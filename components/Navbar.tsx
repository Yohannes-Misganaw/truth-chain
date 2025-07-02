"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Verified News", href: "/news" },
  { name: "Archive", href: "/archive" },
  { name: "Claims", href: "/claims" },
  { name: "Submit Claim", href: "/submit" },
  { name: "About", href: "/about" },
];

const navVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    opacity: 0,
    y: -20,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: -20 },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="fixed flex px-4 lg:px-10 py-5 items-center justify-between top-0 z-20 left-0 w-full bg-black/95 lg:bg-black/50 text-gray-300">
      <div className="flex items-center space-x-4 lg:space-x-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-base font-medium text-white tracking-tighter"
        >
          <Link href="/" className="cursor-default">
            Truth Chain
          </Link>
        </motion.div>

        <motion.div
          className="hidden lg:block w-px h-6 bg-gray-600"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5 }}
        />

        <div className="hidden lg:flex space-x-12 text-[13px] font-medium">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className="cursor-pointer hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="hidden lg:block"
      >
        <Link
          href="/connect-wallet"
          className="group relative overflow-hidden border border-gray-400 text-xs items-center px-6 py-3 transition-all duration-300"
        >
          <div className="absolute inset-0 left-0 h-full w-0 bg-purple-700 transition-all duration-300 group-hover:w-full" />

          <span className="relative z-10 mix-blend-exclusion">
            Connect Wallet
          </span>
        </Link>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden p-2 -mr-2 text-gray-400 hover:text-white focus:outline-none"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm lg:hidden overflow-hidden"
          >
            <motion.div
              variants={navVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="px-4 py-6 space-y-4"
            >
              {menuItems.map((item) => (
                <motion.div
                  key={item.name}
                  variants={itemVariants}
                  className="border-b border-gray-600"
                >
                  <Link
                    href={item.href}
                    className="block text-sm hover:text-white transition-colors py-3"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={itemVariants} className="mt-8">
                <Link
                  href="/connect-wallet"
                  className="group relative block overflow-hidden border border-gray-400 text-xs w-full text-center py-3 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="absolute inset-0 left-0 h-full w-0 bg-purple-700 transition-all duration-300 group-hover:w-full" />

                  <span className="relative z-10 mix-blend-exclusion">
                    Connect Wallet
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
