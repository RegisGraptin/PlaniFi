import { config } from "@/utils/wagmi";
import AAVEYieldChain from "./AAVEYieldChain";
import { useState } from "react";
import BestChainYield from "./BestChainYield";

export default function AAVEYieldAcrossChains() {
  const [chainAPR, setChainAPR] = useState<Record<number, string>>({});
  const [bestChainId, setBestChainId] = useState<number | null>(null);

  const updateChainAPR = (chainId: number, apr: string) => {
    console.log(`Updated APR for chain ${chainId}: ${apr}`);

    // Update the APR for the specific chain
    setChainAPR((prev) => {
      const updated = { ...prev, [chainId]: apr };

      // Check if all chain APRs have been fetched
      if (Object.keys(updated).length === config.chains.length) {
        // Find chain with the highest APR
        const best = Object.entries(updated).reduce(
          (acc, [id, aprValue]) => {
            const parsed = parseFloat(aprValue);
            if (isNaN(parsed)) return acc;
            return parsed > acc.apr ? { id: Number(id), apr: parsed } : acc;
          },
          { id: null as number | null, apr: -Infinity },
        );
        setBestChainId(best.id);
      }

      return updated;
    });
  };

  return (
    <>
      <BestChainYield
        chainId={bestChainId}
        apr={(bestChainId && chainAPR[bestChainId]) || "N/A"}
      />

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all hover:shadow-md">
        <h1>Yield Comparison</h1>
        <p>Current AAVE USDC yield accross all chains</p>

        {config.chains.map((chain) => (
          <AAVEYieldChain
            key={chain.id}
            chain={chain}
            updateChainAPR={updateChainAPR}
          />
        ))}
      </div>
    </>
  );
}
