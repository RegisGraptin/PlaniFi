import { ReserveDataLegacy, useFetchPoolAddress, usePoolAddress } from "@/hook/aave";
import { POOL_ADDRESS_PROVIDER } from "@/utils/aave";
import { useEffect, useState } from "react";

interface Chain {
    id: number;
    name: string;
}

export default function AAVEYieldChain({ chain }: { chain: Chain }) {
    
    const { data: poolAddress } = useFetchPoolAddress(chain.id);
    const { data: poolData } = usePoolAddress(chain.id, poolAddress);

    const [apr, setApr] = useState<string>("");

    useEffect(() => {
        if (poolData) {
            // Compute APY from poolData
            const liquidityRate = (poolData as ReserveDataLegacy).currentLiquidityRate.toString();

            // Compute the APR from the liquidity rate
            const integerPart = liquidityRate.slice(0, liquidityRate.length - 25);
            const decimalPart = liquidityRate.slice(liquidityRate.length - 25, liquidityRate.length - 23);
            const computedApr = `${integerPart}.${decimalPart}`;
            setApr(computedApr);            
        }
    }, [poolData]);


    return (
        <>
            <div key={chain.id} className="mb-4">
                <h2 className="text-xl font-bold">{chain.name}</h2>
                <p className="text-gray-500">
                    Pool Address Provider: {POOL_ADDRESS_PROVIDER[chain.id]}
                </p>
                <p>
                    {apr !== undefined ? `APR: ${apr}%` : "Loading APR..."}
                </p>
            </div>
        </>
    );
}
