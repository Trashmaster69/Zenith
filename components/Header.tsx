import React from 'react';
import type { View } from '../App';
import { HomeIcon } from './icons/HomeIcon';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { PlusIcon } from './icons/PlusIcon';
import { StoreIcon } from './icons/StoreIcon';
import { UserIcon } from './icons/UserIcon';
import { LogoutIcon } from './icons/LogoutIcon';

interface HeaderProps {
  onAddHabit: () => void;
  onLogout: () => void;
  currentView: View;
  setCurrentView: (view: View) => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddHabit, onLogout, currentView, setCurrentView }) => {
  const NavButton: React.FC<{
    view: View;
    label: string;
    icon: React.ReactNode;
  }> = ({ view, label, icon }) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
        currentView === view
          ? 'bg-primary text-primary-content'
          : 'text-neutral hover:bg-base-300'
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  return (
    <header className="bg-base-100 shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
          <h1 className="text-xl font-bold text-neutral">Zenith</h1>
        </div>
        <nav className="flex items-center gap-2 bg-base-200 p-1 rounded-lg">
          <NavButton view="dashboard" label="Dashboard" icon={<HomeIcon />} />
          <NavButton view="analytics" label="Analytics" icon={<ChartBarIcon />} />
          <NavButton view="store" label="Store" icon={<StoreIcon />} />
          <NavButton view="user" label="User" icon={<UserIcon />} />
        </nav>
        <div className="flex items-center gap-2">
            <button
            onClick={onAddHabit}
            className="flex items-center gap-2 bg-primary text-primary-content font-bold py-2 px-4 rounded-lg hover:bg-primary-focus transition-all shadow-sm"
            >
            <PlusIcon />
            <span className="hidden sm:inline">New Habit</span>
            </button>
             <button
                onClick={onLogout}
                className="flex items-center gap-2 bg-base-300 text-neutral font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-all"
                aria-label="Logout"
                >
                <LogoutIcon />
            </button>
        </div>
      </div>
    </header>
  );
};
