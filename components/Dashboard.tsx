
import React from 'react';
import type { Habit } from '../types';
import { HabitList } from './HabitList';
import { StreakDisplay } from './StreakDisplay';
import { isDueToday } from '../utils/habits';

interface DashboardProps {
  habits: Habit[];
  onToggleComplete: (habitId: string) => void;
}

const WelcomeHeader = () => {
    const now = new Date();
    const hours = now.getHours();
    let greeting = "Good Evening";
    if (hours < 12) {
        greeting = "Good Morning";
    } else if (hours < 18) {
        greeting = "Good Afternoon";
    }

    const dateString = now.toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="mb-6">
            <h2 className="text-3xl font-bold text-neutral">{greeting}</h2>
            <p className="text-gray-500">{dateString}</p>
        </div>
    );
};


export const Dashboard: React.FC<DashboardProps> = ({ habits, onToggleComplete }) => {
  const habitsDueToday = habits.filter(isDueToday);
  const overallCompletion = habitsDueToday.length > 0
    ? (habitsDueToday.filter(h => h.logs.some(l => l.date === new Date().toISOString().split('T')[0])).length / habitsDueToday.length) * 100
    : 0;
  
  const mostConsistentHabit = [...habits]
    .sort((a, b) => b.logs.length - a.logs.length)[0];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <WelcomeHeader />
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <h3 className="text-xl font-semibold text-neutral">Today's Habits</h3>
          <HabitList habits={habits} onToggleComplete={onToggleComplete} />
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-neutral">At a Glance</h3>
          <div className="bg-base-100 p-6 rounded-xl shadow-sm">
            <h4 className="font-semibold text-neutral mb-2">Today's Progress</h4>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-primary h-2.5 rounded-full" style={{ width: `${overallCompletion}%` }}></div>
            </div>
            <p className="text-right text-sm text-gray-500 mt-2">{Math.round(overallCompletion)}% complete</p>
          </div>
          
          {mostConsistentHabit && (
            <div>
              <h4 className="font-semibold text-neutral mb-2">Top Habit: {mostConsistentHabit.name}</h4>
              <StreakDisplay habit={mostConsistentHabit} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
