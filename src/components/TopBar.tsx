import React, { useState } from 'react';
import { MapPin, Navigation, CalendarCheck, Globe, ChevronDown, Check } from 'lucide-react';
import { ActivePage } from '../types.ts';

interface TopBarProps {
  onNavigate: (page: ActivePage) => void;
  onOpenManageBookingModal: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  onNavigate,
  onOpenManageBookingModal,
}) => {
  const [language, setLanguage] = useState<'EN' | 'বাংলা' | 'हिंदी'>('EN');
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  return (
    <div className="bg-[#0b192c] text-white/90 text-xs py-2 px-4 border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
        {/* Left: Location & Tagline */}
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <div className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors">
            <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
            <span className="font-semibold">Kolkata, West Bengal</span>
          </div>

          <span className="hidden sm:inline text-slate-600" aria-hidden="true">|</span>

          <span className="hidden md:inline text-slate-300 font-normal">
            Safe & Comfortable Bus Travel Across India
          </span>
        </div>

        {/* Right: Manage Booking, Language */}
        <div className="flex items-center gap-3 sm:gap-5 ml-auto text-xs">
          <a
            href="tel:+919830045678"
            className="hidden sm:flex items-center gap-1.5 text-slate-300 hover:text-orange-400 font-semibold transition-colors"
          >
            <span className="text-orange-400">●</span>
            <span>24×7 Care: +91 98300 45678</span>
          </a>

          <span className="hidden sm:inline text-slate-600" aria-hidden="true">|</span>

          <button
            onClick={() => onNavigate('manage')}
            className="flex items-center gap-1.5 text-slate-300 hover:text-orange-400 font-semibold transition-colors cursor-pointer"
          >
            <CalendarCheck className="w-3.5 h-3.5 text-orange-400" />
            <span>Manage Booking</span>
          </button>

          <span className="text-slate-600" aria-hidden="true">|</span>

          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors py-0.5 cursor-pointer font-bold"
              aria-label="Select Language"
            >
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>{language}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-32 bg-[#0f172a] border border-slate-700 rounded-xl shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                {(['EN', 'বাংলা', 'हिंदी'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-1.5 text-xs hover:bg-slate-800 transition-colors flex items-center justify-between cursor-pointer ${
                      language === lang ? 'text-orange-400 font-bold bg-slate-800/60' : 'text-slate-200'
                    }`}
                  >
                    <span>{lang === 'EN' ? 'English' : lang === 'বাংলা' ? 'বাংলা' : 'हिंदी'}</span>
                    {language === lang && <Check className="w-3 h-3 text-orange-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
