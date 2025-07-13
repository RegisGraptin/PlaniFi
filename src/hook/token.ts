import { USDC_DECIMALS, USDC_TOKEN_ADDRESS } from "@/utils/token";
import { Address, erc20Abi, formatUnits, getAddress } from "viem";
import { useReadContract } from "wagmi";

export function useUSDCBalance(
  chainId: number,
  userAddress: Address | undefined
) {
  const result = useReadContract({
    address: getAddress(USDC_TOKEN_ADDRESS[chainId]),
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [userAddress!],
    chainId: chainId,
    query: {
      enabled: !!userAddress,
    }
  });

  const raw = result.data as bigint | undefined
  const formattedAmount = raw ? formatUnits(raw, USDC_DECIMALS) : undefined

  return {
     ...result,
    formattedAmount,
  }
}
