import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import CalendarPage from './pages/Calendar';
import DayDetail from './pages/DayDetail';
import StatsPage from './pages/Stats';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex min-h-screen bg-[var(--bg-100)] text-[var(--text-100)]">
        <Sidebar />
        
        <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/day/:id" element={<DayDetail />} />
              <Route path="/stats" element={<StatsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;