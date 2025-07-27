import { arbitrum, arbitrumSepolia, base, baseSepolia, gnosis, mainnet, optimism, optimismSepolia, scroll, scrollSepolia, sepolia } from "viem/chains";

export const USDC_DECIMALS = 6;

export const USDC_TOKEN_ADDRESS: Record<number, string> = {

  // MAINNET
  [mainnet.id]: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  [optimism.id]: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
  [arbitrum.id]: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
  [base.id]: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
  [gnosis.id]: "0x2a22f9c3b484c3629090feed35f17ff8f88f76f0",  // Bridged USDC.e
  [scroll.id]: "0x06efdbff2a14a7c8e15944d1f4a48f9f95f663a4",

  // TESTNET
  [sepolia.id]: "0x94a9d9ac8a22534e3faca9f4e7f2e2cf85d5e4c8",  // FIXME: Not Circle address
  [optimismSepolia.id]: "0x5fd84259d66cd46123540766be93dfe6d43130d7",
  [arbitrumSepolia.id]: "0x75faf114eafb1bdbe2f0316df893fd58ce46aa4d",
  [baseSepolia.id]: "0xba50cd2a20f6da35d788639e581bca8d0b5d4d5f",
  [scrollSepolia.id]: "0x2c9678042d52b97d27f2bd2947f7111d93f3dd0d",
};
