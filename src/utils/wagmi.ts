import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import {
  arbitrum,
  arbitrumSepolia,
  mainnet,
  optimism,
  optimismSepolia,
  sepolia,
} from "wagmi/chains";

const isTestEnv = process.env.NEXT_PUBLIC_ENV === "test";

const chains = isTestEnv
  ? ([sepolia, optimismSepolia, arbitrumSepolia] as const)
  : ([mainnet, optimism, arbitrum] as const);

const transports = Object.fromEntries(
  chains.map((chain) => {
    let url = "";
    switch (chain.id) {
      case sepolia.id:
        url = `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`;
        break;
      case optimismSepolia.id:
        url = `https://opt-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`;
        break;
      case arbitrumSepolia.id:
        url = `https://arb-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`;
        break;
      case mainnet.id:
        url = `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`;
        break;
      case optimism.id:
        url = `https://opt-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`;
        break;
      case arbitrum.id:
        url = `https://arb-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`;
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
