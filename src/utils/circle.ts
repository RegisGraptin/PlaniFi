import { arbitrumSepolia, optimismSepolia, sepolia } from "viem/chains";

interface Configuration {
    domainId: number,
    tokenMessagerV2Address: string,
    messageTransmitterV2Address: string,
    tokenMinterV2Address: string,
    messageV2Address: string,
}

const defaultConfiguration = (domainId: number) : Configuration => {
    return {
        domainId: domainId,
        tokenMessagerV2Address: "0x8FE6B999Dc680CcFDD5Bf7EB0974218be2542DAA",
        messageTransmitterV2Address: "0xE737e5cEBEEBa77EFE34D4aa090756590b1CE275",
        tokenMinterV2Address: "0xb43db544E2c27092c107639Ad201b3dEfAbcF192",
        messageV2Address: "0xbaC0179bB358A8936169a63408C8481D582390C4",
    }
}

// Documentation
// https://developers.circle.com/cctp/evm-smart-contracts
export const CCTP_CONFIG: Record<number, Configuration> = {
  [sepolia.id]: defaultConfiguration(0),
  [optimismSepolia.id]: defaultConfiguration(2),
  [arbitrumSepolia.id]: defaultConfiguration(3),
};
