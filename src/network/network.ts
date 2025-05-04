import {
  Chain
} from "viem/chains";
import * as chains from "viem/chains";

/**
 * Pharos Chain Configuration
 */
export const pharosDevnet = {
  id: 50002,
  name: 'Pharos Devnet',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://devnet.dplabs-internal.com'],
    },
    public: {
      http: ['https://devnet.dplabs-internal.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'PharosExplorer',
      url: 'https://pharosscan.xyz/',
      apiUrl: '',
    },
  },
} as const satisfies Chain;

export const CHAIN_ID_TO_NETWORK_ID: Record<number, string> = {
  50002: "pharos-devnet",
};

export const NETWORK_ID_TO_CHAIN_ID: Record<string, string> = Object.entries(
  CHAIN_ID_TO_NETWORK_ID,
).reduce(
  (acc, [chainId, networkId]) => {
    acc[networkId] = String(chainId);
    return acc;
  },
  {} as Record<string, string>,
);

export const NETWORK_ID_TO_VIEM_CHAIN: Record<string, Chain> = {
  "pharos-devnet": pharosDevnet,
};

/**
 * Get a chain from the viem chains object or custom chains
 *
 * @param id - The chain ID
 * @returns The chain
 */
export const getChain = (id: string): Chain => {
  // Check custom chains first
  if (id === String(pharosDevnet.id)) {
    return pharosDevnet;
  }
  
  // Then check viem chains
  const chainList = Object.values(chains);
  return chainList.find((chain) => chain.id === parseInt(id)) as Chain;
};
