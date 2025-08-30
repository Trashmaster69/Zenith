
import React, { useState, useMemo } from 'react';
import type { Habit } from '../types';
import { CalendarHeatmap } from './CalendarHeatmap';
import { StreakDisplay } from './StreakDisplay';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AnalyticsProps {
  habits: Habit[];
}

export const Analytics: React.FC<AnalyticsProps> = ({ habits }) => {
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(habits.length > 0 ? habits[0].id : null);

  const selectedHabit = useMemo(() => habits.find(h => h.id === selectedHabitId), [habits, selectedHabitId]);

  const weeklyData = useMemo(() => {
    if (!selectedHabit) return [];
    const data = [
        { name: 'Sun', completions: 0 },
        { name: 'Mon', completions: 0 },
        { name: 'Tue', completions: 0 },
        { name: 'Wed', completions: 0 },
        { name: 'Thu', completions: 0 },
        { name: 'Fri', completions: 0 },
        { name: 'Sat', completions: 0 },
    ];
    selectedHabit.logs.forEach(log => {
        const dayOfWeek = new Date(log.date + 'T00:00:00').getDay();
        data[dayOfWeek].completions++;
    });
    return data;
  }, [selectedHabit]);

  if (habits.length === 0) {
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl font-bold text-neutral">No Data Yet</h2>
        <p className="text-gray-500 mt-2">Start tracking habits to see your analytics.</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-3xl font-bold text-neutral">Analytics</h2>
        <div>
          <label htmlFor="habit-select" className="sr-only">Select a habit</label>
          <select
            id="habit-select"
            value={selectedHabitId || ''}
            onChange={(e) => setSelectedHabitId(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg bg-base-100 focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {habits.map(habit => (
              <option key={habit.id} value={habit.id}>{habit.name}</option>
            ))}
          </select>
        </div>
      </div>
      
      {selectedHabit ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <StreakDisplay habit={selectedHabit} />
            <div className="bg-base-100 p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-neutral mb-4">Completions by Day</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="completions" fill="#10b981" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
          </div>
          <CalendarHeatmap logs={selectedHabit.logs} />
        </div>
      ) : (
        <p>Select a habit to view its analytics.</p>
      )}
    </div>
  );
};
