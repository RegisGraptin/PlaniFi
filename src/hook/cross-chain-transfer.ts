import { CCTP_CONFIG } from "@/utils/circle";
import { USDC_TOKEN_ADDRESS } from "@/utils/token";
import { useEffect, useState } from "react";
import { erc20Abi, getAddress, parseUnits, zeroHash } from "viem";
import {
  useAccount,
  useChainId,
  useSwitchChain,
  useTransactionReceipt,
  useWriteContract,
} from "wagmi";

export type TransferStep =
  | "idle"
  | "to-origin-chain"
  | "approving"
  | "burning"
  | "waiting-attestation"
  | "to-target-chain"
  | "minting"
  | "completed"
  | "error";

const MAX_FEE_PARAMETER = BigInt(500);

interface Attestation {
  message: `0x${string}`;
  attestation: `0x${string}`;
}

export function useCrossChainTransfer() {
  const chainId = useChainId();
  const { address: userAddress } = useAccount();
  
  const [state, setState] = useState<TransferStep>("idle");
  const [amount, setAmount] = useState<bigint | null>();
  const [originChainId, setOriginChainId] = useState<number>();
  const [targetChainId, setTargetsChainId] = useState<number>();
  
  const [attestation, setAttestation] = useState<Attestation | null>();

  const { switchChainAsync } = useSwitchChain();
  const { data: approveTxHash, writeContract: writeApprove } = useWriteContract();
  const { data: burnTxHash, writeContract: writeBurn } = useWriteContract();
  const { data: mintTxHash, writeContract: writeMint } = useWriteContract();
  
  const {isSuccess: isApproveSuccess}  = useTransactionReceipt({hash: approveTxHash, chainId: originChainId});
  const {isSuccess: isBurnSuccess}  = useTransactionReceipt({hash: burnTxHash, chainId: originChainId});
  const {isSuccess: isMintSuccess}  = useTransactionReceipt({hash: mintTxHash, chainId: targetChainId});
  

  useEffect(() => {
    if (state === "approving" && isApproveSuccess) {

      console.log("Burn request...");
      setState("burning");

      const originConfig = CCTP_CONFIG[originChainId!];
      const targetConfig = CCTP_CONFIG[targetChainId!];

      console.log("targetChainId:", targetChainId);
      console.log("targetConfig:", targetConfig);
      console.log("CCTP_CONFIG:", CCTP_CONFIG);
      

      // Burn USDC
      writeBurn({
        address: getAddress(originConfig.tokenMessagerV2Address),
        abi: [
          {
            type: "function",
            name: "depositForBurn",
            stateMutability: "nonpayable",
            inputs: [
              { name: "amount", type: "uint256" },
              { name: "destinationDomain", type: "uint32" },
              { name: "mintRecipient", type: "bytes32" },
              { name: "burnToken", type: "address" },
              { name: "destinationCaller", type: "bytes32" },
              { name: "maxFee", type: "uint256" },
              { name: "minFinalityThreshold", type: "uint32" },
            ],
            outputs: [],
          },
        ],
        functionName: "depositForBurn",
        args: [
          amount!,
          targetConfig.domainId,
          `0x000000000000000000000000${userAddress!.slice(2)}`,
          getAddress(USDC_TOKEN_ADDRESS[originChainId!]),
          zeroHash,  // Allow any one to call it
          MAX_FEE_PARAMETER,
          1000, // minFinalityThreshold (1000 or less for Fast Transfer)
        ],
      });
    }
  }, [isApproveSuccess])

  useEffect(() => {
    if (state === "burning" && isBurnSuccess) {
      console.log("Fetch Attestation...");
      setState("waiting-attestation");
      retrieveAttestation();
    }
  }, [isBurnSuccess])

  useEffect(() => {
    if (state === "waiting-attestation" && attestation) {
      console.log("Attestation received:", attestation);
      console.log("Minting tokens...");
      mintOnTargetChain();
    }
  }, [attestation])


  useEffect(() => {
    if (state === "minting" && isMintSuccess) {
      console.log("Done");
      setState("completed");
    }
  }, [isMintSuccess])




  async function mintOnTargetChain() {
    setState("to-target-chain");
    await switchChainAsync({ chainId: targetChainId! });
    await new Promise((resolve) => setTimeout(resolve, 500));

    console.log("Minting tokens on target chain...");
    setState("minting");
    const targetConfig = CCTP_CONFIG[targetChainId!];
    writeMint({
      address: getAddress(targetConfig.messageTransmitterV2Address),
      abi: [
          {
            type: "function",
            name: "receiveMessage",
            stateMutability: "nonpayable",
            inputs: [
              { name: "message", type: "bytes" },
              { name: "attestation", type: "bytes" },
            ],
            outputs: [],
          },
        ],
      functionName: "receiveMessage",
      args: [attestation!.message, attestation!.attestation],
    });

  }

  

  useEffect(() => {
    console.log("State: ", state);
  }, [state]);


  async function retrieveAttestation() {

      console.log("Retrieving attestation...");
      const origin = CCTP_CONFIG[originChainId!].domainId;
      const url = `https://iris-api-sandbox.circle.com/v2/messages/${origin}?transactionHash=${burnTxHash}`;
      while (true) {
        try {
          const response = await fetch(url);
          if (response.status === 404) {
            console.log("Waiting for attestation...");
          }
          const responseData = await response.json();
          if (responseData?.messages?.[0]?.status === "complete") {
            console.log("Attestation retrieved successfully!");
            setAttestation(responseData.messages[0]);
            return responseData.messages[0];
          }
          console.log("Waiting for attestation...");
          await new Promise((resolve) => setTimeout(resolve, 5000));
        } catch (error) {
          if (error instanceof Error) {
            console.error("Error fetching attestation:", error.message);
          } else {
            console.error("Error fetching attestation:", error);
          }
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
      }
    }

  const transfer = async (
    originChainId: number, 
    targetChainId: number, 
    amount: string
  ) => {

    setOriginChainId(originChainId);
    setTargetsChainId(targetChainId);

    const originConfig = CCTP_CONFIG[originChainId];
    const formattedAmount = parseUnits(amount, 6);
    setAmount(formattedAmount);

    if (chainId !== originChainId) {
      console.log("Switch chain...");
      setState("to-origin-chain");
      await switchChainAsync({ chainId: originChainId });

      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    console.log("Approving request...");
    setState("approving");

    writeApprove({
      address: getAddress(USDC_TOKEN_ADDRESS[originChainId]),
      abi: erc20Abi,
      functionName: "approve",
      args: [
        getAddress(originConfig.tokenMessagerV2Address),
        formattedAmount,
      ],
      chainId: originChainId,
    });
  
    
  };

  return {
    transfer,
    state,
  };
}

