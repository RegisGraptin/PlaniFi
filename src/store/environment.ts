import { create } from "zustand";

type EnvStore = {
  isTestEnv: boolean;
  setIsTestEnv: (v: boolean) => void;
};

export const useEnvStore = create<EnvStore>((set) => ({
  isTestEnv: true, // default to testnet
  setIsTestEnv: (v) => set({ isTestEnv: v }),
}));