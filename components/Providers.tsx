"use client";

import { ReactNode } from "react";
import { WalletProvider } from "@/contexts/WalletContext";

export function Providers({ children }: { children: ReactNode }) {
  return <WalletProvider>{children}</WalletProvider>;
}
