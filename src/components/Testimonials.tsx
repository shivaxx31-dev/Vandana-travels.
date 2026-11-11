import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData.ts';

export const Testimonials: React.FC = () => {
  const [mobileIndex, setMobileIndex] = useState(0);

  const prevMobile = () => {
    setMobileIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextMobile = () => {
    setMobileIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-5 h-0.5 bg-orange-500 rounded-full" />
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-orange-600">
              TRUSTED BY THOUSANDS
            </span>
            <span className="w-5 h-0.5 bg-orange-500 rounded-full" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b192c] tracking-tight">
            What Our Passengers Say
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Real passenger experiences from our daily Kolkata intercity routes.
          </p>
        </div>

        {/* Desktop 3-Column Layout */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50 rounded-3xl p-7 border border-slate-200/80 hover:border-orange-300 hover:shadow-xl hover:bg-white transition-all duration-300 flex flex-col justify-between relative group"
            >
              {/* Quote Icon */}
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center mb-5 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <Quote className="w-5 h-5" />
              </div>

              {/* Review Text */}
              <p className="text-slate-800 text-base font-medium leading-relaxed italic mb-6">
                "{item.quote}"
              </p>

              {/* Author & Rating info */}
              <div className="pt-5 border-t border-slate-200/60 flex items-center gap-3.5">
                <img
                  src={item.avatar}
                  alt={item.author}
                  className="w-12 h-12 rounded-full object-cover border-2 border-orange-400"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-grow">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-slate-900">{item.author}</h3>
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <p className="text-xs text-slate-500">{item.location}</p>
                  <p className="text-[11px] text-orange-600 font-semibold">{item.route}</p>
                </div>
                {/* 5-star rating */}
                <div className="flex items-center gap-0.5 text-amber-500">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel View */}
        <div className="md:hidden relative">
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80 shadow-md">
            <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center mb-4">
              <Quote className="w-4 h-4" />
            </div>

            <p className="text-slate-800 text-base font-medium leading-relaxed italic mb-5">
              "{TESTIMONIALS[mobileIndex].quote}"
            </p>

            <div className="pt-4 border-t border-slate-200/60 flex items-center gap-3">
              <img
                src={TESTIMONIALS[mobileIndex].avatar}
                alt={TESTIMONIALS[mobileIndex].author}
                className="w-11 h-11 rounded-full object-cover border-2 border-orange-400"
                referrerPolicy="no-referrer"
              />
              <div className="flex-grow">
                <div className="flex items-center gap-1">
                  <h3 className="text-sm font-bold text-slate-900">
                    {TESTIMONIALS[mobileIndex].author}
                  </h3>
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <p className="text-xs text-slate-500">{TESTIMONIALS[mobileIndex].location}</p>
                <div className="flex items-center gap-0.5 text-amber-500 mt-1">
                  {Array.from({ length: TESTIMONIALS[mobileIndex].rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Carousel controls */}
          <div className="flex items-center justify-between mt-4 px-2">
            <button
              onClick={prevMobile}
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-1.5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setMobileIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    mobileIndex === i ? 'w-5 bg-orange-500' : 'bg-slate-300'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextMobile}
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
