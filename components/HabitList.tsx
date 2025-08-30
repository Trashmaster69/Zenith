
import React from 'react';
import type { Habit } from '../types';
import { HabitItem } from './HabitItem';
import { isDueToday } from '../utils/habits';

interface HabitListProps {
  habits: Habit[];
  onToggleComplete: (habitId: string) => void;
}

export const HabitList: React.FC<HabitListProps> = ({ habits, onToggleComplete }) => {
  const dueTodayHabits = habits.filter(isDueToday);
  
  if (dueTodayHabits.length === 0) {
    return (
      <div className="text-center py-10 px-4 bg-base-100 rounded-xl">
        <h3 className="text-lg font-semibold text-neutral">No habits due today.</h3>
        <p className="text-gray-500 mt-2">Create a new habit to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {dueTodayHabits.map((habit) => (
        <HabitItem key={habit.id} habit={habit} onToggleComplete={onToggleComplete} />
      ))}
    </div>
  );
};
