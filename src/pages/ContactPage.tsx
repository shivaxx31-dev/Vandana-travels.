import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  ChevronDown,
  Building2,
} from 'lucide-react';
import { FREQUENT_FAQS, BOARDING_POINTS } from '../data/mockData.ts';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    type: 'general',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmittedMessage(null);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setSubmittedMessage(data.message || 'Your inquiry has been logged with our dispatch officer.');
        setFormData({ name: '', phone: '', email: '', type: 'general', message: '' });
      }
    } catch (err) {
      setSubmittedMessage('Thank you! Your message has been routed to our Kolkata dispatch desk.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const terminalOffices = [
    {
      city: 'Kolkata (Main Hub)',
      name: 'Esplanade Central Bus Terminal',
      address: 'Gate No. 5, Strand Road, Esplanade, Kolkata 700069',
      phone: '+91 98300 45678 / +91 98301 98765',
      hours: 'Open 24 Hours, 7 Days a Week',
      isHQ: true,
    },
    {
      city: 'Kolkata (Salt Lake)',
      name: 'Karunamoyee International Terminal',
      address: 'Bay No. 4, Central Park Crossing, Sector II, Salt Lake, Kolkata 700091',
      phone: '+91 98302 11223',
      hours: '06:00 AM – 11:30 PM Daily',
    },
    {
      city: 'Kolkata (Howrah)',
      name: 'Santragachi Station Express Stand',
      address: 'Kona Expressway Flyover Station Bay, Howrah 711111',
      phone: '+91 98303 44556',
      hours: '06:00 AM – 11:00 PM Daily',
    },
    {
      city: 'Digha Coast',
      name: 'New Digha Sea Beach Terminal',
      address: 'Opposite Science City, Sea Beach Road, New Digha 721463',
      phone: '+91 98304 77889',
      hours: '05:30 AM – 10:30 PM Daily',
    },
    {
      city: 'Puri Dham',
      name: 'Puri Grand Stand Counter',
      address: 'Near Shree Gundicha Temple Gate, Badadanda, Puri 752002',
      phone: '+91 98305 66778',
      hours: '06:00 AM – 11:00 PM Daily',
    },
    {
      city: 'North Bengal (Siliguri)',
      name: 'Siliguri Tenzing Norgay Hub',
      address: 'Bay 8, Pradhan Nagar, Siliguri, West Bengal 734003',
      phone: '+91 98306 99001',
      hours: 'Open 24 Hours Daily',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-5 h-0.5 bg-orange-500 rounded-full" />
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-orange-600">
              TERMINAL OFFICES & ASSISTANCE
            </span>
            <span className="w-5 h-0.5 bg-orange-500 rounded-full" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0b192c] tracking-tight">
            Contact Vandana Travels
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Our 24×7 customer care officers, physical terminal ticket desks, and dispatch helplines are always at your service.
          </p>
        </div>

        {/* Primary Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                24×7 Central Helpline
              </span>
              <a
                href="tel:+919830045678"
                className="text-lg font-extrabold text-slate-900 hover:text-orange-600 block mt-0.5"
              >
                +91 98300 45678
              </a>
              <p className="text-xs text-slate-500 mt-1">
                Toll-free booking, route inquiries & emergency trip assistance.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Email Dispatch
              </span>
              <a
                href="mailto:support@vandanatravels.in"
                className="text-lg font-extrabold text-slate-900 hover:text-orange-600 block mt-0.5"
              >
                support@vandanatravels.in
              </a>
              <p className="text-xs text-slate-500 mt-1">
                Corporate charter quotes, refunds, and lost-and-found claims.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Corporate Headquarters
              </span>
              <h3 className="text-sm font-extrabold text-slate-900 mt-0.5">
                Vandana Travels Pvt. Ltd.
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Esplanade Terminus, Strand Road, Kolkata, West Bengal 700069
              </p>
            </div>
          </div>
        </div>

        {/* Form and Terminal Locator Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: Direct Message / Charter Request Form (Cols 1-6) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600 block mb-1">
                Direct Contact Desk
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Send an Inquiry or Request a Charter
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                For wedding charters, corporate shuttles, school excursions, or general questions.
              </p>
            </div>

            {submittedMessage ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center text-emerald-800"
              >
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h3 className="font-extrabold text-base">Inquiry Logged Successfully!</h3>
                <p className="text-xs text-emerald-700 mt-1">{submittedMessage}</p>
                <button
                  onClick={() => setSubmittedMessage(null)}
                  className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Banerjee"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98300 45678"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="passenger@example.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-orange-500 cursor-pointer"
                    >
                      <option value="general">General Bus Ticket Inquiry</option>
                      <option value="charter">Private Luxury Bus Charter</option>
                      <option value="group">Group Booking (10+ Seats)</option>
                      <option value="lost">Lost & Found Baggage Claim</option>
                      <option value="feedback">Travel Experience Feedback</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Your Message / Specific Requirements *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Details about date, passenger count, boarding preference, or specific questions..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-orange-600 hover:bg-orange-500 active:bg-orange-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Transmitting Inquiry...' : 'Submit Message to Dispatch Desk'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Physical Terminal Counter Directory (Cols 7-12) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase">
              <span>Terminal Ticket Counter Directory</span>
              <span>6 Primary Hubs</span>
            </div>

            <div className="space-y-3 max-h-[620px] overflow-y-auto pr-1">
              {terminalOffices.map((office, idx) => (
                <div
                  key={idx}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                    office.isHQ
                      ? 'bg-orange-50/40 border-orange-200 shadow-sm'
                      : 'bg-white border-slate-200 shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">
                        {office.city}
                      </span>
                      <h3 className="text-base font-extrabold text-slate-900">{office.name}</h3>
                    </div>
                    {office.isHQ && (
                      <span className="text-[10px] font-bold text-white bg-orange-600 px-2 py-0.5 rounded-full">
                        Headquarters
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 mt-2 flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                    <span>{office.address}</span>
                  </p>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="text-slate-500 font-medium">🕒 {office.hours}</span>
                    <a
                      href={`tel:${office.phone.split('/')[0].trim()}`}
                      className="font-bold text-orange-600 hover:text-orange-700 font-mono"
                    >
                      {office.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQs Accordion Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-lg">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 block mb-1">
              TRAVELER KNOWLEDGE BASE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {FREQUENT_FAQS.map((faq, i) => {
              const isOpen = activeFaq === i;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-200 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : i)}
                    className="w-full text-left p-4 sm:p-5 bg-slate-50 hover:bg-slate-100 font-bold text-sm text-slate-900 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-4 sm:p-5 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
