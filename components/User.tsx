import React from 'react';
import type { UserStats } from '../types';

const BrainIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.871 14.756c2.36-1.037 3.44-3.693 3.44-5.834 0-2.4-1.928-4.352-4.311-4.352-2.384 0-4.311 1.952-4.311 4.352 0 2.14 1.08 4.797 3.44 5.834M19.129 14.756c-2.36-1.037-3.44-3.693-3.44-5.834 0-2.4 1.928-4.352 4.311-4.352 2.384 0 4.311 1.952 4.311 4.352 0 2.14-1.08 4.797-3.44 5.834M12 21a9 9 0 009-9H3a9 9 0 009 9z" /></svg>
);
const MuscleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11.536A4.498 4.498 0 0112.5 7C14.985 7 17 9.015 17 11.5S14.985 16 12.5 16A4.498 4.498 0 018 11.536zM12 21a9 9 0 100-18 9 9 0 000 18z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const SparkleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L11 15l-4 6h12l-4-6-4.293-4.293a1 1 0 010-1.414L15 3z" /></svg>
);
const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.672l1.318-1.354a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>
);


interface UserProps {
  stats: UserStats;
  coinBalance: number;
  onAvatarChange: (color: string) => void;
}

const xpForNextLevel = (level: number) => level * 100;

const StatDisplay: React.FC<{ icon: React.ReactNode; label: string; value: number; color: string }> = ({ icon, label, value, color }) => (
    <div className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
        <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${color}`}>
                {icon}
            </div>
            <span className="font-semibold">{label}</span>
        </div>
        <span className="font-bold text-lg">{value}</span>
    </div>
);


export const User: React.FC<UserProps> = ({ stats, coinBalance, onAvatarChange }) => {
    const { username, level, xp, intelligence, strength, chi, charisma, avatar } = stats;
    const neededXp = xpForNextLevel(level);
    const xpPercentage = (xp / neededXp) * 100;

    const AVATAR_COLORS = ['#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e', '#14b8a6', '#06b6d4', '#3b82f6', '#8b5cf6', '#d946ef'];

    return (
        <div className="p-4 sm:p-6 space-y-6">
            <h2 className="text-3xl font-bold text-neutral">User Profile</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="lg:col-span-1 bg-base-100 p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
                    <div className="relative mb-4">
                        <div 
                            className="w-32 h-32 rounded-full flex items-center justify-center transition-colors"
                            style={{ backgroundColor: avatar.backgroundColor }}
                        >
                           <UserIcon />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-neutral">{username}</h3>
                    <p className="text-md text-gray-500">Level {level}</p>
                    <div className="w-full mt-4">
                        <div className="flex justify-between text-sm text-gray-500 mb-1">
                            <span>XP: {xp} / {neededXp}</span>
                            <span>Next Level</span>
                        </div>
                        <div className="w-full bg-base-200 rounded-full h-2.5">
                            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${xpPercentage}%` }}></div>
                        </div>
                    </div>
                    <div className="text-2xl font-bold bg-amber-100 text-amber-600 px-4 py-2 rounded-lg mt-6">
                        💰 {coinBalance} Coins
                    </div>
                </div>

                {/* Stats & Customization */}
                <div className="lg:col-span-2 space-y-6">
                     <div className="bg-base-100 p-6 rounded-xl shadow-sm">
                        <h4 className="text-xl font-semibold text-neutral mb-4">Character Stats</h4>
                        <div className="space-y-3">
                            <StatDisplay icon={<BrainIcon />} label="Intelligence" value={intelligence} color="bg-sky-200 text-sky-700" />
                            <StatDisplay icon={<MuscleIcon />} label="Strength" value={strength} color="bg-red-200 text-red-700" />
                            <StatDisplay icon={<SparkleIcon />} label="Chi" value={chi} color="bg-violet-200 text-violet-700" />
                            <StatDisplay icon={<HeartIcon />} label="Charisma" value={charisma} color="bg-pink-200 text-pink-700" />
                        </div>
                    </div>

                    <div className="bg-base-100 p-6 rounded-xl shadow-sm">
                        <h4 className="text-xl font-semibold text-neutral mb-4">Avatar Customization</h4>
                        <p className="text-sm text-gray-500 mb-4">Select a background color for your avatar.</p>
                        <div className="flex flex-wrap gap-3">
                            {AVATAR_COLORS.map(color => (
                                <button
                                    key={color}
                                    onClick={() => onAvatarChange(color)}
                                    className={`w-10 h-10 rounded-full cursor-pointer transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${avatar.backgroundColor === color ? 'ring-2 ring-offset-2 ring-primary' : ''}`}
                                    style={{ backgroundColor: color }}
                                    aria-label={`Set avatar color to ${color}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);
