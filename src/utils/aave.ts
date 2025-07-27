import { arbitrum, arbitrumSepolia, mainnet, optimism, optimismSepolia, sepolia } from "viem/chains";

// https://github.com/bgd-labs/aave-address-book/tree/main/src/ts

export const POOL_ADDRESS_PROVIDER: Record<number, string> = {

  // MAINNET
  [mainnet.id]: "0x2f39d218133AFaB8F2B819B1066c7E434Ad94E9e",
  [optimism.id]: "0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb",
  [arbitrum.id]: "0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb",

  // TESTNET
  [sepolia.id]: "0x012bAC54348C0E635dCAc9D5FB99f06F24136C9A",
  [optimismSepolia.id]: "0x36616cf17557639614c1cdDb356b1B83fc0B2132",
  [arbitrumSepolia.id]: "0xB25a5D144626a0D488e52AE717A051a2E9997076",
};
