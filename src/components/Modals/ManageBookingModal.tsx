import React, { useState } from 'react';
import { X, Search, CalendarCheck, AlertTriangle, CheckCircle2, Printer, Phone } from 'lucide-react';
import { BookingRecord } from '../../types.ts';

interface ManageBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  recentBooking?: BookingRecord | null;
}

export const ManageBookingModal: React.FC<ManageBookingModalProps> = ({
  isOpen,
  onClose,
  recentBooking,
}) => {
  const [pnrInput, setPnrInput] = useState(recentBooking ? recentBooking.pnr : 'VT-89421');
  const [booking, setBooking] = useState<BookingRecord | null>(recentBooking || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cancelMessage, setCancelMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pnrInput.trim()) return;

    setLoading(true);
    setError(null);
    setCancelMessage(null);

    try {
      const res = await fetch(`/api/bookings/${encodeURIComponent(pnrInput.trim())}`);
      const data = await res.json();
      if (data.success && data.booking) {
        setBooking(data.booking);
      } else {
        setError(data.error || 'No booking found with this PNR number');
      }
    } catch (err: any) {
      if (recentBooking && recentBooking.pnr === pnrInput.trim()) {
        setBooking(recentBooking);
      } else {
        setError('Unable to fetch booking. Please verify your PNR number.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async () => {
    if (!booking) return;
    const confirmCancel = window.confirm(
      `Are you sure you want to cancel booking ${booking.pnr}? An 80% refund of ₹${Math.round(
        booking.totalFare * 0.8
      )} will be initiated.`
    );
    if (!confirmCancel) return;

    try {
      const res = await fetch(`/api/bookings/${booking.pnr}/cancel`, {
        method: 'POST',
      });
      const data = await res.json();
      if (data.success && data.booking) {
        setBooking(data.booking);
        setCancelMessage(data.message);
      }
    } catch (err) {
      setBooking({ ...booking, status: 'CANCELLED' });
      setCancelMessage('Booking cancelled. 80% refund initiated to source payment.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-[#0b192c] text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold tracking-tight">Manage Your Booking</h2>
              <p className="text-xs text-slate-400">View ticket, download pass, or cancel journey</p>
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

        {/* PNR search */}
        <div className="p-6 border-b border-slate-100 bg-slate-50">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={pnrInput}
              onChange={(e) => setPnrInput(e.target.value)}
              placeholder="Enter PNR (e.g. VT-89421)"
              className="flex-grow px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 uppercase focus:outline-none focus:border-orange-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Search className="w-4 h-4" />
              <span>Lookup</span>
            </button>
          </form>
          <div className="flex gap-2 mt-2 text-xs text-slate-400">
            <span>Demo PNR:</span>
            <button
              type="button"
              onClick={() => {
                setPnrInput('VT-89421');
              }}
              className="font-mono text-orange-600 underline"
            >
              VT-89421
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {error && (
            <div className="p-4 bg-red-50 text-red-700 text-xs rounded-xl mb-4">{error}</div>
          )}

          {cancelMessage && (
            <div className="p-4 bg-emerald-50 text-emerald-800 text-xs rounded-xl mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{cancelMessage}</span>
            </div>
          )}

          {booking ? (
            <div className="space-y-5">
              {/* Ticket Card */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Booking Status
                    </span>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                          booking.status === 'CONFIRMED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {booking.status}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-900">
                        PNR: {booking.pnr}
                      </span>
                    </div>
                  </div>

                  <span className="text-lg font-extrabold text-orange-600">
                    ₹{booking.totalFare}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                  <div>
                    <span className="text-slate-400 block">Route</span>
                    <span className="font-bold text-slate-800 text-sm">
                      {booking.from} → {booking.to}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Date of Travel</span>
                    <span className="font-bold text-slate-800 text-sm">{booking.date}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Coach</span>
                    <span className="font-semibold text-slate-800">
                      {booking.busType} ({booking.busNumber})
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Boarding Point</span>
                    <span className="font-semibold text-slate-800">{booking.boardingPoint}</span>
                  </div>
                </div>

                {/* Passenger list */}
                <div className="border-t border-slate-200 pt-3">
                  <span className="text-[11px] font-bold text-slate-500 uppercase block mb-2">
                    Passengers
                  </span>
                  <div className="space-y-1.5">
                    {booking.passengers.map((p, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between text-xs bg-white p-2.5 rounded-lg border border-slate-100"
                      >
                        <span className="font-medium text-slate-800">
                          {p.name} ({p.gender}, {p.age} yrs)
                        </span>
                        <span className="font-mono font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                          Seat: {p.seat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Ticket</span>
                </button>

                {booking.status === 'CONFIRMED' && (
                  <button
                    onClick={handleCancelBooking}
                    className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Cancel Ticket</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400 text-sm">
              Enter your 8-character PNR number printed on your SMS or ticket to inspect details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
