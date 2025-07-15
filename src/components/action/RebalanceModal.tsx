import { useBalanceStore } from "@/store/balanceStore";
import { config } from "@/utils/wagmi";
import React, { useState, useEffect } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { FiX, FiArrowRight, FiInfo } from "react-icons/fi";
import { HiChevronUpDown } from "react-icons/hi2";
import Select from "react-select";
import { Chain } from "viem";

interface RebalanceModalProps {
  onClose: () => void;
}


export type OptionType = {
  value: string;
  label: string;
  icon?: JSX.Element;
};


const RebalanceModal: React.FC<RebalanceModalProps> = ({ onClose }) => {
  const balances = useBalanceStore((state) => state.balances);

  const [selectedFromChains, setSelectedFromChains] = useState<number[]>([]);

   const customStyles: StylesConfig<OptionType, true, GroupBase<OptionType>> = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "44px",
      borderRadius: "8px",
      borderColor: state.isFocused ? "#6366f1" : "#d1d5db",
      boxShadow: state.isFocused ? "0 0 0 1px #6366f1" : "none",
      "&:hover": {
        borderColor: state.isFocused ? "#6366f1" : "#9ca3af",
      },
      paddingLeft: "4px",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#e0e7ff",
      borderRadius: "6px",
      padding: "2px 6px",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#4f46e5",
      fontWeight: "500",
      fontSize: "14px",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#4f46e5",
      ":hover": {
        backgroundColor: "transparent",
        color: "#4338ca",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#6366f1"
        : state.isFocused
        ? "#e0e7ff"
        : "white",
      color: state.isSelected ? "white" : "#1f2937",
      ":active": {
        backgroundColor: state.isSelected ? "#6366f1" : "#e0e7ff",
      },
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "8px",
      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    }),
  };

  // Custom components
  const customComponents = {
    DropdownIndicator: (props: any) => (
      <HiChevronUpDown
        className="h-5 w-5 text-gray-400"
        aria-hidden="true"
        {...props.innerProps}
      />
    ),
    MultiValueRemove: (props: any) => (
      <FaXmark
        className="h-4 w-4 ml-1 hover:text-indigo-700"
        {...props.innerProps}
      />
    ),
    Option: ({ children, ...props }: any) => (
      <div
        {...props.innerProps}
        className={`flex items-center px-3 py-2 cursor-pointer ${props.isSelected ? "bg-indigo-500 text-white" : props.isFocused ? "bg-indigo-50" : ""}`}
      >
        {props.data.icon && (
          <span className="mr-2 flex-shrink-0">{props.data.icon}</span>
        )}
        <input
          type="checkbox"
          checked={props.isSelected}
          readOnly
          className="mr-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        {children}
      </div>
    ),
    MultiValueLabel: ({ children, ...props }: any) => (
      <div {...props.innerProps} className="flex items-center">
        {props.data.icon && (
          <span className="mr-1 flex-shrink-0">{props.data.icon}</span>
        )}
        {children}
      </div>
    ),
  };


  // const [selectedToChain, setSelectedToChain] = useState<string>('');
  // const [amounts, setAmounts] = useState<Record<string, number>>({});
  // const [isRebalancing, setIsRebalancing] = useState(false);

  // // Reset form when modal closes
  // useEffect(() => {
  //   if (!isOpen) {
  //     setSelectedFromChains([]);
  //     setSelectedToChain('');
  //     setAmounts({});
  //   }
  // }, [isOpen]);

  // // Auto-select the chain with the best yield
  // useEffect(() => {
  //   if (isOpen && chains.length > 0 && !selectedToChain) {
  //     const bestYieldChain = Object.entries(yieldData).reduce(
  //       (best, [chainId, data]) =>
  //         (!best || data.apy > yieldData[best].apy) ? chainId : best,
  //       ''
  //     );
  //     if (bestYieldChain) {
  //       setSelectedToChain(bestYieldChain);
  //     }
  //   }
  // }, [isOpen, chains, yieldData, selectedToChain]);

  // const toggleFromChain = (chainId: string) => {
  //   setSelectedFromChains(prev =>
  //     prev.includes(chainId)
  //       ? prev.filter(id => id !== chainId)
  //       : [...prev, chainId]
  //   );
  // };

  // const handleAmountChange = (chainId: string, value: string) => {
  //   const numValue = parseFloat(value) || 0;
  //   const maxAmount = currentBalances[chainId] || 0;
  //   setAmounts(prev => ({
  //     ...prev,
  //     [chainId]: Math.min(numValue, maxAmount),
  //   }));
  // };

  // const calculateTotalYield = () => {
  //   if (!selectedToChain) return 0;

  //   return selectedFromChains.reduce((total, chainId) => {
  //     const amount = amounts[chainId] || 0;
  //     const toYield = yieldData[selectedToChain]?.apy || 0;
  //     const fromYield = yieldData[chainId]?.apy || 0;
  //     return total + (amount * (toYield - fromYield) / 100);
  //   }, 0);
  // };

  // const handleMaxAmount = (chainId: string) => {
  //   setAmounts(prev => ({
  //     ...prev,
  //     [chainId]: currentBalances[chainId] || 0,
  //   }));
  // };

  // const handleSubmit = async () => {
  //   setIsRebalancing(true);
  //   try {
  //     await onRebalance(selectedFromChains, selectedToChain, amounts);
  //     onClose();
  //   } finally {
  //     setIsRebalancing(false);
  //   }
  // };

  const [selectedChains, setSelectedChains] = useState(null);

  const handleChange = (value) => {
    console.log("value:", value);
    setSelectedChains(value);
  };

  const options = config.chains.map((chain) => ({
    value: "" + chain.id,
    label: chain.name,
  }));

  return (
    <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
      {/* Modal Header */}
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="flex items-center text-xl font-semibold">
          <span className="pr-3">
            <FaExchangeAlt />
          </span>
          Rebalance USDC
        </h2>
        <button
          onClick={onClose}
          className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        >
          <FiX size={20} />
        </button>
      </div>

      {/* Modal Body */}
      <div className="space-y-6 p-4">
        {/* From Chains Section */}
        <div>
          <h3 className="mb-2 flex items-center gap-1 font-medium">
            From chain
            <span
              className="text-gray-400"
              title="Select one or multiple chains to rebalance from"
            >
              <FiInfo size={16} />
            </span>
          </h3>
          <div className="space-y-2">
            <Select
              value={selectedChains}
              onChange={handleChange}
              isMulti={true}
              options={options}
              
              
              placeholder={"Choose chains..."}
              styles={customStyles}
              components={customComponents}
              isSearchable={true}
              className={`text-sm `}
              classNamePrefix="select"
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              noOptionsMessage={() => "No options found"}
            />

            {config.chains.map((chain) => (
              <div key={chain.id} className="rounded-lg border p-3">
                <label className="flex cursor-pointer items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      // checked={selectedFromChains.includes(chain.id)}
                      // onChange={() => toggleFromChain(chain.id)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex items-center gap-2">
                      {/* {chain.icon} */}
                      <span>{chain.name}</span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    Balance: {balances[chain.id] || 0} USDC
                  </span>
                </label>

                {selectedFromChains.includes(chain.id) && (
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="number"
                      // value={amounts[chain.id] || ''}
                      // onChange={(e) => handleAmountChange(chain.id, e.target.value)}
                      placeholder="0.00"
                      className="flex-1 rounded-md border px-3 py-2"
                      step="0.01"
                      min="0"
                      // max={currentBalances[chain.id] || 0}
                    />
                    <button
                      // onClick={() => handleMaxAmount(chain.id)}
                      className="rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-600 hover:bg-gray-200"
                    >
                      Max
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* To Chain Section */}
        <div>
          <h3 className="mb-2 flex items-center gap-1 font-medium">
            To chain
            <span
              className="text-gray-400"
              title="Chain with the best yield is auto-selected"
            >
              <FiInfo size={16} />
            </span>
          </h3>
          <div className="space-y-2">
            {/* {chains.map(chain => (
                <label
                  key={chain.id}
                  className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 ${
                    selectedToChain === chain.id ? 'border-blue-500 bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="toChain"
                      checked={selectedToChain === chain.id}
                      onChange={() => setSelectedToChain(chain.id)}
                      className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex items-center gap-2">
                      {chain.icon}
                      <span>{chain.name}</span>
                    </div>
                  </div>
                  <span className="font-medium text-green-600">
                    {yieldData[chain.id]?.apy?.toFixed(2)}% APY
                  </span>
                </label>
              ))} */}
          </div>
        </div>

        {/* Yield Summary */}
        <div className="rounded-lg bg-blue-50 p-3">
          <h3 className="mb-1 font-medium text-blue-800">Projected Yield</h3>
          <p className="text-sm text-blue-700">
            Estimated additional annual yield:{" "}
            {/* <span className="font-semibold">${calculateTotalYield().toFixed(2)}</span> */}
          </p>
        </div>
      </div>

      {/* Modal Footer */}
      {/* <div className="flex justify-end gap-3 border-t p-4">
          <button
            onClick={onClose}
            disabled={isRebalancing}
            className="rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={selectedFromChains.length === 0 || !selectedToChain || isRebalancing}
            className="flex items-center gap-1 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isRebalancing ? (
              'Processing...'
            ) : (
              <>
                Rebalance Now <FiArrowRight size={16} />
              </>
            )}
          </button>
        </div> */}
    </div>
  );
};

export default RebalanceModal;
