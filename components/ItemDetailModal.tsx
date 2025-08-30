
import React from 'react';
import type { StoreItem } from '../types';

interface ItemDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (item: StoreItem) => void;
  item: StoreItem | null;
  coinBalance: number;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  isOpen,
  onClose,
  onPurchase,
  item,
  coinBalance,
}) => {
  if (!isOpen || !item) return null;

  const canAfford = coinBalance >= item.price;

  const handleBuy = () => {
    onPurchase(item);
    onClose();
  };

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity"
        onClick={onClose}
    >
      <div 
        className="bg-base-100 p-8 rounded-2xl shadow-2xl w-full max-w-sm m-4 transform transition-all" 
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-neutral mb-4">{item.name}</h2>
        
        <div className="w-full h-48 bg-base-200 rounded-lg flex items-center justify-center mb-4">
            <span className="text-gray-400">Item Image</span>
        </div>

        <p className="text-gray-600 mb-6">{item.description}</p>
        
        <div className="flex justify-between items-center mb-6">
            <span className="text-xl font-bold text-primary">💰 {item.price} Coins</span>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-lg text-neutral bg-base-300 hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleBuy}
            disabled={!canAfford}
            className="px-6 py-2 rounded-lg bg-primary text-primary-content hover:bg-primary-focus transition-colors font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {canAfford ? 'Buy' : 'Not Enough Coins'}
          </button>
        </div>
      </div>
    </div>
  );
};
