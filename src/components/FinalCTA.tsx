import React from 'react';
import { ArrowRight, PhoneCall } from 'lucide-react';

interface FinalCTAProps {
  onBookNowClick: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onBookNowClick }) => {
  return (
    <section className="relative py-24 sm:py-28 overflow-hidden text-white">
      {/* Scenic highway background with sunset photograph */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80"
          alt="Scenic sunset highway travel landscape"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        {/* Subtle Navy Overlay */}
        <div className="absolute inset-0 bg-[#071322]/85 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071322] via-transparent to-[#071322]/90" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-5 h-0.5 bg-orange-500 rounded-full" />
          <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-orange-400">
            START YOUR JOURNEY TODAY
          </span>
          <span className="w-5 h-0.5 bg-orange-500 rounded-full" />
        </div>

        {/* Main Heading */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Plan Your Next Journey <br />
          <span className="text-orange-500">with Vandana Travels</span>
        </h2>

        {/* Supporting text */}
        <p className="text-base sm:text-xl text-slate-200/95 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Book your bus today and travel with comfort, safety and trust.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onBookNowClick}
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-orange-600 hover:bg-orange-500 active:bg-orange-700 text-white font-extrabold text-base rounded-xl shadow-xl shadow-orange-600/30 hover:shadow-orange-600/50 transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5"
          >
            <span>Book Now</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <a
            href="tel:+919830045678"
            className="inline-flex items-center gap-2.5 px-7 py-4 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white font-semibold text-base rounded-xl border border-white/20 backdrop-blur-md transition-all duration-200 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-orange-400" />
            <span>24×7 Phone Booking</span>
          </a>
        </div>
      </div>
    </section>
  );
};
