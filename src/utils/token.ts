import { arbitrumSepolia, optimismSepolia, sepolia } from "viem/chains";

export const USDC_DECIMALS = 6;

export const USDC_TOKEN_ADDRESS: Record<number, string> = {
  [sepolia.id]: "0x94a9d9ac8a22534e3faca9f4e7f2e2cf85d5e4c8",  // FIXME: Not Circle address
  [optimismSepolia.id]: "0x5fd84259d66cd46123540766be93dfe6d43130d7",
  [arbitrumSepolia.id]: "0x75faf114eafb1bdbe2f0316df893fd58ce46aa4d",
};
