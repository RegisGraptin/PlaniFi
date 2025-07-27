import {
  arbitrum,
  arbitrumSepolia,
  base,
  baseSepolia,
  gnosis,
  mainnet,
  optimism,
  optimismSepolia,
  scroll,
  scrollSepolia,
  sepolia,
} from "viem/chains";

// https://github.com/bgd-labs/aave-address-book/tree/main/src/ts

export const POOL_ADDRESS_PROVIDER: Record<number, string> = {
  // MAINNET
  [mainnet.id]: "0x2f39d218133AFaB8F2B819B1066c7E434Ad94E9e",
  [optimism.id]: "0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb",
  [arbitrum.id]: "0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb",
  [base.id]: "0xe20fCBdBfFC4Dd138cE8b2E6FBb6CB49777ad64D",
  [gnosis.id]: "0x36616cf17557639614c1cdDb356b1B83fc0B2132",
  [scroll.id]: "0x69850D0B276776781C063771b161bd8894BCdD04",

  // TESTNET
  [sepolia.id]: "0x012bAC54348C0E635dCAc9D5FB99f06F24136C9A",
  [optimismSepolia.id]: "0x36616cf17557639614c1cdDb356b1B83fc0B2132",
  [arbitrumSepolia.id]: "0xB25a5D144626a0D488e52AE717A051a2E9997076",
  [baseSepolia.id]: "0xE4C23309117Aa30342BFaae6c95c6478e0A4Ad00",
  [scrollSepolia.id]: "0x52A27dC690F8652288194Dd2bc523863eBdEa236",
};
