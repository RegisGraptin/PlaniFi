import {
  ReserveDataLegacy,
  useFetchPoolAddress,
  usePoolAddress,
} from "@/hook/aave";
import { useEffect, useState } from "react";

interface Chain {
  id: number;
  name: string;
}

export default function AAVEYieldChain({
  chain,
  updateChainAPR,
}: {
  chain: Chain;
  updateChainAPR: (chainId: number, apr: string) => void;
}) {
  const { data: poolAddress } = useFetchPoolAddress(chain.id);
  const { data: poolData } = usePoolAddress(chain.id, poolAddress);
  const [apr, setApr] = useState<string | null>(null);

  useEffect(() => {
    if (poolData) {
      const liquidityRate = (
        poolData as ReserveDataLegacy
      ).currentLiquidityRate.toString();
      const integerPart = liquidityRate.slice(0, liquidityRate.length - 25);
      const decimalPart = liquidityRate.slice(
        liquidityRate.length - 25,
        liquidityRate.length - 23,
      );
      const aprValue = `${integerPart}.${decimalPart}`;
      setApr(aprValue);
      updateChainAPR(chain.id, aprValue);
    }
  }, [poolData]);

  return (
    <div
      key={chain.id}
      className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all hover:shadow-md"
    >
      <div className="p-5">
        <div className="flex justify-between items-start">
          {/* Left Column - Chain & TVL */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {chain.name}
            </h2>
          </div>

          {/* Right Column - APR */}
          <div className="text-right">
            <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">
              APR
            </div>
            <div
              className={`mt-1 text-xl font-bold ${
                apr ? "text-green-600" : "text-gray-400"
              }`}
            >
              {apr ? `${apr}%` : "..."}
            </div>
          </div>
        </div>
      </div>

      {/* Status Indicator Bar */}
      <div
        className={`h-1 w-full ${
          apr
            ? parseFloat(apr) > 5
              ? "bg-green-500"
              : "bg-blue-500"
            : "bg-gray-300"
        }`}
      />
    </div>
  );
}
