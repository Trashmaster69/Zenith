
import React from 'react';
import type { Log } from '../types';

interface CalendarHeatmapProps {
  logs: Log[];
}

export const CalendarHeatmap: React.FC<CalendarHeatmapProps> = ({ logs }) => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 365);

  const logMap = new Map<string, number>();
  logs.forEach(log => {
    logMap.set(log.date, (logMap.get(log.date) || 0) + 1);
  });

  const days = [];
  let day = new Date(startDate);
  // Pad the start to align with the correct day of the week
  for (let i = 0; i < day.getDay(); i++) {
    days.push(<div key={`pad-start-${i}`} className="w-4 h-4" />);
  }
  
  while (day <= endDate) {
    const dateString = day.toISOString().split('T')[0];
    const count = logMap.get(dateString) || 0;
    
    let colorClass = 'bg-gray-200';
    if (count > 0) colorClass = 'bg-emerald-200';
    if (count > 1) colorClass = 'bg-emerald-400';
    if (count > 3) colorClass = 'bg-emerald-600';
    
    days.push(
      <div key={dateString} className="w-4 h-4 rounded-sm relative group" >
         <div className={`w-full h-full ${colorClass}`}></div>
         <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max px-2 py-1 bg-neutral text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
          {count} completion{count !== 1 ? 's' : ''} on {dateString}
        </span>
      </div>
    );
    day.setDate(day.getDate() + 1);
  }

  const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-base-100 p-6 rounded-xl shadow-sm">
      <h3 className="font-semibold text-neutral mb-4">Completion History</h3>
      <div className="flex gap-2">
        <div className="flex flex-col gap-4 text-xs text-gray-500 pt-5">
           {['', DAY_LABELS[1], '', DAY_LABELS[3], '', DAY_LABELS[5], ''].map((label, i) => <span key={i} className="h-4 flex items-center">{label}</span>)}
        </div>
        <div className="grid grid-cols-[repeat(53,minmax(0,1fr))] grid-flow-col-dense gap-1">
          {days}
        </div>
      </div>
    </div>
  );
};
