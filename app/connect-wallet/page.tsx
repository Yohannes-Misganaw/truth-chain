"use client";

import { useState, useEffect } from "react";
import { FooterSmall } from "@/components/Footer";
import { motion } from "framer-motion";
import { Wallet2, ChevronRight, Check, LogOut } from "lucide-react";

export default function ConnectWalletPage() {
  const [walletAddress, setWalletAddress] = useState<string>();
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const checkExistingConnection = async () => {
      try {
        const savedWalletAddress = localStorage.getItem("walletAddress");

        if (savedWalletAddress && window.cardano?.lace) {
          const isEnabled = await window.cardano.lace.isEnabled();

          if (isEnabled) {
            setWalletAddress(savedWalletAddress);
            console.log(
              "Restored existing wallet connection:",
              savedWalletAddress
            );
          } else {
            localStorage.removeItem("walletAddress");
          }
        }
      } catch (err) {
        console.error("Error checking existing wallet connection:", err);
        localStorage.removeItem("walletAddress");
      }
    };

    checkExistingConnection();
  }, []);

  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      setError("");

      if (!window.cardano?.lace) {
        setError(
          "Lace wallet not found. Please install Lace wallet extension."
        );
        return;
      }

      const api = await window.cardano.lace.enable();
      if (!api) {
        setError(
          "Failed to enable Lace wallet. Please check extension permissions."
        );
        return;
      }

      const networkId = await api.getNetworkId();
      console.log("Connected to network ID:", networkId);

      const connectionId = "lace-connected-" + Date.now();
      setWalletAddress(connectionId);
      localStorage.setItem("walletAddress", connectionId);
      console.log("Connected to Lace wallet successfully");
    } catch (err) {
      console.error("Error connecting to Lace wallet:", err);
      setError("Failed to connect to Lace wallet. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(undefined);
    localStorage.removeItem("walletAddress");
    console.log("Wallet disconnected");
  };

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-t from-purple-700/50 via-black to-black flex items-center justify-center md:p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-black/80 backdrop-blur-lg border border-purple-700/30 p-6 md:p-8 max-w-md w-full mx-4"
        >
          <div className="text-center space-y-4 md:space-y-6">
            <div className="flex justify-center items-center">
              <div className="p-3 md:p-4 rounded-full bg-purple-700/20 border border-purple-700/30">
                <Wallet2 className="w-10 h-10 md:w-12 md:h-12 text-purple-500" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white px-2 md:px-0">
              Connect Your Wallet
            </h1>
            <p className="text-purple-300/80 mb-6 md:mb-8 text-sm md:text-base">
              Use <strong className="text-purple-500">Lace Wallet</strong> to
              interact with Truth Chain.
            </p>

            {walletAddress ? (
              <div className="space-y-4">
                <div className="bg-purple-900/30 p-4 border border-purple-700/30">
                  <div className="flex items-center justify-center">
                    <Check className="text-green-500 mr-2" size={18} />
                    <span className="text-green-400 font-medium text-sm">
                      Connected
                    </span>
                  </div>
                </div>

                <button
                  onClick={disconnectWallet}
                  className="w-full group bg-red-700/70 hover:bg-red-600 text-white h-10 text-sm px-4 transition-all duration-200"
                >
                  <div className="flex items-center justify-center">
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Disconnect Wallet</span>
                  </div>
                </button>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                disabled={isConnecting}
                className={`w-full group ${
                  isConnecting
                    ? "bg-purple-800"
                    : "bg-purple-700 hover:bg-purple-600"
                } text-white h-12 text-base md:text-lg px-4 md:px-6 transition-all duration-200`}
              >
                <div className="flex items-center justify-between">
                  <Wallet2 className="w-5 h-5 flex-shrink-0" />
                  <span className="tracking-tight text-sm md:text-base mx-2">
                    {isConnecting ? "Connecting..." : "Connect Lace Wallet"}
                  </span>
                  <ChevronRight
                    size={20}
                    className="group-hover:translate-x-2 transition-transform flex-shrink-0"
                  />
                </div>
              </button>
            )}

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <p className="text-xs md:text-sm text-purple-400 lg:text-purple-400/60 mt-4 px-2 md:px-0">
              Don't have Lace?{" "}
              <a
                href="https://www.lace.io"
                target="_blank"
                className="text-purple-500 hover:underline"
              >
                Download here
              </a>
            </p>
          </div>
        </motion.div>
      </div>
      <FooterSmall />
    </div>
  );
}
