import { getAddress } from "viem";
import { useReadContract } from "wagmi";

import AAVEPoolAddressProvider from "@/abi/AAVEPoolAddressProvider.json";
import { POOL_ADDRESS_PROVIDER } from "@/utils/aave";

export function useFetchPoolAddress(chainId: number) {
  const contractAddress = POOL_ADDRESS_PROVIDER[chainId];

  return useReadContract({
    address: getAddress(contractAddress),
    abi: AAVEPoolAddressProvider,
    functionName: "getPool",
    chainId,
  });
}
