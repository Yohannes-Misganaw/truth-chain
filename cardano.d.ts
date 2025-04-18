interface CardanoWallet {
  enable: () => Promise<CardanoAPI>;
  isEnabled: () => Promise<boolean>;
  name: string;
  icon: string;
  apiVersion: string;
}

interface CardanoAPI {
  getNetworkId: () => Promise<number>;
  getUtxos: () => Promise<string[] | null>;
  getBalance: () => Promise<string>;
  getUsedAddresses: () => Promise<string[]>;
  getUnusedAddresses: () => Promise<string[]>;
  getChangeAddress: () => Promise<string>;
  getRewardAddresses: () => Promise<string[]>;
  signTx: (tx: string, partialSign: boolean) => Promise<string>;
  signData: (address: string, payload: string) => Promise<string>;
  submitTx: (tx: string) => Promise<string>;
}

interface Cardano {
  lace?: CardanoWallet;
  nami?: CardanoWallet;
  eternl?: CardanoWallet;
  flint?: CardanoWallet;
}

interface Window {
  cardano?: Cardano;
}
