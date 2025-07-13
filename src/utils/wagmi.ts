import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import { optimismSepolia, sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: process.env.NEXT_PUBLIC_SITE_NAME!,
  projectId: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID!,
  chains: [
    sepolia,
    optimismSepolia
  ],
  transports: {
    [sepolia.id]: http(
      `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
    ),
    [optimismSepolia.id]: http(
      `https://opt-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
    ),
  },
  ssr: true,
});
