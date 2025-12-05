import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar, BarChart2, BookOpen } from 'lucide-react';

const Sidebar: React.FC = () => {
  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/calendar', icon: Calendar, label: 'Calendar' },
    { path: '/stats', icon: BarChart2, label: 'Statistics' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[var(--bg-100)] border-r border-[var(--bg-300)] shadow-lg z-10 flex flex-col">
      <div className="p-6 flex items-center gap-3 border-b border-[var(--bg-200)]">
        <div className="w-10 h-10 rounded-full bg-[var(--primary-100)] flex items-center justify-center text-white shadow-md">
          <BookOpen size={20} />
        </div>
        <div>
          <h1 className="font-bold text-[var(--text-100)] tracking-tight">WQ Dashboard</h1>
          <p className="text-xs text-[var(--text-200)]">Alpha Scholar</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-[var(--primary-100)] text-white shadow-md'
                  : 'text-[var(--text-200)] hover:bg-[var(--bg-200)] hover:text-[var(--primary-100)]'
              }`
            }
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-6 border-t border-[var(--bg-200)]">
        <div className="bg-[var(--bg-200)] rounded-xl p-4 shadow-inner">
          <p className="text-xs font-semibold text-[var(--accent-100)] mb-1">PRO TIP</p>
          <p className="text-xs text-[var(--text-200)] leading-relaxed">
            Consistency is key. Check your brain rank daily.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;