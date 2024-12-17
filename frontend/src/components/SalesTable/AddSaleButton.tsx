import React from 'react';
import { PlusCircle } from 'lucide-react';

interface AddSaleButtonProps {
  onClick: () => void;
}

export function AddSaleButton({ onClick }: AddSaleButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-5 left-1/2 transform -translate-x-1/2 flex items-center gap-2 px-5 py-5 bg-white text-black rounded-[35px] hover:bg-gray-200 transition-colors text-lg font-medium shadow-lg"
    >
      <PlusCircle size={32} />
    </button>
  );
}
