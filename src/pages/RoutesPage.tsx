import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Compass,
  ChevronRight,
  Sparkles,
  Sun,
  Coffee,
  CheckCircle2,
  Navigation,
} from 'lucide-react';
import { POPULAR_ROUTES, BOARDING_POINTS } from '../data/mockData.ts';
import { RouteItem } from '../types.ts';

const ROUTE_FALLBACKS: Record<string, string> = {
  'kol-digha': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
  'kol-puri': 'https://images.unsplash.com/photo-1600100397608-f010f443b772?auto=format&fit=crop&w=800&q=80',
  'kol-bbsr': 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80',
  'kol-darj': 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
  'kol-mandarmani': 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80',
};

interface RoutesPageProps {
  onBookRoute: (from: string, to: string) => void;
}

export const RoutesPage: React.FC<RoutesPageProps> = ({ onBookRoute }) => {
  const [selectedRoute, setSelectedRoute] = useState<RouteItem>(POPULAR_ROUTES[0]);
  const [filterCategory, setFilterCategory] = useState<'all' | 'beach' | 'pilgrimage' | 'hills'>('all');

  const filteredRoutes = POPULAR_ROUTES.filter((route) => {
    if (filterCategory === 'beach') return ['kol-digha', 'kol-mandarmani'].includes(route.id);
    if (filterCategory === 'pilgrimage') return ['kol-puri', 'kol-bhubaneswar'].includes(route.id);
    if (filterCategory === 'hills') return ['kol-darjeeling'].includes(route.id);
    return true;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-5 h-0.5 bg-orange-500 rounded-full" />
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-orange-600">
              EXPLORE OUR NETWORK
            </span>
            <span className="w-5 h-0.5 bg-orange-500 rounded-full" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0b192c] tracking-tight">
            Comprehensive Routes & Timetables
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Direct, punctual intercity express services connecting Kolkata with East India’s premier seaside destinations, sacred shrines, and Himalayan peaks.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6 p-1.5 bg-white rounded-2xl border border-slate-200/80 shadow-sm max-w-md mx-auto">
            {[
              { id: 'all', label: 'All Destinations' },
              { id: 'beach', label: 'Beach Resorts' },
              { id: 'pilgrimage', label: 'Temple Havens' },
              { id: 'hills', label: 'Hill Stations' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterCategory(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filterCategory === tab.id
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Master-Detail Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Route Cards List (Cols 1-5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs font-semibold text-slate-500">
              <span>Select a Route to View Timetable</span>
              <span>{filteredRoutes.length} Available Corridors</span>
            </div>

            {filteredRoutes.map((route) => {
              const isSelected = selectedRoute.id === route.id;
              return (
                <motion.div
                  key={route.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelectedRoute(route)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex gap-4 items-center ${
                    isSelected
                      ? 'bg-white border-orange-500 shadow-lg ring-2 ring-orange-500/20'
                      : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  {/* Thumbnail Image */}
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0 relative">
                    <img
                      src={route.image}
                      alt={route.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        const fallback = ROUTE_FALLBACKS[route.id] || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80';
                        e.currentTarget.src = fallback;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <span className="absolute bottom-1.5 left-1.5 text-[10px] font-bold text-white bg-black/60 px-1.5 py-0.5 rounded">
                      {route.duration}
                    </span>
                  </div>

                  {/* Route Summary */}
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600">
                        {route.distance} · {route.departuresDaily} Daily Trips
                      </span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-orange-600 animate-ping" />
                      )}
                    </div>

                    <h3 className="text-base font-extrabold text-slate-900 truncate mt-0.5">
                      {route.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                      {route.description}
                    </p>

                    <div className="mt-2 flex items-baseline justify-between">
                      <span className="text-xs text-slate-400">Starting from</span>
                      <span className="text-sm font-extrabold text-orange-600">
                        ₹{route.startingFare} onwards
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: In-Depth Route Profile & Timetable (Cols 6-12) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedRoute.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden"
              >
                {/* Hero Banner of Selected Area */}
                <div className="relative h-64 sm:h-80 w-full bg-slate-900">
                  <img
                    src={selectedRoute.image}
                    alt={selectedRoute.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const fallback = ROUTE_FALLBACKS[selectedRoute.id] || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80';
                      e.currentTarget.src = fallback;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b192c] via-[#0b192c]/50 to-transparent" />

                  <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-2 mb-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-orange-300">
                        <Compass className="w-3.5 h-3.5 text-orange-400" />
                        <span>{selectedRoute.highway}</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                        {selectedRoute.name}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-200/90 mt-1 max-w-xl">
                        {selectedRoute.description}
                      </p>
                    </div>

                    <button
                      onClick={() => onBookRoute(selectedRoute.from, selectedRoute.to)}
                      className="px-6 py-3 bg-orange-600 hover:bg-orange-500 active:bg-orange-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-orange-600/30 transition-all cursor-pointer shrink-0 flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book on this Route</span>
                    </button>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-6 sm:p-8 space-y-8">
                  {/* Highlights and Best Time To Visit */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100/80">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-700 mb-1.5">
                        <Sun className="w-4 h-4 text-orange-500" />
                        <span>Best Time to Travel</span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed font-medium">
                        {selectedRoute.bestTimeToVisit}
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>Journey Guarantee</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Pneumatic air-suspension coaches, verified highway rest stops, dual drivers on night runs.
                      </p>
                    </div>
                  </div>

                  {/* Daily Scheduled Departures Timetable */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900">
                        Official Daily Timetable & Service Classes
                      </h3>
                      <span className="text-xs text-slate-400">Live seat bookings available</span>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-slate-200">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[10px]">
                          <tr>
                            <th className="py-3 px-4">Departure</th>
                            <th className="py-3 px-4">Service & Bus Class</th>
                            <th className="py-3 px-4">Expected Arrival</th>
                            <th className="py-3 px-4 text-right">Fare</th>
                            <th className="py-3 px-4 text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                          {selectedRoute.timetable.map((item, idx) => (
                            <tr key={idx} className="hover:bg-orange-50/40 transition-colors">
                              <td className="py-3.5 px-4 font-bold font-mono text-slate-900">
                                {item.departure}
                              </td>
                              <td className="py-3.5 px-4">
                                <p className="font-bold text-slate-900">{item.serviceName}</p>
                                <p className="text-[11px] text-orange-600 font-semibold">{item.type}</p>
                              </td>
                              <td className="py-3.5 px-4 font-mono text-slate-600">
                                {item.arrival}
                              </td>
                              <td className="py-3.5 px-4 text-right font-extrabold text-orange-600 text-sm">
                                ₹{item.fare}
                              </td>
                              <td className="py-3.5 px-4 text-center">
                                <button
                                  onClick={() => onBookRoute(selectedRoute.from, selectedRoute.to)}
                                  className="px-3 py-1.5 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-[11px] font-bold cursor-pointer transition-colors shadow-xs"
                                >
                                  Book
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Route Highway Milestones & Rest Stops */}
                  <div>
                    <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 mb-4">
                      Route Checkpoints & Certified Food Oasis
                    </h3>

                    <div className="relative border-l-2 border-orange-200 ml-3 pl-5 space-y-4">
                      {selectedRoute.stops.map((stop, idx) => (
                        <div key={idx} className="relative">
                          <div
                            className={`absolute -left-[27px] top-1.5 w-3.5 h-3.5 rounded-full border-2 ${
                              stop.isRestStop
                                ? 'bg-orange-600 border-white ring-2 ring-orange-500'
                                : 'bg-white border-orange-500'
                            }`}
                          />
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900 text-xs sm:text-sm">
                              {stop.name}
                            </span>
                            <span className="font-mono text-xs text-slate-400">
                              +{stop.timeFromStart}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">{stop.landmark}</p>
                          {stop.isRestStop && (
                            <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold text-orange-700 bg-orange-100/80 px-2 py-0.5 rounded-md">
                              <Coffee className="w-3 h-3" />
                              20-Minute Refreshment & Washroom Stop
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tourist Highlights in destination */}
                  <div>
                    <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 mb-3">
                      Top Destination Attractions in {selectedRoute.to}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selectedRoute.touristHighlights.map((attraction, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2 text-xs text-slate-700"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{attraction}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Travel Tips */}
                  <div className="p-4 rounded-2xl bg-slate-100/70 border border-slate-200/80">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                      Captain's Travel Advisory
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {selectedRoute.travelTips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-orange-500 font-bold">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
