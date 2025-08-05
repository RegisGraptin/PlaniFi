import { config } from "@/utils/wagmi";
import AAVEYieldChain from "./AAVEYieldChain";
import BestChainYield from "./BestChainYield";

import { useVaultStore } from "@/store/vaultStore";
import { RebalanceSoonAction } from "../action/RebalanceAction";

export default function AAVEYieldAcrossChains() {
  const bestChainId = useVaultStore((state) => state.bestChainId);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          AAVE USDC Yield Comparison
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Real-time yield comparison across multiple chains. Track the best
          opportunities to maximize your returns.
        </p>
      </div>

      {/* Best Chain Banner */}
      <div className="mb-8">
        <BestChainYield chainId={bestChainId} />
      </div>

      <div className="mb-8 flex justify-center">
        <RebalanceSoonAction />
      </div>


      {/* Chain Comparison Grid */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Chain Performance
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Current AAVE USDC yield across all supported chains
          </p>
        </div>

        <div className="p-6">
          {config.chains.map((chain) => (
            <AAVEYieldChain
              key={chain.id}
              chain={chain}
              isBest={chain.id === bestChainId}
            />
          ))}
        </div>
      </div>

      {/* Info Footer */}
      <div className="mt-6 text-center text-gray-500 text-sm">
        <p>Data updates in real-time. Last refreshed: Just now</p>
        <p className="mt-1">Rates may vary based on network conditions</p>
      </div>
    </div>
  );
}
