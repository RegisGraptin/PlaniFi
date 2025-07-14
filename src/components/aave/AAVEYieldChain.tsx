import { useBalanceStore } from "@/store/balanceStore";
import { useVaultStore } from "@/store/vaultStore";

interface Chain {
  id: number;
  name: string;
}

export default function AAVEYieldChain({
  chain,
  isBest,
}: {
  chain: Chain;
  isBest: boolean;
}) {
  const vault = useVaultStore((state) => state.vaults[chain.id]);
  const balance = useBalanceStore((state) => state.balances[chain.id]);

  if (!vault || vault.isLoading) {
    return (
      <div
        key={chain.id}
        className="bg-gray-50 rounded-xl p-5 border border-gray-200 animate-pulse"
      >
        <div className="flex justify-between">
          <div>
            <div className="h-5 bg-gray-300 rounded w-32 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="text-right">
            <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
            <div className="h-6 bg-gray-300 rounded w-20"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 p-5 mb-3 transition-all hover:shadow-md relative ${
        isBest ? "ring-2 ring-green-500 shadow-lg" : ""
      }`}
    >
      {isBest && (
        <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          Best APR
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            {chain.name}
            {isBest && (
              <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                Recommended
              </span>
            )}
          </h2>
          <div className="mt-1 flex items-center">
            <span className="text-sm font-medium text-gray-700">
              {balance ? balance : "0"} USDC
            </span>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">
            APR
          </div>
          <div className="flex items-baseline justify-end gap-2">
            <span className={`text-xl font-bold ${
              vault.apr ? (parseFloat(vault.apr) > 5 ? 'text-green-600' : 'text-blue-600') : 'text-gray-400'
            }`}>
              {vault.apr ? `${vault.apr}%` : "..."}
            </span>
          </div>
        </div>
      </div>

      {/* Status bar at bottom */}
      <div className="mt-4 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${
            vault.apr
              ? parseFloat(vault.apr) > 5
                ? "bg-green-500"
                : "bg-blue-500"
              : "bg-gray-300"
          }`}
          style={{
            width: vault.apr ? `${Math.min(parseFloat(vault.apr) * 10, 100)}%` : "0%",
          }}
        />
      </div>
    </div>
  );
}
