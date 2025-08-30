
import React from 'react';
import { calculateStreak } from '../utils/habits';
import type { Habit } from '../types';
import { FireIcon } from './icons/FireIcon';
import { TrophyIcon } from './icons/TrophyIcon';

interface StreakDisplayProps {
  habit: Habit;
}

export const StreakDisplay: React.FC<StreakDisplayProps> = ({ habit }) => {
  const { current, longest } = calculateStreak(habit.logs, habit.frequency);

  return (
    <div className="bg-base-100 p-6 rounded-xl shadow-sm flex justify-around items-center">
      <div className="text-center">
        <div className="flex justify-center items-center gap-2 text-amber-500">
          <FireIcon />
          <p className="text-3xl font-bold">{current}</p>
        </div>
        <p className="text-sm text-gray-500 mt-1">Current Streak</p>
      </div>
      <div className="text-center">
        <div className="flex justify-center items-center gap-2 text-accent">
          <TrophyIcon />
          <p className="text-3xl font-bold">{longest}</p>
        </div>
        <p className="text-sm text-gray-500 mt-1">Longest Streak</p>
      </div>
    </div>
  );
};
