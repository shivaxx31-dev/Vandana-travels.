import React, { useState } from 'react';
import { X, CheckCircle2, Shield, Wrench, Wind, Sparkles, Bus } from 'lucide-react';
import { FLEET_LIST } from '../../data/mockData.ts';
import { FleetItem } from '../../types.ts';

interface FleetDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFleetItem?: FleetItem | null;
  onBookNow: () => void;
}

export const FleetDetailModal: React.FC<FleetDetailModalProps> = ({
  isOpen,
  onClose,
  selectedFleetItem,
  onBookNow,
}) => {
  const [activeTab, setActiveTab] = useState<string>(
    selectedFleetItem ? selectedFleetItem.id : FLEET_LIST[0].id
  );

  if (!isOpen) return null;

  const currentFleet = FLEET_LIST.find((f) => f.id === activeTab) || FLEET_LIST[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-[#0b192c] text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white">
              <Bus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold tracking-tight">Vandana Travels Fleet Showcase</h2>
              <p className="text-xs text-slate-400">
                Premium multi-axle luxury passenger coaches & engineering standards
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Fleet category selector tabs */}
        <div className="p-4 bg-slate-100 border-b border-slate-200 flex gap-2 overflow-x-auto">
          {FLEET_LIST.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === item.id
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-200/80'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 max-h-[72vh] overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Big photo and specs */}
            <div className="lg:col-span-7">
              <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden shadow-md mb-6 bg-slate-900">
                <img
                  src={currentFleet.image}
                  alt={currentFleet.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider block">
                    {currentFleet.layout}
                  </span>
                  <h3 className="text-2xl font-extrabold">{currentFleet.title}</h3>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                  <Wrench className="w-4 h-4 text-orange-500" />
                  <span>Engineering & Safety Profile</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 bg-white rounded-xl border border-slate-100">
                    <span className="text-slate-400 block">Powertrain</span>
                    <span className="font-bold text-slate-800">{currentFleet.specs.engine}</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-100">
                    <span className="text-slate-400 block">Suspension</span>
                    <span className="font-bold text-slate-800">{currentFleet.specs.suspension}</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-100">
                    <span className="text-slate-400 block">Safety Architecture</span>
                    <span className="font-bold text-slate-800">{currentFleet.specs.safety}</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-100">
                    <span className="text-slate-400 block">Climate Control</span>
                    <span className="font-bold text-slate-800">{currentFleet.specs.cooling}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Features and Book Now */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div>
                <span className="text-xs font-bold text-orange-600 uppercase tracking-widest block mb-1">
                  Onboard Luxury
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                  {currentFleet.subtitle}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {currentFleet.description}
                </p>

                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Key Amenities Included
                </h4>
                <ul className="space-y-3 mb-8">
                  {currentFleet.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Book Button */}
              <div className="pt-6 border-t border-slate-200">
                <button
                  onClick={() => {
                    onClose();
                    onBookNow();
                  }}
                  className="w-full py-3.5 bg-orange-600 hover:bg-orange-500 active:bg-orange-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-all cursor-pointer text-center"
                >
                  Book on {currentFleet.title}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
