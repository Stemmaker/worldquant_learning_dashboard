import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getAllLogsArray } from '../services/storageService';

const CalendarPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const logs = getAllLogsArray();

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  
  const days = [];
  // Empty slots for previous month
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  // Days for current month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDayClick = (day: number) => {
    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    navigate(`/day/${formattedDate}`);
  };

  const getLogForDay = (day: number) => {
     const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
     return logs.find(l => l.date === dateStr);
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold text-[var(--text-100)]">
          {monthNames[month]} {year}
        </h2>
        <div className="flex gap-2">
          <button onClick={handlePrevMonth} className="p-2 hover:bg-[var(--bg-200)] rounded-full transition-colors text-[var(--text-100)]">
            <ChevronLeft size={24} />
          </button>
          <button onClick={handleNextMonth} className="p-2 hover:bg-[var(--bg-200)] rounded-full transition-colors text-[var(--text-100)]">
            <ChevronRight size={24} />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-7 gap-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-bold text-[var(--text-200)] py-2">
            {day}
          </div>
        ))}
        
        {days.map((day, idx) => {
          if (!day) return <div key={`empty-${idx}`} className="h-32"></div>;

          const log = getLogForDay(day);
          const hasData = log && (log.studyMinutes > 0 || log.alphaTemplates > 0);
          const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();

          return (
            <div 
              key={day}
              onClick={() => handleDayClick(day)}
              className={`h-32 border border-[var(--bg-300)] rounded-xl p-3 cursor-pointer transition-all hover:shadow-lg hover:border-[var(--primary-100)] flex flex-col justify-between bg-white relative overflow-hidden group
                ${isToday ? 'ring-2 ring-[var(--primary-200)]' : ''}
              `}
            >
              <div className="flex justify-between items-start">
                 <span className={`text-lg font-semibold ${isToday ? 'text-[var(--primary-100)]' : 'text-[var(--text-100)]'}`}>
                   {day}
                 </span>
                 {hasData && (
                   <div className="w-2 h-2 rounded-full bg-[var(--primary-100)]"></div>
                 )}
              </div>
              
              {hasData ? (
                <div className="space-y-1 text-xs text-[var(--text-200)]">
                  {log.studyMinutes > 0 && (
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-[var(--accent-100)]">{log.studyMinutes}m</span> study
                    </div>
                  )}
                  {log.alphaTemplates > 0 && (
                     <div className="flex items-center gap-1">
                     <span className="font-medium text-[var(--primary-100)]">{log.alphaTemplates}</span> alphas
                   </div>
                  )}
                   {log.brainRank > 0 && (
                     <div className="mt-1 text-[10px] text-[var(--accent-200)]">
                       Rank #{log.brainRank}
                   </div>
                  )}
                </div>
              ) : (
                <div className="text-[10px] text-[var(--bg-300)] opacity-0 group-hover:opacity-100 transition-opacity">
                  Add Entry
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarPage;