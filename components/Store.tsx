
import React, { useState } from 'react';
import type { StoreItem } from '../types';
import { STORE_ITEMS } from '../constants';
import { ItemDetailModal } from './ItemDetailModal';

interface StoreProps {
  coinBalance: number;
  inventory: string[];
  onPurchase: (item: StoreItem) => boolean;
}

const StoreItemCard: React.FC<{
  item: StoreItem;
  isOwned: boolean;
  onClick: () => void;
}> = ({ item, isOwned, onClick }) => (
  <div 
    className={`bg-base-100 p-4 rounded-xl shadow-sm transition-all hover:shadow-md cursor-pointer ${isOwned ? 'opacity-50' : ''}`}
    onClick={!isOwned ? onClick : undefined}
    aria-label={`Purchase ${item.name}`}
    role="button"
  >
    <div className="w-full h-32 bg-base-200 rounded-lg mb-4 flex items-center justify-center">
      <span className="text-gray-400 text-sm">Item Image</span>
    </div>
    <div className="flex justify-between items-center">
      <h4 className="font-semibold text-neutral">{item.name}</h4>
      <span className="font-bold text-primary">💰 {item.price}</span>
    </div>
    {isOwned && <div className="text-center text-sm font-semibold text-green-600 mt-2">Owned</div>}
  </div>
);


export const Store: React.FC<StoreProps> = ({ coinBalance, inventory, onPurchase }) => {
  const [selectedItem, setSelectedItem] = useState<StoreItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleItemClick = (item: StoreItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex justify-between items-center bg-base-100 p-4 rounded-xl shadow-sm">
        <h2 className="text-3xl font-bold text-neutral">Item Store</h2>
        <div className="text-2xl font-bold bg-amber-100 text-amber-600 px-4 py-2 rounded-lg">
          💰 {coinBalance} Coins
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {STORE_ITEMS.map(item => (
          <StoreItemCard 
            key={item.id}
            item={item}
            isOwned={inventory.includes(item.id)}
            onClick={() => handleItemClick(item)}
          />
        ))}
      </div>
      
      <ItemDetailModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onPurchase={onPurchase}
        item={selectedItem}
        coinBalance={coinBalance}
      />
    </div>
  );
};
