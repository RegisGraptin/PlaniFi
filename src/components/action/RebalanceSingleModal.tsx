import { useBalanceStore } from "@/store/balanceStore";
import { useVaultStore } from "@/store/vaultStore";
import { normalizeString } from "@/utils/string";
import { config } from "@/utils/wagmi";
import Image from "next/image";
import { useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import { FiX, FiArrowRight, FiInfo } from "react-icons/fi";
import { Chain } from "viem";
import Select, { GroupBase, StylesConfig } from "react-select";
import { useCrossChainTransfer } from "@/hook/cross-chain-transfer";

interface RebalanceSingleModalProps {
  fromChain: Chain;
  onClose: () => void;
  onFormInteract: () => void;
}

type ChainOption = {
  value: string;
  label: string;
};

const chainSelectStyles: StylesConfig<ChainOption> = {
  control: (provided) => ({
    ...provided,
    minHeight: "44px",
    borderRadius: "8px",
    borderColor: "#d1d5db",
    "&:hover": {
      borderColor: "#9ca3af",
    },
    paddingLeft: "8px",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#6366f1" : "white",
    color: state.isSelected ? "white" : "#1f2937",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  }),
  singleValue: (provided) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    gap: "8px",
  }),
};

const RebalanceSingleModal = ({
  fromChain,
  onClose,
  onFormInteract,
}: RebalanceSingleModalProps) => {
  const bestChainId = useVaultStore((state) => state.bestChainId);
  const balances = useBalanceStore((state) => state.balances);

  const [amount, setAmount] = useState<string>("");
  const [toChainId, setToChainId] = useState<number>(bestChainId!);
  const [isSubmitting, setIsSubmitting] = useState(false); // FIXME: What is the case for that
  const [isLocked, setIsLocked] = useState(false);

  const { transfer, state } = useCrossChainTransfer();

  // Defined list of chains
  const options = config.chains
    .filter((chain) => chain.id !== fromChain.id)
    .map((chain) => ({
      label: chain.name,
      value: "" + chain.id,
    }));

  const maxBalance = balances[fromChain.id] || "0";

  const handleSubmit = async () => {
    // Check the amount is valid
    if (Number(amount) === 0) {
      return;
    }

    setIsSubmitting(true);
    setIsLocked(true);
    onFormInteract();  // Disable backdrop close

    // TODO: Implement rebalance logic
    console.log(
      `Rebalancing ${amount || maxBalance} USDC from ${fromChain.id} to ${toChainId}`,
    );
    transfer(fromChain.id, toChainId, amount);
  };

  const formatOptionLabel = ({ value, label }: ChainOption) => {
    return (
      <>
        <div className="flex items-center gap-2">
          <Image
            src={`/chains/${normalizeString(label)}.svg`}
            alt={`${label} icon`}
            width={24}
            height={24}
            className="w-6 h-6 object-contain"
            loading="lazy"
          />
          <span>{label}</span>
        </div>
      </>
    );
  };

  return (
    <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <FaExchangeAlt className="text-blue-500" />
          Rebalance USDC
        </h2>
        <button className="text-gray-400 hover:text-gray-600">
          <FiX size={20} onClick={onClose} />
        </button>
      </div>

      {/* Body */}
      <div className="space-y-4 p-4">
        {/* From Chain (fixed) */}
        <div>
          <label className="mb-1 flex items-center gap-1 text-sm font-medium">
            From Chain
          </label>
          <div className="flex items-center gap-2 rounded-md border p-3">
            <Image
              src={`/chains/${normalizeString(fromChain.name)}.svg`}
              alt={`${fromChain.name} icon`}
              width={24}
              height={24}
              className="h-6 w-6"
              loading="lazy"
            />
            <span>{fromChain?.name}</span>
            <div className="ml-auto text-sm text-gray-500">
              Balance: {maxBalance} USDC
            </div>
          </div>
        </div>

        {/* Amount */}
        <div>
          <label className="mb-1 block text-sm font-medium">Amount</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={maxBalance}
              className="flex-1 rounded-md border px-3 py-2"
              step="0.01"
              min="0"
              max={maxBalance}
              disabled={isLocked}
            />
            <button
              onClick={() => setAmount(maxBalance)}
              disabled={isLocked}
              className="rounded-md bg-gray-100 px-3 py-2 text-sm hover:bg-gray-200"
            >
              Max
            </button>
          </div>
        </div>

        {/* To Chain (selectable) */}
        <div>
          <label className="mb-1 flex items-center gap-1 text-sm font-medium">
            To Chain
            <FiInfo
              className="text-gray-400"
              title="Best yield chain is pre-selected"
            />
          </label>
          <Select
            value={options.find(
              (c) => toChainId && c.value === toChainId.toString(),
            )}
            onChange={(option) => option && setToChainId(Number(option.value))}
            options={options}
            styles={chainSelectStyles}
            formatOptionLabel={formatOptionLabel}
            isDisabled={isLocked}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-2 border-t p-4">
        {state === "idle" && (
          <>
            <button
              onClick={onClose}
              className="rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !toChainId}
              className="flex items-center gap-1 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? (
                "Processing..."
              ) : (
                <>
                  Rebalance <FiArrowRight />
                </>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default RebalanceSingleModal;
