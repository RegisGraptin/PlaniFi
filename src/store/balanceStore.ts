import { create } from "zustand";

// USDC balances
type BalanceStore = {
  balances: Record<number, string>;
  setBalance: (chainId: number, balance: string) => void;
};

export const useBalanceStore = create<BalanceStore>((set) => ({
  balances: {},
  setBalance: (chainId, newBalance) => {
    set((state) => {
      return {
        balances: { ...state.balances, [chainId]: newBalance },
      };
    });
  },
}));
