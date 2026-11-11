import React from 'react';
import { motion } from 'motion/react';
import { Eye, CheckCircle2, ChevronRight, Bus } from 'lucide-react';
import { FLEET_LIST } from '../data/mockData.ts';
import { FleetItem } from '../types.ts';

const FLEET_FALLBACKS: Record<string, string> = {
  'ac-sleeper': 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
  'ac-seater': 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80',
  'non-ac-seater': 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
};

interface OurFleetProps {
  onViewFleetClick: (item?: FleetItem) => void;
  onExploreAllFleet?: () => void;
}

export const OurFleet: React.FC<OurFleetProps> = ({
  onViewFleetClick,
  onExploreAllFleet,
}) => {
  return (
    <section id="services" className="py-20 bg-slate-50 border-t border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-5 h-0.5 bg-orange-500 rounded-full" />
              <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-orange-600">
                MODERN TRAVEL FLEET
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b192c] tracking-tight">
              Travel in Comfort
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl">
              Choose from our modern, meticulously maintained coaches tailored for every travel need across East India.
            </p>
          </div>

          <button
            onClick={() => onExploreAllFleet ? onExploreAllFleet() : onViewFleetClick()}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-orange-50 text-orange-600 border border-orange-200 hover:border-orange-400 font-bold text-sm rounded-xl transition-all shadow-sm cursor-pointer self-start md:self-auto"
          >
            <Eye className="w-4 h-4" />
            <span>View Full Fleet & Cabins</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Three Vehicle Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FLEET_LIST.map((fleet, index) => (
            <motion.div
              key={fleet.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200/80 transition-all duration-300 flex flex-col group"
            >
              {/* Large, realistic interior photograph */}
              <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                <img
                  src={fleet.image}
                  alt={fleet.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={(e) => {
                    const fallback = FLEET_FALLBACKS[fleet.id] || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80';
                    e.currentTarget.src = fallback;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Capacity badge */}
                <div className="absolute bottom-3 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-slate-800 shadow-sm flex items-center gap-1.5">
                  <Bus className="w-3.5 h-3.5 text-orange-600" />
                  <span>{fleet.capacity}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors">
                    {fleet.title}
                  </h3>
                  <p className="text-sm font-semibold text-orange-600 mt-0.5 mb-3">
                    {fleet.subtitle}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed mb-5">
                    {fleet.description}
                  </p>

                  {/* Highlights list */}
                  <ul className="space-y-2 mb-6">
                    {fleet.features.slice(0, 3).map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => onViewFleetClick(fleet)}
                  className="w-full py-2.5 px-4 bg-slate-100 hover:bg-orange-600 text-slate-800 hover:text-white font-bold text-xs sm:text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Explore Interior & Specs</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
