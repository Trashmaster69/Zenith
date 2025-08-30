
import type { Habit, Log } from '../types';
import { Frequency } from '../types';

const getDayOfYear = (date: Date): number => {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
};

export const getTodayDateString = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

export const isDueToday = (habit: Habit): boolean => {
  if (habit.frequency === Frequency.DAILY) {
    return true;
  }
  if (habit.frequency === Frequency.WEEKLY) {
    const createdAt = new Date(habit.createdAt);
    const today = new Date();
    // Simple weekly logic: due on the same day of the week it was created
    return createdAt.getDay() === today.getDay();
  }
  return false;
};

export const isCompletedToday = (habit: Habit): boolean => {
  const todayStr = getTodayDateString();
  return habit.logs.some(log => log.date === todayStr);
};

export const calculateStreak = (logs: Log[], frequency: Frequency): { current: number; longest: number } => {
  if (logs.length === 0) {
    return { current: 0, longest: 0 };
  }

  const sortedDates = logs.map(log => new Date(log.date + 'T00:00:00')).sort((a, b) => b.getTime() - a.getTime());

  let longest = 0;
  let current = 0;
  let streakBroken = false;

  const today = new Date(getTodayDateString() + 'T00:00:00');
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const step = frequency === Frequency.DAILY ? 1 : 7;

  // Check if today or yesterday is the last log date for current streak
  if (sortedDates[0].getTime() === today.getTime() || sortedDates[0].getTime() === yesterday.getTime()) {
      current = 1;
      let lastDate = sortedDates[0];

      for (let i = 1; i < sortedDates.length; i++) {
          const currentDate = sortedDates[i];
          const diffDays = (lastDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24);
          
          if (diffDays === step) {
              current++;
              lastDate = currentDate;
          } else if (diffDays > step) {
              break; // Streak broken
          }
      }
  }

  // Calculate longest streak
  if(sortedDates.length > 0) {
    let longestCandidate = 1;
    let lastDate = sortedDates[0];
    longest = 1;
    for (let i = 1; i < sortedDates.length; i++) {
        const currentDate = sortedDates[i];
        const diffDays = (lastDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24);

        if (diffDays === step) {
            longestCandidate++;
        } else if (diffDays > step) {
            longestCandidate = 1; // Reset streak
        }
        if (longestCandidate > longest) {
            longest = longestCandidate;
        }
        lastDate = currentDate;
    }
  }


  return { current, longest };
};

export const getHeatmapData = (logs: Log[]) => {
  const data = new Map<string, number>();
  logs.forEach(log => {
    data.set(log.date, (data.get(log.date) || 0) + 1);
  });
  return data;
};
