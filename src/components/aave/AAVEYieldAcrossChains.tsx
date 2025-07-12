import { config } from "@/utils/wagmi";
import AAVEYieldChain from "./AAVEYieldChain";

export default function AAVEYieldAcrossChains() {
    return (
        <>
            {config.chains.map((chain) => (
                <AAVEYieldChain key={chain.id} chain={chain} />
            ))}

        </>
    );
}
