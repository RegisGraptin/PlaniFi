import { useState } from "react";
import RebalanceModal from "./RebalanceModal";
import { config } from "@/utils/wagmi";
import PopupButton from "../ui/button/PopupButton";

const ActionButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
  >
    Rebalance assets
  </button>
);

export default function RebalanceAction() {
  return (
    <>
      <PopupButton
        ButtonComponent={ActionButton}
        ModalComponent={RebalanceModal}
      />
    </>
  );
}
