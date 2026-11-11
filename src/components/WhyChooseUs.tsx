import React from 'react';
import { Clock, UserCheck, ShieldCheck, BadgePercent, ArrowRight } from 'lucide-react';

interface WhyChooseUsProps {
  onGetToKnowUsClick: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onGetToKnowUsClick }) => {
  const benefits = [
    {
      icon: Clock,
      title: 'On-Time Departures',
      description:
        'Punctual schedules backed by automated dispatch monitors and dedicated terminal coordinators for effortless departures.',
    },
    {
      icon: UserCheck,
      title: 'Experienced Drivers',
      description:
        'Background-verified professional highway captains with 8+ years of interstate night-driving experience and defensive training.',
    },
    {
      icon: ShieldCheck,
      title: 'Passenger Safety First',
      description:
        'In-cabin CCTV surveillance, certified emergency SOS buttons, strict speed governors, and dedicated customer helpline for complete peace of mind.',
    },
    {
      icon: BadgePercent,
      title: 'Value for Money',
      description:
        'Transparent pricing with zero hidden convenience fees, complimentary drinking water, sanitized blankets, and premium amenities.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Side: Dark Navy Background with Scenic Transportation Image */}
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden bg-[#0b192c] text-white p-8 sm:p-10 flex flex-col justify-between shadow-xl min-h-[440px]">
            {/* Background scenic photo with overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1000&q=80"
                alt="Scenic highway at sunset"
                className="w-full h-full object-cover opacity-25"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b192c] via-[#0b192c]/90 to-[#0b192c]/80" />
            </div>

            {/* Content on top */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-5 h-0.5 bg-orange-500 rounded-full" />
                <span className="text-xs font-bold tracking-widest uppercase text-orange-400">
                  OUR COMMITMENT
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight mb-4">
                Why Choose <br />
                <span className="text-orange-500">Vandana Travels?</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-md">
                A trusted travel partner for thousands of passengers, offering safe, comfortable and on-time journeys.
              </p>
            </div>

            {/* Orange CTA */}
            <div className="relative z-10 pt-8 mt-6 border-t border-slate-700/60">
              <button
                onClick={onGetToKnowUsClick}
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-500 active:bg-orange-700 text-white font-bold text-sm rounded-xl shadow-md shadow-orange-600/30 transition-all cursor-pointer"
              >
                <span>Get to Know Us</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Side: Four Benefit Columns with Icons */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-orange-300 hover:bg-white hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-600 border border-orange-500/20 flex items-center justify-center mb-4 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-200">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
