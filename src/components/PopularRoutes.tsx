import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Clock, MapPin, ChevronRight, Calendar } from 'lucide-react';
import { POPULAR_ROUTES } from '../data/mockData.ts';
import { RouteItem } from '../types.ts';

interface PopularRoutesProps {
  onSelectRoute: (route: RouteItem) => void;
  onViewAllRoutes?: () => void;
}

export const PopularRoutes: React.FC<PopularRoutesProps> = ({
  onSelectRoute,
  onViewAllRoutes,
}) => {
  return (
    <section id="routes" className="py-20 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-5 h-0.5 bg-orange-500 rounded-full" />
              <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-orange-600">
                POPULAR ROUTES
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b192c] tracking-tight">
              Our Top Travel Routes
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl">
              Connecting Kolkata to East India’s finest beach resorts, pilgrimage centers, and hill stations.
            </p>
          </div>

          {onViewAllRoutes && (
            <button
              onClick={onViewAllRoutes}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-orange-50 text-orange-600 border border-orange-200 hover:border-orange-400 font-bold text-sm rounded-xl transition-all shadow-sm cursor-pointer self-start md:self-auto"
            >
              <span>Explore All Routes & Timetables</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Five destination cards in one horizontal row on desktop (scroll/grid on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {POPULAR_ROUTES.map((route, index) => (
            <motion.div
              key={route.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              onClick={() => onSelectRoute(route)}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200/80 hover:border-orange-300 transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Destination Photograph Container */}
              <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={route.image}
                  alt={route.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />

                {/* Subtle gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Duration Tag */}
                <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 text-xs text-white font-medium bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md">
                  <Clock className="w-3 h-3 text-orange-400" />
                  <span>{route.duration}</span>
                </div>

                {/* Action Arrow Icon Button */}
                <div className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 text-slate-900 group-hover:bg-orange-500 group-hover:text-white flex items-center justify-center transition-all shadow-sm">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Card Body Content */}
              <div className="p-4 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-center gap-1 text-xs text-slate-400 mb-1">
                    <MapPin className="w-3 h-3 text-orange-500" />
                    <span>{route.departuresDaily} Trips Daily</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                    {route.name}
                  </h3>
                </div>

                {/* Starting Fare */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-baseline justify-between">
                  <span className="text-xs text-slate-500">Starting from</span>
                  <div className="text-right">
                    <span className="text-lg font-extrabold text-orange-600">
                      ₹{route.startingFare}
                    </span>
                    <span className="text-[10px] text-slate-400 block -mt-0.5">*sample fare</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note on sample fares */}
        <div className="mt-8 text-center text-xs text-slate-400">
          * Fares shown are illustrative starting prices per passenger seat; actual fare depends on bus category, seat type, and departure time.
        </div>
      </div>
    </section>
  );
};
