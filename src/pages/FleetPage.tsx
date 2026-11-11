import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Bus,
  ShieldCheck,
  Wrench,
  Sparkles,
  CheckCircle2,
  Calendar,
  Layers,
  ThermometerSnowflake,
  Activity,
  Award,
} from 'lucide-react';
import { FLEET_LIST } from '../data/mockData.ts';
import { FleetItem } from '../types.ts';

interface FleetPageProps {
  onBookNow: () => void;
}

export const FleetPage: React.FC<FleetPageProps> = ({ onBookNow }) => {
  const [activeFleet, setActiveFleet] = useState<FleetItem>(FLEET_LIST[0]);
  const [selectedSeatPreview, setSelectedSeatPreview] = useState<string | null>(null);

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Hero */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-5 h-0.5 bg-orange-500 rounded-full" />
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-orange-600">
              ENGINEERING EXCELLENCE
            </span>
            <span className="w-5 h-0.5 bg-orange-500 rounded-full" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0b192c] tracking-tight">
            Our Modern Travel Fleet
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Meticulously engineered multi-axle coaches with European air-suspension, Carrier Transicold climate control, and AIS-140 safety telematics.
          </p>

          {/* Coach Switcher Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            {FLEET_LIST.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveFleet(item);
                  setSelectedSeatPreview(null);
                }}
                className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeFleet.id === item.id
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Bus className="w-4 h-4" />
                <span>{item.title}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Selected Coach Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Main Visual Display (Cols 1-7) */}
          <motion.div
            key={activeFleet.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl"
          >
            <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-900 shadow-md mb-6">
              <img
                src={activeFleet.image}
                alt={activeFleet.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white flex items-end justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
                    {activeFleet.capacity}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold">{activeFleet.title}</h2>
                  <p className="text-xs sm:text-sm text-slate-200">{activeFleet.subtitle}</p>
                </div>
                <button
                  onClick={onBookNow}
                  className="px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-all"
                >
                  Reserve Seat
                </button>
              </div>
            </div>

            {/* Specifications Matrix */}
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-orange-600" />
              <span>Chassis & Powertrain Specifications</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-6">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Engine</span>
                <span className="font-extrabold text-slate-800">{activeFleet.specs.engine}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Suspension</span>
                <span className="font-extrabold text-slate-800">{activeFleet.specs.suspension}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Safety</span>
                <span className="font-extrabold text-slate-800">{activeFleet.specs.safety}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">HVAC</span>
                <span className="font-extrabold text-slate-800">{activeFleet.specs.cooling}</span>
              </div>
            </div>

            {/* Dimensions and top speed */}
            <div className="flex flex-wrap items-center justify-between p-3.5 bg-orange-50/50 rounded-xl border border-orange-100 text-xs text-slate-700">
              <span><strong>Dimensions:</strong> {activeFleet.dimensions}</span>
              <span><strong>Speed Governor:</strong> {activeFleet.topSpeed}</span>
              <span><strong>Fuel:</strong> {activeFleet.fuelType}</span>
            </div>
          </motion.div>

          {/* Interactive Seat Deck Simulator (Cols 8-12) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">
                  Cabin Layout Explorer
                </span>
                <h3 className="text-lg font-extrabold text-slate-900">
                  {activeFleet.layout}
                </h3>
              </div>
              <span className="text-xs text-slate-400">Click to inspect</span>
            </div>

            {/* Layout simulator based on coach type */}
            {activeFleet.seatMapType === 'sleeper' ? (
              <div className="space-y-4">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 text-center">
                    Upper Deck (Berths U1 - U8)
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {['U1', 'U2', 'AISLE', 'U3', 'U4', 'AISLE', 'U5', 'U6', 'AISLE', 'U7', 'U8', 'AISLE'].map((s, i) => {
                      if (s === 'AISLE') return <div key={i} className="text-center text-[10px] text-slate-300 pt-2">AISLE</div>;
                      const isSelected = selectedSeatPreview === s;
                      return (
                        <button
                          key={s}
                          onClick={() => setSelectedSeatPreview(s)}
                          className={`p-2.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-orange-600 text-white border-orange-600 shadow'
                              : 'bg-white hover:bg-orange-50 border-slate-200 text-slate-800'
                          }`}
                        >
                          {s} <span className="block text-[9px] font-normal opacity-75">Upper</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 text-center">
                    Lower Deck (Berths L1 - L8)
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {['L1', 'L2', 'AISLE', 'L3', 'L4', 'AISLE', 'L5', 'L6', 'AISLE', 'L7', 'L8', 'AISLE'].map((s, i) => {
                      if (s === 'AISLE') return <div key={i} className="text-center text-[10px] text-slate-300 pt-2">AISLE</div>;
                      const isSelected = selectedSeatPreview === s;
                      return (
                        <button
                          key={s}
                          onClick={() => setSelectedSeatPreview(s)}
                          className={`p-2.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-orange-600 text-white border-orange-600 shadow'
                              : 'bg-white hover:bg-orange-50 border-slate-200 text-slate-800'
                          }`}
                        >
                          {s} <span className="block text-[9px] font-normal opacity-75">Lower</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3 text-center">
                  2+2 Pushback Executive Seating Grid
                </p>
                <div className="grid grid-cols-5 gap-2">
                  {['1A', '1B', 'WALK', '1C', '1D', '2A', '2B', 'WALK', '2C', '2D', '3A', '3B', 'WALK', '3C', '3D', '4A', '4B', 'WALK', '4C', '4D'].map((s, i) => {
                    if (s === 'WALK') return <div key={i} className="text-center text-[10px] text-slate-300 pt-2">AISLE</div>;
                    const isSelected = selectedSeatPreview === s;
                    return (
                      <button
                        key={s}
                        onClick={() => setSelectedSeatPreview(s)}
                        className={`p-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-orange-600 text-white border-orange-600 shadow'
                            : 'bg-white hover:bg-orange-50 border-slate-200 text-slate-800'
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Selected Seat Inspector Feedback */}
            {selectedSeatPreview && (
              <div className="mt-4 p-3.5 bg-orange-50 rounded-xl border border-orange-200 text-xs text-orange-950">
                <p className="font-bold">Inspecting Berth / Seat {selectedSeatPreview}:</p>
                <p className="mt-0.5 text-slate-700">
                  Includes memory foam cushion, USB charger, individual reading spotlight, and personal air vent.
                </p>
              </div>
            )}

            {/* Feature Highlights List */}
            <div className="mt-6 pt-4 border-t border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Onboard Amenities & Hygiene
              </h4>
              <ul className="space-y-2">
                {activeFleet.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Maintenance Bay & Depot Showcase Section */}
        <div className="bg-[#0b192c] text-white rounded-3xl p-8 sm:p-12 overflow-hidden shadow-2xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 mb-3 bg-orange-600/20 text-orange-400 px-3 py-1 rounded-full text-xs font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Compromise Safety Protocol</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Kolkata Central Maintenance & Safety Depot
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                Before any coach departs on highway routes, our certified technical team runs a mandatory 48-point safety audit covering pneumatic brakes, tire tread depth, AIS-140 GPS sync, HVAC air filters, and sanitization protocols.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-6 text-xs">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-lg font-extrabold text-orange-400">48-Point</span>
                  <span className="block text-slate-300 font-medium">Daily Mechanical Audit</span>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-lg font-extrabold text-orange-400">Ozone Wash</span>
                  <span className="block text-slate-300 font-medium">Interior Sanitization</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-video">
                <img
                  src="/src/assets/images/depot_maintenance_safety_1794388765516.jpg"
                  alt="Vandana Travels Maintenance Bay in Kolkata"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-white">
                  Kolkata Bay 14 · Dedicated Fleet Workshop
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
