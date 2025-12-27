# TruthChain  
**Decentralized Fact-Checking & Media Archiving dApp**

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Blockchain](https://img.shields.io/badge/Blockchain-Midnight%2BCardano-green)](https://midnight.network/)
[![Storage](https://img.shields.io/badge/Storage-IPFS%2FArweave-orange)](https://ipfs.tech/)
[![AI](https://img.shields.io/badge/AI-Misinformation%20Detection-red)](https://huggingface.co/)

TruthChain is a decentralized platform designed to combat misinformation, media manipulation, and censorship through community-driven fact-checking, immutable media archiving, and AI-powered verification.

---

## Overview

TruthChain combines **blockchain transparency**, **Zero-Knowledge Proofs (ZKPs)** for privacy, and **AI-driven misinformation detection** to create a secure, scalable, and trustless system for verifying public claims and preserving digital content.

---

## Objectives

-  **Decentralize fact-checking** through community voting  
-  **Immutable media archiving** using decentralized storage  
-  **Privacy-preserving verification** with ZKPs  
-  **Secure user identity** via Lace Wallet  
-  **AI-enhanced claim assessment** with a fine-tuned LLM  
-  **Scalable & transparent infrastructure** on Midnight & Cardano

---

## Key Features

### 1. **Fact-Checking Engine**
- Submit claims with evidence
- Anonymous community voting
- ZK-proof validation of votes

### 2. **Media Archiving**
- Immutable storage on IPFS/Arweave
- On-chain metadata & hash records
- Searchable archive explorer

### 3. **Blockchain Integration**
- Smart contracts on **Midnight** (Compact) & **Cardano** (Aiken/Plutus)
- Transparent on-chain records

### 4. **Identity & Security**
- Lace Wallet integration
- Decentralized, abstracted identities

### 5. **AI-Powered Module**
- Dataset from fact-checking events
- Fine-tuned LLM for misinformation detection
- Cloud training (Colab, Kaggle, Modal)
- Continuous model improvement

---

## System Architecture

### **Frontend**
- React + Next.js + TypeScript
- Tailwind CSS
- Claim submission, voting, archive explorer

### **Backend & Blockchain**
- Node.js + Express API
- Smart contracts on Midnight & Cardano
- IPFS/Arweave for media storage

### **Zero-Knowledge Proofs**
- Custom ZK circuits for anonymous voting
- Aggregated proof validation

### **AI Training**
- Cloud GPU training pipelines
- Structured dataset from voting outcomes
- Leaderboard evaluation (e.g., Flock AI Arena)

---

## Workflow

1. **Submission** → User submits claim/media with evidence  
2. **On-Chain Registration** → Metadata stored on blockchain  
3. **Voting & ZK Proofs** → Community validates anonymously  
4. **Archiving** → Verified media stored permanently  
5. **AI Training** → Data aggregated, model fine-tuned, predictions served

---

## Tech Stack

| Layer               | Technologies                          |
|---------------------|---------------------------------------|
| **Framework**        | React, Next.js, TypeScript, Tailwind  |
| **Blockchain**      | Midnight (Compact), Cardano (Aiken)   |
| **Storage**         | IPFS, Arweave                         |
| **Identity**        | Lace Wallet                           |
| **ZK Proofs**       | Custom circuits (e.g., Circom)        |
| **AI/ML**           | PyTorch, Hugging Face, Colab, Kaggle  |
| **Cloud**           | Google Colab, Modal, Kaggle Notebooks |

---

## Getting Started

### Prerequisites
- Node.js >= 18
- Lace Wallet extension
- IPFS/Arweave node (optional for local dev)
- Python 3.10+ (for AI module)

### Installation
```bash
git clone https://github.com/your-org/truthchain.git
cd truthchain
npm install
```

### Run Locally
```bash
# Start
npm run dev

```

---

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## Links

- [Midnight Network](https://midnight.network/)
- [Cardano](https://cardano.org/)
- [Lace Wallet](https://lace.io/)
- [IPFS](https://ipfs.tech/)
- [Arweave](https://arweave.org/)

---

## Contact

For questions or collaborations, open an issue or reach out to the team via GitHub Discussions.
