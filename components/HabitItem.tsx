
import React from 'react';
import type { Habit } from '../types';
import { DEFAULT_CATEGORIES } from '../constants';
import { isCompletedToday, calculateStreak } from '../utils/habits';
import { FireIcon } from './icons/FireIcon';

interface HabitItemProps {
  habit: Habit;
  onToggleComplete: (habitId: string) => void;
}

export const HabitItem: React.FC<HabitItemProps> = ({ habit, onToggleComplete }) => {
  const completed = isCompletedToday(habit);
  const { current } = calculateStreak(habit.logs, habit.frequency);
  const category = DEFAULT_CATEGORIES.find(c => c.name === habit.category) || DEFAULT_CATEGORIES[0];

  return (
    <div className="bg-base-100 p-4 rounded-xl shadow-sm flex items-center justify-between transition-all hover:shadow-md">
      <div className="flex items-center gap-4">
        <button
          onClick={() => onToggleComplete(habit.id)}
          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
            completed
              ? 'bg-primary border-primary text-white'
              : 'bg-transparent border-gray-300 text-gray-300 hover:border-primary'
          }`}
        >
          {completed && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        <div>
          <p className={`font-semibold text-neutral ${completed ? 'line-through text-gray-400' : ''}`}>{habit.name}</p>
          <div className="flex items-center text-sm text-gray-500 gap-2 mt-1">
            <span className={`flex items-center gap-1.5 text-xs font-medium text-white px-2 py-0.5 rounded-full ${category.color}`}>
              {category.icon}
              {habit.category}
            </span>
            <span className="flex items-center gap-1 text-amber-500 font-bold">
              <FireIcon />
              {current}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
