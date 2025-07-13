import { arbitrumSepolia, optimismSepolia, sepolia } from "viem/chains";

// https://github.com/bgd-labs/aave-address-book/tree/main/src/ts

export const POOL_ADDRESS_PROVIDER: Record<number, string> = {
  [sepolia.id]: "0x012bAC54348C0E635dCAc9D5FB99f06F24136C9A",
  [optimismSepolia.id]: "0x36616cf17557639614c1cdDb356b1B83fc0B2132",
  [arbitrumSepolia.id]: "0xB25a5D144626a0D488e52AE717A051a2E9997076",
};
