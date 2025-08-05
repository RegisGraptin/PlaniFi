import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
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
} from "wagmi/chains";

const isTestEnv = process.env.NEXT_PUBLIC_ENV === "test";

// TODO: Remove sepolia as USDC on AAVE does not match the one from circle
const chains = isTestEnv
  ? ([optimismSepolia, arbitrumSepolia, baseSepolia, scrollSepolia] as const)
  : ([mainnet, optimism, arbitrum, base, gnosis, scroll] as const);

const transports = Object.fromEntries(
  chains.map((chain) => {
    let url = "";
    switch (chain.id) {
      // TESTNET
      // case sepolia.id:
      //   url = `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`;
      //   break;
      case optimismSepolia.id:
        url = `https://opt-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`;
        break;
      case arbitrumSepolia.id:
        url = `https://arb-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`;
        break;
      case baseSepolia.id:
        url = `https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`;
        break;
      case scrollSepolia.id:
        url = `https://scroll-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`;
        break;
      // MAINNET
      case mainnet.id:
        url = `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`;
        break;
      case optimism.id:
        url = `https://opt-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`;
        break;
      case arbitrum.id:
        url = `https://arb-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`;
        break;
      case base.id:
        url = `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`;
        break;
      case gnosis.id:
        url = `https://gnosis-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`;
        break;
      case scroll.id:
        url = `https://scroll-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`;
        break;
      default:
        url = "";
    }
    return [chain.id, http(url)];
  }),
);

export const config = getDefaultConfig({
  appName: process.env.NEXT_PUBLIC_SITE_NAME!,
  projectId: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID!,
  chains: chains,
  transports: transports,
  ssr: true,
});
