import RebalanceModal from "./RebalanceModal";
import PopupButton from "../ui/button/PopupButton";

const ActionButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    disabled={true}
    className="px-6 py-3 bg-gray-300 text-gray-500 rounded-lg font-medium 
             cursor-not-allowed relative overflow-hidden transition-all
             flex items-center justify-center gap-2
             group"
  >
    <span>Rebalance all assets</span>
    <span className="text-xs bg-gray-400 text-white px-2 py-1 rounded-full">
      Coming soon
    </span>
    <span
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                  opacity-0 group-hover:opacity-30 transition-opacity"
    ></span>
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
