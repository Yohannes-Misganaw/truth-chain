"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface WalletContextValue {
  api?: CardanoAPI;
  address?: string;
  networkId?: number;
  isConnecting: boolean;
  error?: string;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextValue>({
  isConnecting: false,
  connect: async () => {},
  disconnect: () => {},
});

export function WalletProvider({ children }: { children: ReactNode }) {
  const [api, setApi] = useState<CardanoAPI>();
  const [address, setAddress] = useState<string>();
  const [networkId, setNetworkId] = useState<number>();
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const stored = localStorage.getItem("walletAddress");
    if (stored) setAddress(stored);
  }, []);

  const connect = async () => {
    setIsConnecting(true);
    setError(undefined);

    try {
      if (!window.cardano?.lace) {
        throw new Error("Lace wallet not installed");
      }

      const laceApi = await window.cardano.lace.enable();
      setApi(laceApi);

      const netId = await laceApi.getNetworkId();
      setNetworkId(netId);

      const used = await laceApi.getUsedAddresses();
      console.log("Lace.getUsedAddresses →", used);

      const unused = await laceApi.getUnusedAddresses();
      console.log("Lace.getUnusedAddresses →", unused);

      const change = await laceApi.getChangeAddress();
      console.log("Lace.getChangeAddress →", change);

      let firstAddr = used[0] || unused[0] || change;
      if (!firstAddr) {
        throw new Error("No address available from any method");
      }

      setAddress(firstAddr);
      localStorage.setItem("walletAddress", firstAddr);
    } catch (e: any) {
      console.error("Wallet connect error:", e);
      setError(e.message || "Unknown error");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setApi(undefined);
    setAddress(undefined);
    setNetworkId(undefined);
    localStorage.removeItem("walletAddress");
  };

  return (
    <WalletContext.Provider
      value={{
        api,
        address,
        networkId,
        isConnecting,
        error,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => useContext(WalletContext);
