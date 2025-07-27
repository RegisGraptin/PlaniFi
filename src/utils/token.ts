import { arbitrum, arbitrumSepolia, mainnet, optimism, optimismSepolia, sepolia } from "viem/chains";

export const USDC_DECIMALS = 6;

export const USDC_TOKEN_ADDRESS: Record<number, string> = {

  // MAINNET
  [mainnet.id]: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  [optimism.id]: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
  [arbitrum.id]: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",

  // TESTNET
  [sepolia.id]: "0x94a9d9ac8a22534e3faca9f4e7f2e2cf85d5e4c8",  // FIXME: Not Circle address
  [optimismSepolia.id]: "0x5fd84259d66cd46123540766be93dfe6d43130d7",
  [arbitrumSepolia.id]: "0x75faf114eafb1bdbe2f0316df893fd58ce46aa4d",
};
