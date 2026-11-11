import React from 'react';
import { X, Award, ShieldCheck, MapPin, Users, HeartHandshake } from 'lucide-react';
import { BrandLogo } from '../BrandLogo.tsx';

interface AboutUsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookNow: () => void;
}

export const AboutUsModal: React.FC<AboutUsModalProps> = ({
  isOpen,
  onClose,
  onBookNow,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        <div className="bg-[#0b192c] text-white px-6 py-5 flex items-center justify-between">
          <BrandLogo variant="dark" size="md" />
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-6 text-slate-700">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600 block mb-1">
              About Vandana Travels
            </span>
            <h2 className="text-2xl font-extrabold text-[#0b192c]">
              East India’s Preferred Intercity Bus Network
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Founded in Kolkata, West Bengal, <strong>Vandana Travels</strong> has grown from a humble single-route operator into one of the most trusted names in passenger transit across West Bengal, Odisha, and Sikkim.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-2xl font-extrabold text-orange-600">14+</span>
              <span className="text-[11px] text-slate-500 block font-medium">Years of Service</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-2xl font-extrabold text-orange-600">2.5M+</span>
              <span className="text-[11px] text-slate-500 block font-medium">Happy Travelers</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-2xl font-extrabold text-orange-600">98.4%</span>
              <span className="text-[11px] text-slate-500 block font-medium">On-Time Record</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-2xl font-extrabold text-orange-600">45+</span>
              <span className="text-[11px] text-slate-500 block font-medium">Modern Buses</span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">Our Core Principles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-orange-50/50 rounded-xl border border-orange-100 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Safety Above All</p>
                  <p className="text-slate-600">Dual pilots for night journeys and 24x7 control room monitoring.</p>
                </div>
              </div>

              <div className="p-3.5 bg-orange-50/50 rounded-xl border border-orange-100 flex items-start gap-2.5">
                <Award className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Pristine Hygiene</p>
                  <p className="text-slate-600">Sterilized linens, deep cabin wash, and ozonized air filters.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
            <button
              onClick={() => {
                onClose();
                onBookNow();
              }}
              className="px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm rounded-xl cursor-pointer transition-colors"
            >
              Book a Journey Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
