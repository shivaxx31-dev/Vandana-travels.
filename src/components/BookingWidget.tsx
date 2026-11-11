import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Users, Search, ArrowLeftRight, AlertCircle } from 'lucide-react';
import { CITIES } from '../data/mockData.ts';

interface BookingWidgetProps {
  onSearch: (params: { from: string; to: string; date: string; passengers: number }) => void;
  initialFrom?: string;
  initialTo?: string;
}

export const BookingWidget: React.FC<BookingWidgetProps> = ({
  onSearch,
  initialFrom = 'Kolkata',
  initialTo = 'Digha',
}) => {
  const [fromCity, setFromCity] = useState(initialFrom);
  const [toCity, setToCity] = useState(initialTo);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];

  const [journeyDate, setJourneyDate] = useState(defaultDateStr);
  const [passengers, setPassengers] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const handleSwap = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
    setError(null);
  };

  const handleQuickDate = (daysFromNow: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysFromNow);
    setJourneyDate(d.toISOString().split('T')[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fromCity === toCity) {
      setError('Origin and destination cannot be the same city. Please select different cities.');
      return;
    }
    setError(null);
    onSearch({
      from: fromCity,
      to: toCity,
      date: journeyDate,
      passengers,
    });
  };

  return (
    <motion.div
      id="booking-widget"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-24"
    >
      <div className="bg-white rounded-3xl shadow-2xl shadow-slate-900/15 border border-slate-200/90 p-5 sm:p-7 transition-all">
        {/* Widget Header Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Online Bus Ticket Reservation
            </h2>
            <span className="hidden sm:inline text-xs font-medium text-slate-400">· Instant Confirmation & Live Seats</span>
          </div>

          {/* Quick Date Chips */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Quick Dates:</span>
            <button
              type="button"
              onClick={() => handleQuickDate(0)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors cursor-pointer"
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => handleQuickDate(1)}
              className="px-2.5 py-1 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-700 font-semibold transition-colors cursor-pointer"
            >
              Tomorrow
            </button>
            <button
              type="button"
              onClick={() => handleQuickDate(2)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors cursor-pointer"
            >
              Day After
            </button>
          </div>
        </div>

        {/* Validation Error Alert */}
        {error && (
          <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs sm:text-sm flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Fields */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-end">
            {/* From City */}
            <div className="md:col-span-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                From City
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-orange-500">
                  <MapPin className="w-4 h-4" />
                </div>
                <select
                  value={fromCity}
                  onChange={(e) => {
                    setFromCity(e.target.value);
                    setError(null);
                  }}
                  className="w-full pl-10 pr-4 py-3.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 rounded-xl text-sm font-semibold text-slate-900 transition-all outline-none cursor-pointer"
                >
                  {CITIES.map((city) => (
                    <option key={`from-${city}`} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Swap Button */}
            <div className="hidden md:flex md:col-span-1 justify-center pb-2">
              <button
                type="button"
                onClick={handleSwap}
                aria-label="Swap origin and destination"
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-orange-50 hover:text-orange-600 border border-slate-200 flex items-center justify-center text-slate-600 transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>
            </div>

            {/* To City */}
            <div className="md:col-span-3">
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                  To City
                </label>
                <button
                  type="button"
                  onClick={handleSwap}
                  className="md:hidden text-[11px] font-semibold text-orange-600 flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeftRight className="w-3 h-3" /> Swap
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-orange-500">
                  <MapPin className="w-4 h-4" />
                </div>
                <select
                  value={toCity}
                  onChange={(e) => {
                    setToCity(e.target.value);
                    setError(null);
                  }}
                  className="w-full pl-10 pr-4 py-3.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 rounded-xl text-sm font-semibold text-slate-900 transition-all outline-none cursor-pointer"
                >
                  {CITIES.map((city) => (
                    <option key={`to-${city}`} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Journey Date */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Journey Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-orange-500">
                  <Calendar className="w-4 h-4" />
                </div>
                <input
                  type="date"
                  value={journeyDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setJourneyDate(e.target.value)}
                  className="w-full pl-10 pr-3 py-3.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 rounded-xl text-sm font-semibold text-slate-900 transition-all outline-none cursor-pointer"
                />
              </div>
            </div>

            {/* Passengers */}
            <div className="md:col-span-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Seats
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-orange-500">
                  <Users className="w-4 h-4" />
                </div>
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="w-full pl-8 pr-2 py-3.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 rounded-xl text-sm font-semibold text-slate-900 transition-all outline-none cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search Buses Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-orange-600 hover:bg-orange-500 active:bg-orange-700 text-white font-extrabold text-sm sm:text-base rounded-xl shadow-md shadow-orange-600/30 hover:shadow-lg hover:shadow-orange-600/40 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
              >
                <Search className="w-4 h-4" />
                <span>Search Buses</span>
              </button>
            </div>
          </div>
        </form>

        {/* Feature badges row */}
        <div className="mt-4 pt-3 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2 border-t border-slate-100">
          <div className="flex items-center gap-4 flex-wrap">
            <span>✓ Zero Booking Surcharge</span>
            <span>✓ Instant WhatsApp M-Ticket</span>
            <span>✓ Verified Clean & Sanitized Coaches</span>
          </div>
          <span className="text-slate-400">Over 1,200 passengers traveled this week</span>
        </div>
      </div>
    </motion.div>
  );
};
