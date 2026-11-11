import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  CalendarCheck,
  Search,
  Printer,
  Download,
  AlertTriangle,
  CheckCircle2,
  Phone,
  QrCode,
  ShieldCheck,
  Bus,
} from 'lucide-react';
import { BookingRecord } from '../types.ts';

interface ManageBookingPageProps {
  initialPnr?: string;
  onBookNew: () => void;
}

export const ManageBookingPage: React.FC<ManageBookingPageProps> = ({
  initialPnr = 'VT-89421',
  onBookNew,
}) => {
  const [pnrInput, setPnrInput] = useState(initialPnr);
  const [booking, setBooking] = useState<BookingRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cancelMessage, setCancelMessage] = useState<string | null>(null);

  const fetchBooking = async (pnrToSearch: string) => {
    if (!pnrToSearch.trim()) return;
    setLoading(true);
    setError(null);
    setCancelMessage(null);

    try {
      const res = await fetch(`/api/bookings/${encodeURIComponent(pnrToSearch.trim())}`);
      const data = await res.json();
      if (data.success && data.booking) {
        setBooking(data.booking);
      } else {
        setError(data.error || 'No booking found with this PNR number');
      }
    } catch (err) {
      setError('Error fetching booking record. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchBooking(pnrInput);
  }, []);

  const handleCancel = async () => {
    if (!booking) return;
    const confirmCancel = window.confirm(
      `Confirm cancellation for PNR ${booking.pnr}? An 80% refund of ₹${Math.round(
        booking.totalFare * 0.8
      )} will be credited back to your original payment method.`
    );
    if (!confirmCancel) return;

    try {
      const res = await fetch(`/api/bookings/${booking.pnr}/cancel`, { method: 'POST' });
      const data = await res.json();
      if (data.success && data.booking) {
        setBooking(data.booking);
        setCancelMessage(data.message);
      }
    } catch (err) {
      setBooking({ ...booking, status: 'CANCELLED' });
      setCancelMessage('Booking cancelled. Refund of 80% initiated.');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-5 h-0.5 bg-orange-500 rounded-full" />
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-orange-600">
              RESERVATION DESK
            </span>
            <span className="w-5 h-0.5 bg-orange-500 rounded-full" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0b192c] tracking-tight">
            Manage Your E-Tickets & Boarding Passes
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            View booking confirmation, download printable tickets, modify seats, or request cancellation.
          </p>

          {/* Search Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchBooking(pnrInput);
            }}
            className="flex gap-2 mt-6 max-w-md mx-auto"
          >
            <input
              type="text"
              value={pnrInput}
              onChange={(e) => setPnrInput(e.target.value)}
              placeholder="Enter PNR (e.g. VT-89421)"
              className="flex-grow px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 uppercase focus:outline-none focus:border-orange-500 shadow-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-orange-600 hover:bg-orange-500 active:bg-orange-700 text-white font-extrabold text-sm rounded-2xl shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Lookup</span>
            </button>
          </form>

          {/* Demo PNRs */}
          <div className="flex justify-center gap-3 mt-3 text-xs text-slate-500">
            <span>Try sample PNRs:</span>
            {['VT-89421', 'VT-55012'].map((sample) => (
              <button
                key={sample}
                type="button"
                onClick={() => {
                  setPnrInput(sample);
                  fetchBooking(sample);
                }}
                className="font-mono font-bold text-orange-600 underline"
              >
                {sample}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-700 text-xs sm:text-sm rounded-2xl mb-6 text-center">
            {error}
          </div>
        )}

        {cancelMessage && (
          <div className="p-4 bg-emerald-50 text-emerald-800 text-xs sm:text-sm rounded-2xl mb-6 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>{cancelMessage}</span>
          </div>
        )}

        {/* Boarding Pass E-Ticket Presentation */}
        {booking && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden print:shadow-none"
          >
            {/* Ticket Header */}
            <div className="bg-[#0b192c] text-white p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
                    Official Intercity E-Ticket
                  </span>
                  <span className="text-xs text-slate-400">·</span>
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      booking.status === 'CONFIRMED'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}
                  >
                    ● {booking.status}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {booking.from} → {booking.to}
                </h2>
                <p className="text-xs text-slate-300 mt-1">Date of Journey: {booking.date}</p>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">PNR Number</span>
                <span className="text-2xl sm:text-3xl font-mono font-extrabold text-orange-400">
                  {booking.pnr}
                </span>
                <span className="text-[11px] text-slate-400 block">Total Fare: ₹{booking.totalFare}</span>
              </div>
            </div>

            {/* Ticket Body Grid */}
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Left Column: Details (Cols 1-8) */}
              <div className="md:col-span-8 space-y-6">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block font-semibold text-[10px] uppercase">
                      Coach Service & Bus No.
                    </span>
                    <span className="font-extrabold text-slate-900 text-sm">{booking.busType}</span>
                    <span className="block text-slate-500 font-mono mt-0.5">{booking.busNumber}</span>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block font-semibold text-[10px] uppercase">
                      Reporting Time
                    </span>
                    <span className="font-extrabold text-slate-900 text-sm">20 Mins Prior</span>
                    <span className="block text-slate-500 mt-0.5">Bring Valid Photo ID</span>
                  </div>
                </div>

                {/* Boarding Point Landmark */}
                <div className="p-4 bg-orange-50/60 rounded-2xl border border-orange-200/70">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-700 block mb-1">
                    Boarding Point Address
                  </span>
                  <p className="text-sm font-bold text-slate-900">{booking.boardingPoint}</p>
                  <p className="text-xs text-slate-600 mt-1">
                    Contact Kolkata Central Dispatch if navigating: +91 98300 45678.
                  </p>
                </div>

                {/* Passengers List */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    Passenger List & Reserved Seats
                  </h3>
                  <div className="space-y-2">
                    {booking.passengers.map((p, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                      >
                        <div>
                          <span className="font-bold text-slate-900 text-sm">{p.name}</span>
                          <span className="text-slate-500 ml-2">
                            ({p.gender}, {p.age} years)
                          </span>
                        </div>
                        <span className="px-3 py-1 bg-orange-100 text-orange-800 font-mono font-extrabold rounded-lg">
                          Seat: {p.seat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: QR Code & Security Stamp (Cols 9-12) */}
              <div className="md:col-span-4 flex flex-col items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                <div>
                  <div className="w-28 h-28 bg-white p-2 rounded-2xl shadow-sm border border-slate-200 mx-auto mb-3 flex items-center justify-center">
                    <QrCode className="w-24 h-24 text-slate-900" />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Scan for Live Gate Verification
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-700">{booking.pnr}</span>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200 w-full text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                  <span>AIS-140 Certified Ticket</span>
                </div>
              </div>
            </div>

            {/* Ticket Actions Bar */}
            <div className="p-6 bg-slate-100 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm transition-all"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Ticket</span>
                </button>
                <a
                  href={`tel:${booking.contactPhone}`}
                  className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Support</span>
                </a>
              </div>

              {booking.status === 'CONFIRMED' && (
                <button
                  onClick={handleCancel}
                  className="px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Cancel Ticket (80% Refund)</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
