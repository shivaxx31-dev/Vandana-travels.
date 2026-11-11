import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Navigation, ShieldCheck, Armchair, Wifi, Snowflake } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick }) => {
  const highlights = [
    { icon: ShieldCheck, label: 'Safe & Secure Travel' },
    { icon: Armchair, label: 'Comfortable Seating' },
    { icon: Wifi, label: 'Free Wi-Fi' },
    { icon: Snowflake, label: 'AC & Non-AC Buses' },
  ];

  return (
    <section id="home" className="relative w-full bg-[#071322] overflow-hidden text-white pt-8 pb-32 sm:pb-36 lg:pb-40">
      {/* Background Image Container with Luxury Bus on the Right */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero_luxury_bus_1794142792926.jpg"
          alt="Vandana Travels Modern Luxury Bus Coach on Scenic Highway at Sunset"
          className="w-full h-full object-cover object-right-bottom sm:object-right"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1920&q=80';
          }}
        />

        {/* Dark Navy Gradient Overlay: Strong opacity on the left, softening towards the right for the bus to shine */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071322] via-[#071322]/90 sm:via-[#071322]/80 to-transparent" />
        {/* Subtle bottom fade to seamlessly blend into booking section */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#071322] to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[500px] lg:min-h-[560px]">
          {/* Left-Side Content: Text, CTAs, Highlights */}
          <div className="lg:col-span-7 max-w-2xl">
            {/* Small uppercase eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <span className="w-6 h-0.5 bg-orange-500 rounded-full" />
              <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-orange-400">
                PREMIUM BUS TRAVEL SERVICES
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 drop-shadow-sm"
            >
              Travel Better <br />
              <span className="text-slate-300 font-medium text-3xl sm:text-4xl lg:text-5xl">with</span>{' '}
              <span className="text-orange-500 underline decoration-orange-500/40 decoration-4 underline-offset-8">
                Vandana Travels
              </span>
            </motion.h1>

            {/* Supporting description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-200/90 leading-relaxed font-normal mb-8 max-w-xl"
            >
              Safe, comfortable and reliable bus services connecting major cities with on-time departures and great travel experience.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              <button
                onClick={onBookClick}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-orange-600 hover:bg-orange-500 active:bg-orange-700 text-white font-bold text-base rounded-xl shadow-lg shadow-orange-600/30 hover:shadow-orange-600/40 transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>Book Your Bus</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>

            {/* Four Service Highlights with Icons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-white/15"
            >
              {highlights.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-orange-500/15 border border-orange-400/30 flex items-center justify-center shrink-0">
                      <IconComponent className="w-4 h-4 text-orange-400" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-200 leading-tight">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Right Column: Spacer to let the bus image show on desktop */}
          <div className="hidden lg:block lg:col-span-5 pointer-events-none" />
        </div>
      </div>
    </section>
  );
};
