import { getAddress } from "viem";
import { useReadContract } from "wagmi";

import AAVEPoolAddressProvider from "@/abi/AAVEPoolAddressProvider.json";
import AAVEPool from "@/abi/AAVEPool.json";

import { POOL_ADDRESS_PROVIDER } from "@/utils/aave";
import { USDC_TOKEN_ADDRESS } from "@/utils/token";

// FIXME: Put everything in a typing file

interface ReserveConfigurationMap {
  data: bigint; // uint256
}

export interface ReserveDataLegacy {
  configuration: ReserveConfigurationMap;
  liquidityIndex: bigint; // uint128
  currentLiquidityRate: bigint; // uint128
  variableBorrowIndex: bigint; // uint128
  currentVariableBorrowRate: bigint; // uint128
  currentStableBorrowRate: bigint; // uint128
  lastUpdateTimestamp: number; // uint40
  id: number; // uint16
  aTokenAddress: string;
  stableDebtTokenAddress: string;
  variableDebtTokenAddress: string;
  interestRateStrategyAddress: string;
  accruedToTreasury: bigint; // uint128
  unbacked: bigint; // uint128
  isolationModeTotalDebt: bigint; // uint128
}

export function useFetchPoolAddress(chainId: number) {
  const contractAddress = POOL_ADDRESS_PROVIDER[chainId];

  return useReadContract({
    address: getAddress(contractAddress),
    abi: AAVEPoolAddressProvider,
    functionName: "getPool",
    chainId,
  });
}

export function usePoolAddress(
  chainId: number,
  poolAddress: string | undefined | unknown,
) {
  return useReadContract({
    address: poolAddress ? getAddress(poolAddress as string) : undefined,
    abi: AAVEPool,
    functionName: "getReserveData",
    args: [USDC_TOKEN_ADDRESS[chainId]],
    chainId,
    query: {
      enabled: !!poolAddress, // Only enable when address exists
    },
  });
}
