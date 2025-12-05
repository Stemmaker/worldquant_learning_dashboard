import React, { useMemo } from 'react';
import { getAllLogsArray } from '../services/storageService';
import { Clock, FileCode, Trophy, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from 'recharts';

const Dashboard: React.FC = () => {
  const logs = getAllLogsArray();
  const today = new Date().toISOString().split('T')[0];
  
  const todayLog = logs.find(l => l.date === today);
  const currentMonth = new Date().getMonth();
  
  const stats = useMemo(() => {
    const monthLogs = logs.filter(l => new Date(l.date).getMonth() === currentMonth);
    const totalMinutes = monthLogs.reduce((acc, curr) => acc + curr.studyMinutes, 0);
    const totalAlphas = monthLogs.reduce((acc, curr) => acc + curr.alphaTemplates, 0);
    const latestRank = logs.length > 0 ? logs[logs.length - 1].brainRank : 0;
    
    // Prepare chart data for the last 7 days
    const chartData = logs.slice(-30).map(log => ({
      date: log.date.slice(5),
      score: log.brainScore
    }));

    return { totalMinutes, totalAlphas, latestRank, chartData };
  }, [logs, currentMonth]);

  return (
    <div className="space-y-8 animate-fade-in">
      <header>
        <h2 className="text-3xl font-bold text-[var(--text-100)]">Overview</h2>
        <p className="text-[var(--text-200)]">Track your progress for {new Date().toLocaleString('default', { month: 'long' })}.</p>
      </header>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[var(--primary-100)] flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[var(--text-200)]">Today's Study</p>
            <p className="text-2xl font-bold text-[var(--text-100)]">
              {(todayLog?.studyMinutes || 0) / 60 < 1 
                ? `${todayLog?.studyMinutes || 0} min` 
                : `${((todayLog?.studyMinutes || 0) / 60).toFixed(1)} hrs`}
            </p>
          </div>
          <div className="p-3 bg-[var(--bg-200)] rounded-full text-[var(--primary-100)]">
            <Clock size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[var(--primary-200)] flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[var(--text-200)]">Today's Alphas</p>
            <p className="text-2xl font-bold text-[var(--text-100)]">{todayLog?.alphaTemplates || 0}</p>
          </div>
          <div className="p-3 bg-[var(--bg-200)] rounded-full text-[var(--primary-200)]">
            <FileCode size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[var(--primary-300)] flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[var(--text-200)]">Month Minutes</p>
            <p className="text-2xl font-bold text-[var(--text-100)]">{stats.totalMinutes}</p>
          </div>
          <div className="p-3 bg-[var(--bg-200)] rounded-full text-[var(--primary-300)]">
            <TrendingUp size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[var(--accent-100)] flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[var(--text-200)]">Current Rank</p>
            <p className="text-2xl font-bold text-[var(--text-100)]">#{stats.latestRank || 'N/A'}</p>
          </div>
          <div className="p-3 bg-[var(--bg-200)] rounded-full text-[var(--accent-100)]">
            <Trophy size={24} />
          </div>
        </div>
      </div>

      {/* Big Card: Progress Visualization */}
      <div className="bg-white rounded-xl shadow-md p-6 h-96 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-[var(--text-100)]">Brain Score Growth (Last 30 Days)</h3>
          <span className="text-sm px-3 py-1 bg-[var(--bg-200)] rounded-full text-[var(--text-200)]">
            Visual Analysis
          </span>
        </div>
        <div className="flex-1 w-full">
           {stats.chartData.length > 0 ? (
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={stats.chartData}>
                 <defs>
                   <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="var(--primary-100)" stopOpacity={0.1}/>
                     <stop offset="95%" stopColor="var(--primary-100)" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <XAxis dataKey="date" stroke="var(--text-200)" fontSize={12} tickLine={false} axisLine={false} />
                 <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                 />
                 <Area 
                    type="monotone" 
                    dataKey="score" 
                    stroke="var(--primary-100)" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#colorScore)" 
                  />
               </AreaChart>
             </ResponsiveContainer>
           ) : (
             <div className="h-full flex items-center justify-center text-[var(--text-200)]">
               No data available. Start logging your days!
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;