import {
  arbitrum,
  arbitrumSepolia,
  mainnet,
  optimism,
  optimismSepolia,
  sepolia,
} from "viem/chains";

interface Configuration {
  domainId: number;
  tokenMessagerV2Address: string;
  messageTransmitterV2Address: string;
  tokenMinterV2Address: string;
  messageV2Address: string;
}

const defaultConfiguration = (domainId: number): Configuration => {
  return process.env.NEXT_PUBLIC_ENV === "test"
    ? {
        // TESTNET
        domainId: domainId,
        tokenMessagerV2Address: "0x8FE6B999Dc680CcFDD5Bf7EB0974218be2542DAA",
        messageTransmitterV2Address:
          "0xE737e5cEBEEBa77EFE34D4aa090756590b1CE275",
        tokenMinterV2Address: "0xb43db544E2c27092c107639Ad201b3dEfAbcF192",
        messageV2Address: "0xbaC0179bB358A8936169a63408C8481D582390C4",
      }
    : {
        // MAINNET
        domainId: domainId,
        tokenMessagerV2Address: "0x28b5a0e9C621a5BadaA536219b3a228C8168cf5d",
        messageTransmitterV2Address:
          "0x81D40F21F12A8F0E3252Bccb954D722d4c464B64",
        tokenMinterV2Address: "0xfd78EE919681417d192449715b2594ab58f5D002",
        messageV2Address: "0xec546b6B005471ECf012e5aF77FBeC07e0FD8f78",
      };
};

// Documentation
// https://developers.circle.com/cctp/evm-smart-contracts
export const CCTP_CONFIG: Record<number, Configuration> = {
  // MAINNET
  [mainnet.id]: defaultConfiguration(0),
  [optimism.id]: defaultConfiguration(2),
  [arbitrum.id]: defaultConfiguration(3),

  // TESTNET
  [sepolia.id]: defaultConfiguration(0),
  [optimismSepolia.id]: defaultConfiguration(2),
  [arbitrumSepolia.id]: defaultConfiguration(3),
};
