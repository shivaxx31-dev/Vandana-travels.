import React from 'react';
import { Home, Compass, Search, Bus, CalendarCheck } from 'lucide-react';
import { ActivePage } from '../types.ts';

interface MobileBottomNavProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  onQuickBook: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activePage,
  onNavigate,
  onQuickBook,
}) => {
  const items = [
    { label: 'Home', page: 'home' as ActivePage, icon: Home },
    { label: 'Routes', page: 'routes' as ActivePage, icon: Compass },
    { label: 'Search', isAction: true, icon: Search },
    { label: 'Fleet', page: 'fleet' as ActivePage, icon: Bus },
    { label: 'Manage', page: 'manage' as ActivePage, icon: CalendarCheck },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-1.5"
    >
      <div className="flex items-center justify-around px-2">
        {items.map((item, idx) => {
          if (item.isAction) {
            return (
              <button
                key="action-book"
                onClick={onQuickBook}
                className="flex flex-col items-center justify-center -mt-5 group cursor-pointer focus:outline-none"
                aria-label="Book Bus"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-orange-600/30 group-active:scale-95 transition-transform">
                  <Search className="w-5 h-5 stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-bold text-orange-600 mt-1">Book</span>
              </button>
            );
          }

          const Icon = item.icon;
          const isActive = activePage === item.page;

          return (
            <button
              key={item.page}
              onClick={() => {
                if (item.page) {
                  onNavigate(item.page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'text-orange-600 font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 stroke-[2.5]' : 'stroke-[1.8]'}`} />
              <span className="text-[10px] mt-1 font-semibold">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
