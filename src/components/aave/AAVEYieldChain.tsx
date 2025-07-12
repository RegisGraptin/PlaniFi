import { useFetchPoolAddress } from "@/hook/aave";
import { POOL_ADDRESS_PROVIDER } from "@/utils/aave";

interface Chain {
    id: number;
    name: string;
}

export default function AAVEYieldChain({ chain }: { chain: Chain }) {
    
    const { data: poolAddress, error,  } = useFetchPoolAddress(chain.id);
    
    console.log("Pool Address for chain", chain.id, ":", poolAddress);
    console.log(error);

    return (
        <>
            <div key={chain.id} className="mb-4">
                <h2 className="text-xl font-bold">{chain.name}</h2>
                <p className="text-gray-500">
                    Pool Address Provider: {POOL_ADDRESS_PROVIDER[chain.id]}
                </p>
            </div>
        </>
    );
}
