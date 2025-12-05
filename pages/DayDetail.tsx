import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLogForDate, saveLog } from '../services/storageService';
import { DailyLog } from '../types';
import { Save, ArrowLeft, Clock, BarChart, Hash, FileText } from 'lucide-react';

const DayDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [log, setLog] = useState<DailyLog | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (id) {
      const data = getLogForDate(id);
      setLog(data);
      setLoading(false);
    }
  }, [id]);

  const handleChange = (field: keyof DailyLog, value: any) => {
    if (log) {
      setLog({ ...log, [field]: value });
      setSaved(false);
    }
  };

  const handleSave = () => {
    if (log) {
      saveLog(log);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  if (loading || !log || !id) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/calendar')}
            className="p-2 bg-white rounded-full shadow-sm hover:shadow-md hover:text-[var(--primary-100)] transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
             <h2 className="text-3xl font-bold text-[var(--text-100)]">
               {new Date(id).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
             </h2>
             <p className="text-[var(--text-200)]">Daily Activity Log</p>
          </div>
        </div>
        
        <button 
          onClick={handleSave}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold shadow-md transition-all
            ${saved 
              ? 'bg-green-600 text-white' 
              : 'bg-[var(--primary-100)] text-white hover:bg-[var(--primary-200)] hover:shadow-lg'
            }`}
        >
          <Save size={18} />
          {saved ? 'Saved!' : 'Save Entry'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Performance Metrics Card */}
        <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
          <div className="flex items-center gap-2 text-[var(--primary-100)] border-b border-[var(--bg-200)] pb-2 mb-4">
             <BarChart size={20} />
             <h3 className="font-bold text-lg">Metrics</h3>
          </div>

          <div className="space-y-4">
             <div>
               <label className="block text-sm font-medium text-[var(--text-200)] mb-1 flex items-center gap-2">
                 <Clock size={16} /> Study Time (Minutes)
               </label>
               <input 
                 type="number" 
                 value={log.studyMinutes}
                 onChange={(e) => handleChange('studyMinutes', Number(e.target.value))}
                 className="w-full bg-[var(--bg-100)] border border-[var(--bg-300)] rounded-lg px-4 py-3 text-[var(--text-100)] focus:ring-2 focus:ring-[var(--primary-300)] focus:border-transparent outline-none transition-all"
                 placeholder="e.g. 120"
               />
             </div>

             <div>
               <label className="block text-sm font-medium text-[var(--text-200)] mb-1 flex items-center gap-2">
                 <FileText size={16} /> Alpha Templates Created
               </label>
               <input 
                 type="number" 
                 value={log.alphaTemplates}
                 onChange={(e) => handleChange('alphaTemplates', Number(e.target.value))}
                 className="w-full bg-[var(--bg-100)] border border-[var(--bg-300)] rounded-lg px-4 py-3 text-[var(--text-100)] focus:ring-2 focus:ring-[var(--primary-300)] focus:border-transparent outline-none transition-all"
                 placeholder="e.g. 5"
               />
             </div>
          </div>
        </div>

        {/* Brain Stats Card */}
        <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
          <div className="flex items-center gap-2 text-[var(--accent-100)] border-b border-[var(--bg-200)] pb-2 mb-4">
             <Hash size={20} />
             <h3 className="font-bold text-lg">Brain Platform</h3>
          </div>

          <div className="space-y-4">
             <div>
               <label className="block text-sm font-medium text-[var(--text-200)] mb-1">
                 Current Score
               </label>
               <input 
                 type="number" 
                 step="0.01"
                 value={log.brainScore}
                 onChange={(e) => handleChange('brainScore', Number(e.target.value))}
                 className="w-full bg-[var(--bg-100)] border border-[var(--bg-300)] rounded-lg px-4 py-3 text-[var(--text-100)] focus:ring-2 focus:ring-[var(--primary-300)] focus:border-transparent outline-none transition-all"
                 placeholder="0.00"
               />
             </div>

             <div>
               <label className="block text-sm font-medium text-[var(--text-200)] mb-1">
                 Global Rank
               </label>
               <input 
                 type="number" 
                 value={log.brainRank}
                 onChange={(e) => handleChange('brainRank', Number(e.target.value))}
                 className="w-full bg-[var(--bg-100)] border border-[var(--bg-300)] rounded-lg px-4 py-3 text-[var(--text-100)] focus:ring-2 focus:ring-[var(--primary-300)] focus:border-transparent outline-none transition-all"
                 placeholder="#"
               />
             </div>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="bg-white p-6 rounded-xl shadow-md flex flex-col h-96">
        <div className="flex items-center justify-between border-b border-[var(--bg-200)] pb-2 mb-4">
          <div className="flex items-center gap-2 text-[var(--text-100)]">
             <FileText size={20} />
             <h3 className="font-bold text-lg">Research Notes & Alpha Tips</h3>
          </div>
          <span className="text-xs text-[var(--text-200)] bg-[var(--bg-200)] px-2 py-1 rounded">Markdown supported</span>
        </div>
        
        <textarea
          value={log.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          className="flex-1 w-full bg-[var(--bg-100)] border border-[var(--bg-300)] rounded-lg p-4 text-[var(--text-100)] focus:ring-2 focus:ring-[var(--primary-300)] focus:border-transparent outline-none transition-all resize-none font-mono text-sm leading-relaxed"
          placeholder={`• Alpha Tip: Correlation between X and Y...
• Template: 
   group_rank(ts_mean(close, 20))`}
        />
      </div>
    </div>
  );
};

export default DayDetail;