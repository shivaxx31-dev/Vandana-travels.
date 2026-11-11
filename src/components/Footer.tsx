import React from 'react';
import { BrandLogo } from './BrandLogo.tsx';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';
import { ActivePage } from '../types.ts';

interface FooterProps {
  onNavigate: (page: ActivePage) => void;
  onOpenPrivacyPolicy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenPrivacyPolicy,
  onOpenTerms,
}) => {
  const handleNav = (page: ActivePage) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07111e] text-slate-300 border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Info (Cols 1-4) */}
          <div className="lg:col-span-4">
            <button
              onClick={() => handleNav('home')}
              className="focus:outline-none cursor-pointer text-left block mb-4"
            >
              <BrandLogo variant="dark" size="lg" />
            </button>
            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-sm">
              Your trusted bus travel partner across East India and beyond. Providing safe, comfortable, and punctual passenger transportation since 2012.
            </p>

            {/* Trust badge */}
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 max-w-xs text-xs text-slate-300 shadow-sm">
              <ShieldCheck className="w-5 h-5 text-orange-500 shrink-0" />
              <div>
                <p className="font-bold text-white">Govt. Certified Travel Operator</p>
                <p className="text-slate-400 text-[11px]">WBTC & Interstate AIS-140 Permit Approved</p>
              </div>
            </div>
          </div>

          {/* Quick Links (Cols 5-6) */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-white mb-4">
              Explore Pages
            </h3>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-orange-400 transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('routes')}
                  className="hover:text-orange-400 transition-colors cursor-pointer text-left"
                >
                  Routes & Timetables
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('fleet')}
                  className="hover:text-orange-400 transition-colors cursor-pointer text-left"
                >
                  Bus Fleet & Cabins
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('manage')}
                  className="hover:text-orange-400 transition-colors cursor-pointer text-left"
                >
                  Manage Booking
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-orange-400 transition-colors cursor-pointer text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-orange-400 transition-colors cursor-pointer text-left"
                >
                  Contact & Terminals
                </button>
              </li>
            </ul>
          </div>

          {/* Our Services (Cols 7-9) */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-white mb-4">
              Our Fleet Services
            </h3>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <button
                  onClick={() => handleNav('fleet')}
                  className="hover:text-orange-400 transition-colors cursor-pointer text-left"
                >
                  AC Sleeper Luxury Liners
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('fleet')}
                  className="hover:text-orange-400 transition-colors cursor-pointer text-left"
                >
                  AC Seater Volvo Recliners
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('fleet')}
                  className="hover:text-orange-400 transition-colors cursor-pointer text-left"
                >
                  Non-AC Deluxe Coaches
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-orange-400 transition-colors cursor-pointer text-left"
                >
                  Corporate Charter Rentals
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-orange-400 transition-colors cursor-pointer text-left"
                >
                  Group Pilgrimage Bookings
                </button>
              </li>
            </ul>
          </div>

          {/* Contact (Cols 10-12) */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-white mb-4">
              Head Office Contact
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span className="text-slate-400 text-xs leading-relaxed">
                  Esplanade Central Terminus, Gate 5, Strand Road, Kolkata, West Bengal 700069
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <a
                  href="tel:+919830045678"
                  className="text-white font-bold hover:text-orange-400 transition-colors"
                >
                  +91 98300 45678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <a
                  href="mailto:support@vandanatravels.in"
                  className="text-slate-400 hover:text-white transition-colors text-xs"
                >
                  support@vandanatravels.in
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-orange-500 shrink-0" />
                <span className="text-slate-400 text-xs">24×7 Central Dispatch Help Desk</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <span>© 2026 Vandana Travels Pvt. Ltd. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacyPolicy}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={onOpenTerms}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <span>·</span>
            <button
              onClick={onOpenTerms}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Cancellation & Refund Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
