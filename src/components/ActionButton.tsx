import type { ButtonHTMLAttributes } from "react";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;

  onClick: () => void;
}

function ActionButton({ label, onClick }: ActionButtonProps) {
  return (
    <button
      className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default ActionButton;
