import React, { useState, useEffect } from 'react';
import { PhoneCall, ArrowRight, Menu, X, Sparkles, Navigation, CalendarCheck } from 'lucide-react';
import { BrandLogo } from './BrandLogo.tsx';
import { ActivePage } from '../types.ts';

interface NavbarProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  onBookNowClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  onBookNowClick,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; page: ActivePage; badge?: string }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Routes & Timetables', page: 'routes' },
    { label: 'Bus Fleet', page: 'fleet' },
    { label: 'Manage Booking', page: 'manage' },
    { label: 'About Us', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: ActivePage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-40 bg-white transition-all duration-300 ${
        isScrolled
          ? 'shadow-md shadow-slate-900/5 py-2.5 border-b border-slate-100'
          : 'py-3.5 border-b border-slate-200/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo & Wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-md cursor-pointer text-left"
            aria-label="Vandana Travels Home"
          >
            <BrandLogo size="md" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-semibold text-slate-700">
            {navItems.map((item) => {
              const isActive = activePage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`py-1 relative transition-colors cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-orange-600 font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-orange-600'
                      : 'hover:text-orange-600 text-slate-700'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] bg-orange-100 text-orange-700 font-extrabold px-1.5 py-0.2 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Phone, 24x7 Support & Book Now Button */}
          <div className="hidden sm:flex items-center gap-5 shrink-0">
            {/* Phone & 24x7 Support */}
            <a
              href="tel:+919830045678"
              className="flex items-center gap-2.5 text-left group hover:opacity-90 transition-opacity"
            >
              <div className="w-9 h-9 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-colors shrink-0">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  24×7 Customer Care
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-[#0b192c] tracking-tight group-hover:text-orange-600 transition-colors">
                  +91 98300 45678
                </span>
              </div>
            </a>

            {/* Orange Book Now Button with Arrow */}
            <button
              onClick={onBookNowClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-500 active:bg-orange-700 text-white font-bold text-sm rounded-xl shadow-sm shadow-orange-500/20 hover:shadow-md hover:shadow-orange-500/30 transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Book Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={onBookNowClick}
              className="px-3 py-1.5 bg-orange-600 text-white text-xs font-bold rounded-lg shadow-xs"
            >
              Book Now
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-3 pt-3 border-t border-slate-100 flex flex-col gap-1 pb-3 animate-in fade-in slide-in-from-top duration-200">
            {navItems.map((item) => {
              const isActive = activePage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`px-3 py-2 text-left text-sm font-bold rounded-xl transition-colors flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-orange-50 text-orange-600'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] bg-orange-100 text-orange-700 font-extrabold px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between px-3 mt-2">
              <a href="tel:+919830045678" className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-orange-600" />
                <div className="text-xs">
                  <p className="text-slate-400 font-medium">24×7 Support Helpline</p>
                  <p className="font-extrabold text-slate-900">+91 98300 45678</p>
                </div>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
