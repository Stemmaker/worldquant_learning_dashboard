import React from 'react';
import { getAllLogsArray } from '../services/storageService';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, Legend, ComposedChart } from 'recharts';

const StatsPage: React.FC = () => {
  const logs = getAllLogsArray();
  
  // Calculate cumulative stats for all time
  let runningTotal = 0;
  const allData = logs.map(log => {
    runningTotal += log.alphaTemplates;
    return {
      ...log,
      cumulativeAlphas: runningTotal,
      displayDate: log.date.slice(5) // MM-DD
    };
  });

  // Take last 30 entries for visualization
  const data = allData.slice(-30);

  if (logs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <h2 className="text-2xl font-bold text-[var(--text-200)]">No Statistics Available</h2>
        <p className="text-[var(--text-200)]">Start logging your daily activity to see insights here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <header>
        <h2 className="text-3xl font-bold text-[var(--text-100)]">Performance Analytics</h2>
        <p className="text-[var(--text-200)]">Visualize your growth and consistency.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Study Minutes Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-[var(--bg-200)]">
           <h3 className="text-lg font-bold text-[var(--text-100)] mb-6">Daily Study Minutes</h3>
           <div className="h-72">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={data}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--bg-300)" />
                 <XAxis dataKey="displayDate" stroke="var(--text-200)" fontSize={12} tickLine={false} />
                 <YAxis stroke="var(--text-200)" fontSize={12} tickLine={false} axisLine={false} />
                 <Tooltip 
                   contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                   cursor={{ fill: 'var(--bg-200)' }}
                 />
                 <Bar dataKey="studyMinutes" fill="var(--primary-200)" radius={[4, 4, 0, 0]} name="Minutes" />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Score & Rank Combined Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-[var(--bg-200)]">
           <h3 className="text-lg font-bold text-[var(--text-100)] mb-6">Brain Score vs. Rank</h3>
           <div className="h-72">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={data}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--bg-300)" />
                 <XAxis dataKey="displayDate" stroke="var(--text-200)" fontSize={12} tickLine={false} />
                 <YAxis yAxisId="left" stroke="var(--primary-100)" fontSize={12} tickLine={false} axisLine={false} />
                 <YAxis yAxisId="right" orientation="right" stroke="var(--accent-100)" fontSize={12} tickLine={false} axisLine={false} reversed />
                 <Tooltip 
                   contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                 />
                 <Legend wrapperStyle={{ paddingTop: '10px' }} />
                 <Line yAxisId="left" type="monotone" dataKey="brainScore" stroke="var(--primary-100)" strokeWidth={3} dot={{r: 4}} name="Score" />
                 <Line yAxisId="right" type="monotone" dataKey="brainRank" stroke="var(--accent-100)" strokeWidth={2} strokeDasharray="5 5" name="Rank (Inverted)" />
               </LineChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Cumulative Alphas (Composed Chart) */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-[var(--bg-200)] lg:col-span-2">
           <h3 className="text-lg font-bold text-[var(--text-100)] mb-6">Alpha Generation Velocity</h3>
           <div className="h-72">
             <ResponsiveContainer width="100%" height="100%">
               <ComposedChart data={data}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--bg-300)" />
                 <XAxis dataKey="displayDate" stroke="var(--text-200)" fontSize={12} tickLine={false} />
                 <YAxis yAxisId="left" stroke="var(--primary-200)" fontSize={12} tickLine={false} axisLine={false} label={{ value: 'Daily', angle: -90, position: 'insideLeft', offset: 0, style: { fill: 'var(--text-200)', fontSize: '10px' } }} />
                 <YAxis yAxisId="right" orientation="right" stroke="var(--accent-100)" fontSize={12} tickLine={false} axisLine={false} label={{ value: 'Cumulative', angle: 90, position: 'insideRight', offset: 0, style: { fill: 'var(--text-200)', fontSize: '10px' } }} />
                 <Tooltip 
                   contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                 />
                 <Legend wrapperStyle={{ paddingTop: '10px' }} />
                 <Bar yAxisId="left" dataKey="alphaTemplates" name="Daily Alphas" fill="var(--primary-200)" radius={[4, 4, 0, 0]} barSize={30} />
                 <Line yAxisId="right" type="monotone" dataKey="cumulativeAlphas" name="Cumulative Total" stroke="var(--accent-100)" strokeWidth={3} dot={{r: 4, fill: 'var(--accent-100)'}} />
               </ComposedChart>
             </ResponsiveContainer>
           </div>
        </div>

      </div>
    </div>
  );
};

export default StatsPage;