import { useState } from "react";
import RebalanceModal from "./RebalanceModal";
import { config } from "@/utils/wagmi";

export default function RebalanceAction() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Rebalance assets
      </button>

      <RebalanceModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
