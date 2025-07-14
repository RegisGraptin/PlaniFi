// BestChainYield.tsx
import { useVaultStore } from "@/store/vaultStore";
import { config } from "@/utils/wagmi";

interface BestChainYieldProps {
  chainId: number | null;
  apr: string;
  isLoading?: boolean;
}

export default function BestChainYield({ chainId }: BestChainYieldProps) {
  const chain = chainId ? config.chains.find(c => c.id === chainId) : null;
  const isLoading = chainId === null;

  const vaults = useVaultStore((state) => state.vaults);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <span className="mr-2">🌟</span>
            Top Performing Chain
          </h2>
          <p className="text-gray-600 mt-1">
            The chain currently offering the highest yield for AAVE USDC
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          {isLoading ? (
            <div className="flex items-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mr-4" />
              <div>
                <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                <div className="h-6 bg-gray-300 rounded w-16"></div>
              </div>
            </div>
          ) : chain ? (
            <div className="flex items-center">
              <div className="bg-white p-2 rounded-lg shadow-sm mr-4">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Highest APR</div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-gray-900">{vaults[chainId].apr}%</span>
                  <span className="ml-2 text-sm text-gray-600">on {chain.name}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-gray-500 italic">
              No data available for comparison
            </div>
          )}
        </div>
      </div>
    </div>
  );
}