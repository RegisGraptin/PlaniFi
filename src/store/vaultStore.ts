import { create } from "zustand";

export type VaultData = {
  apr: string | null;
  isLoading: boolean;
};

type VaultStore = {
  vaults: Record<number, VaultData>;
  balances: Record<number, string>;  // USDC balances
  bestChainId: number | null;
  setVaultData: (chainId: number, data: VaultData) => void;
  setBalance: (chainId: number, balance: string) => void;
};

export const useVaultStore = create<VaultStore>((set) => ({
  vaults: {},
  balances: {},
  bestChainId: null,
  setVaultData: (chainId, data) => {
    set((state) => {
      let bestChainId = state.bestChainId;
      const newVaults = { ...state.vaults, [chainId]: data };

      // Fetch the best APR when all the vaults are loaded
      if (Object.values(newVaults).every((v) => !v.isLoading)) {
        const best = Object.entries(newVaults).reduce(
          (acc, [id, vault]) => {
            const parsed = parseFloat(vault.apr ?? "");
            if (isNaN(parsed)) return acc;
            return parsed > acc.apr ? { id: Number(id), apr: parsed } : acc;
          },
          { id: null as number | null, apr: -Infinity },
        );
        bestChainId = best.id;
      }

      return {
        ...state,
        vaults: newVaults,
        bestChainId,
      };
    });
  },
  setBalance: (chainId, newBalance) => {
    set((state) => {
      return {
        ...state,
        balances: { ...state.balances, [chainId]: newBalance }
      }
    })
  }
}));
