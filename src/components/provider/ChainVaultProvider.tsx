import {
  ReserveDataLegacy,
  useFetchPoolAddress,
  usePoolAddress,
} from "@/hook/aave";
import { useUSDCBalance } from "@/hook/token";
import { useBalanceStore } from "@/store/balanceStore";
import { useVaultStore, VaultData } from "@/store/vaultStore";
import {
  createContext,
  useContext,
  useEffect,
} from "react";
import { useAccount } from "wagmi";

const ChainVaultContext = createContext<VaultData | null>(null);

export const ChainVaultProvider = ({ chainId }: { chainId: number }) => {
  const { address } = useAccount();

  const { formattedAmount } = useUSDCBalance(chainId, address);
  const { data: poolAddress } = useFetchPoolAddress(chainId);
  const { data: poolData } = usePoolAddress(chainId, poolAddress);

  const setVaultData = useVaultStore((state) => state.setVaultData);
  const setBalance = useBalanceStore((state) => state.setBalance);

  useEffect(() => {
    if (poolData) {
      const rate = (
        poolData as ReserveDataLegacy
      ).currentLiquidityRate.toString();
      const int = rate.slice(0, rate.length - 25);
      const dec = rate.slice(rate.length - 25, rate.length - 23);

      const vault: VaultData = { apr: `${int}.${dec}`, isLoading: false };
      setVaultData(chainId, vault);
    }
  }, [poolData]);

  useEffect(() => {
    if (formattedAmount) {
      setBalance(chainId, formattedAmount);
    }
  }, [formattedAmount])

  return null;
};

export const useChainVault = () => {
  const ctx = useContext(ChainVaultContext);
  if (ctx === null)
    throw new Error("useChainVault must be used inside ChainVaultProvider");
  return ctx;
};
