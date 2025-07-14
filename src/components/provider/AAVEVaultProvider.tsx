import { createContext, useContext, ReactNode } from 'react';
import { useConfig } from 'wagmi';
import { ChainVaultProvider } from './ChainVaultProvider';

const AAVEVaultContext = createContext<{ chainIds: number[] } | null>(null);

export const AAVEVaultProvider = ({ children }: { children: ReactNode }) => {
  const { chains } = useConfig();

  return (
    <AAVEVaultContext.Provider value={{ chainIds: chains.map((c) => c.id) }}>
      {chains.map((chain) => (
        <ChainVaultProvider key={chain.id} chainId={chain.id} />
      ))}
      {children}
    </AAVEVaultContext.Provider>
  );
};

export const useAAVEVaultContext = () => {
  const ctx = useContext(AAVEVaultContext);
  if (!ctx) throw new Error('Must use inside AAVEVaultProvider');
  return ctx;
};
