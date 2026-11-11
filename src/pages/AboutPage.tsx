import React from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Award,
  Users,
  HeartHandshake,
  CheckCircle2,
  Calendar,
  Building2,
  MapPin,
  Leaf,
} from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo.tsx';

interface AboutPageProps {
  onBookNow: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBookNow }) => {
  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-5 h-0.5 bg-orange-500 rounded-full" />
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-orange-600">
              OUR JOURNEY & HERITAGE
            </span>
            <span className="w-5 h-0.5 bg-orange-500 rounded-full" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0b192c] tracking-tight">
            14 Years of Connecting Travelers Across East India
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            From our founding dispatch stand at Kolkata’s Esplanade in 2012 to East India’s largest private fleet of multi-axle luxury sleeper coaches, our promise remains unwavering: safety, punctuality, and true passenger comfort.
          </p>
        </div>

        {/* Milestone Statistics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { label: 'Founded in Kolkata', value: '2012', sub: '14-Year Legacy' },
            { label: 'Happy Passengers Carried', value: '2.5M+', sub: 'Verified Journeys' },
            { label: 'Punctual Departure Record', value: '98.4%', sub: 'Audited Timetables' },
            { label: 'Luxury Fleet Coaches', value: '45+', sub: 'Volvo & BharatBenz' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 text-center shadow-sm hover:shadow-lg transition-all"
            >
              <span className="text-3xl sm:text-4xl font-extrabold text-orange-600 block mb-1">
                {stat.value}
              </span>
              <h3 className="text-sm font-bold text-slate-900">{stat.label}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{stat.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Story Split Section with Maintenance Depot Image */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                Pioneering Highway Comfort
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b192c] leading-tight">
                Engineering Passenger Safety Through World-Class Standards
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Before every departure, each Vandana coach is routed through our dedicated 6-bay workshop in Kolkata for computerized alignment, brake pressure diagnostic, and ozone sanitization.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                We believe intercity bus travel should never feel stressful. That is why our sleeper coaches feature extra-thick orthopaedic memory foam, sound-dampening acoustic curtains, and dual verified drivers for all night runs exceeding 6 hours.
              </p>

              <div className="space-y-2.5 pt-2">
                {[
                  'Strict dual-driver roster on all overnight journeys (Puri & Darjeeling)',
                  'AIS-140 GPS transponders integrated with Central State Transport consoles',
                  'In-cabin CCTV and emergency SOS buttons with 24/7 control room support',
                  'Freshly sanitized blankets and sealed mineral water on boarding',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video border border-slate-200">
                <img
                  src="/src/assets/images/depot_maintenance_safety_1794388765516.jpg"
                  alt="Vandana Travels Kolkata Fleet Maintenance Bay"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-xs font-bold uppercase tracking-wider text-orange-400">
                    Kolkata Workshop
                  </p>
                  <p className="text-sm font-bold">48-Point Daily Mechanical Certification Bay</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 mb-2">Uncompromised Safety</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every driver undergoes rigorous defensive driving certification and periodic medical eye evaluations. Speed governors limit all interstate runs to 80 km/h.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-5">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 mb-2">Punctuality Promise</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Automated dispatch logs and express highway corridors allow us to maintain a 98.4% on-time record across high-density intercity routes.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-5">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 mb-2">Eco-Conscious Fleet</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              100% of our fleet runs on modern BS-VI Euro-VI clean diesel engines with selective catalytic reduction, minimizing carbon footprint per passenger kilometer.
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-[#0b192c] text-white rounded-3xl p-8 sm:p-12 text-center shadow-xl">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-3">
            Experience the Vandana Travels Difference
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Book your next journey with East India's most trusted passenger bus network.
          </p>
          <button
            onClick={onBookNow}
            className="px-8 py-3.5 bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-sm rounded-xl shadow-lg cursor-pointer transition-all"
          >
            Reserve Your Bus Ticket
          </button>
        </div>
      </div>
    </div>
  );
};
