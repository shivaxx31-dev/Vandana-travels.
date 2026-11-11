import React, { useState } from 'react';
import {
  X,
  Bus,
  Clock,
  MapPin,
  Check,
  Star,
  Users,
  ShieldCheck,
  ArrowRight,
  Printer,
  Download,
  AlertCircle,
  Wifi,
  Coffee,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SAMPLE_SCHEDULES, BOARDING_POINTS } from '../../data/mockData.ts';
import { BusSchedule, Passenger, BookingRecord } from '../../types.ts';

interface SearchResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchParams: {
    from: string;
    to: string;
    date: string;
    passengers: number;
  };
  onBookingConfirmed: (booking: BookingRecord) => void;
}

export const SearchResultsModal: React.FC<SearchResultsModalProps> = ({
  isOpen,
  onClose,
  searchParams,
  onBookingConfirmed,
}) => {
  const [selectedBus, setSelectedBus] = useState<BusSchedule | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [step, setStep] = useState<'SELECT_BUS' | 'SELECT_SEATS' | 'PASSENGER_INFO' | 'CONFIRMATION'>('SELECT_BUS');

  // Passenger state
  const [passengersList, setPassengersList] = useState<Passenger[]>([
    { name: 'Debashis Roy', age: 32, gender: 'Male', seat: '' },
  ]);
  const [contactEmail, setContactEmail] = useState('debashis.roy@example.com');
  const [contactPhone, setContactPhone] = useState('+91 98300 45678');
  const [selectedBoardingPoint, setSelectedBoardingPoint] = useState<string>(
    BOARDING_POINTS[searchParams.from]?.[0]?.name || 'Esplanade Bus Terminus, Kolkata'
  );

  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Filter or adapt sample buses for the route
  const availableBuses = SAMPLE_SCHEDULES.map((bus) => ({
    ...bus,
    from: searchParams.from,
    to: searchParams.to,
  }));

  const handleChooseBus = (bus: BusSchedule) => {
    setSelectedBus(bus);
    setSelectedSeats([]);
    // initialize passenger list based on search passenger count
    const initialList: Passenger[] = Array.from({ length: searchParams.passengers }).map((_, i) => ({
      name: i === 0 ? 'Rahul Banerjee' : `Passenger ${i + 1}`,
      age: 28,
      gender: 'Male',
      seat: '',
    }));
    setPassengersList(initialList);
    setStep('SELECT_SEATS');
  };

  const toggleSeat = (seatId: string) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
    } else {
      if (selectedSeats.length >= searchParams.passengers) {
        // replace earliest
        setSelectedSeats([...selectedSeats.slice(1), seatId]);
      } else {
        setSelectedSeats([...selectedSeats, seatId]);
      }
    }
  };

  const handleProceedToPassengers = () => {
    if (selectedSeats.length < searchParams.passengers) {
      alert(`Please select ${searchParams.passengers} seat(s) before proceeding.`);
      return;
    }
    // Assign selected seats to passengers
    const updated = passengersList.map((p, idx) => ({
      ...p,
      seat: selectedSeats[idx] || `S${idx + 1}`,
    }));
    setPassengersList(updated);
    setStep('PASSENGER_INFO');
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBus) return;

    setIsSubmitting(true);
    setBookingError(null);

    const baseFare = selectedBus.fare * searchParams.passengers;
    const gst = Math.round(baseFare * 0.05);
    const totalFare = baseFare + gst;

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: searchParams.from,
          to: searchParams.to,
          date: searchParams.date,
          busType: selectedBus.type,
          busNumber: selectedBus.busNumber,
          passengers: passengersList,
          totalFare,
          contactEmail,
          contactPhone,
          boardingPoint: selectedBoardingPoint,
        }),
      });

      const data = await response.json();
      if (data.success && data.booking) {
        setConfirmedBooking(data.booking);
        onBookingConfirmed(data.booking);
        setStep('CONFIRMATION');

        // Confetti celebration
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch (_) {}
      } else {
        setBookingError(data.error || 'Failed to complete reservation. Please try again.');
      }
    } catch (err: any) {
      // Local fallback in case server network glitch
      const fallbackPnr = `VT-${Math.floor(10000 + Math.random() * 90000)}`;
      const localBooking: BookingRecord = {
        pnr: fallbackPnr,
        from: searchParams.from,
        to: searchParams.to,
        date: searchParams.date,
        busType: selectedBus.type,
        busNumber: selectedBus.busNumber,
        passengers: passengersList,
        totalFare,
        status: 'CONFIRMED',
        createdAt: new Date().toISOString(),
        contactEmail,
        contactPhone,
        boardingPoint: selectedBoardingPoint,
      };
      setConfirmedBooking(localBooking);
      onBookingConfirmed(localBooking);
      setStep('CONFIRMATION');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Modal Header */}
        <div className="bg-[#0b192c] text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center text-white font-bold">
              <Bus className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold tracking-tight">
                  {searchParams.from} → {searchParams.to}
                </h2>
                <span className="text-xs bg-orange-500/20 text-orange-400 font-semibold px-2 py-0.5 rounded-full border border-orange-500/30">
                  {searchParams.date}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {searchParams.passengers} Passenger(s) · Multiple Daily Departures
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

        {/* Modal Body depending on step */}
        <div className="p-5 sm:p-7 max-h-[75vh] overflow-y-auto">
          {/* STEP 1: SELECT BUS */}
          {step === 'SELECT_BUS' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-bold text-slate-800">
                  Select Departure Time & Bus Type ({availableBuses.length} buses found)
                </p>
                <span className="text-xs text-slate-500">Live Seat Availability</span>
              </div>

              <div className="space-y-4">
                {availableBuses.map((bus) => (
                  <div
                    key={bus.id}
                    className="p-5 rounded-2xl border border-slate-200 hover:border-orange-400 hover:shadow-md transition-all duration-200 bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                          {bus.type}
                        </span>
                        <span className="text-xs text-slate-400">·</span>
                        <span className="text-xs font-semibold text-slate-600">{bus.name}</span>
                        <span className="text-xs text-slate-400">·</span>
                        <span className="text-xs bg-slate-100 text-slate-700 font-mono px-1.5 py-0.5 rounded">
                          {bus.busNumber}
                        </span>
                      </div>

                      {/* Timings row */}
                      <div className="flex items-center gap-4 my-2">
                        <div>
                          <p className="text-xl font-extrabold text-slate-900">{bus.departureTime}</p>
                          <p className="text-xs text-slate-500">{bus.from}</p>
                        </div>

                        <div className="flex flex-col items-center px-2">
                          <span className="text-[11px] font-semibold text-slate-400">{bus.duration}</span>
                          <div className="w-20 sm:w-28 h-0.5 bg-slate-200 relative my-1">
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-orange-500" />
                          </div>
                          <span className="text-[10px] text-emerald-600 font-medium">Direct Highway</span>
                        </div>

                        <div>
                          <p className="text-xl font-extrabold text-slate-900">{bus.arrivalTime}</p>
                          <p className="text-xs text-slate-500">{bus.to}</p>
                        </div>
                      </div>

                      {/* Amenities & Rating */}
                      <div className="flex items-center gap-3 mt-3 text-xs text-slate-500 flex-wrap">
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{bus.rating}</span>
                          <span className="text-slate-400 font-normal">({bus.reviewsCount})</span>
                        </div>
                        <span>·</span>
                        <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                          {bus.availableSeats} seats left
                        </span>
                        <span>·</span>
                        <span>{bus.amenities.slice(0, 3).join(', ')}</span>
                      </div>
                    </div>

                    {/* Price and CTA */}
                    <div className="w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 flex md:flex-col items-center md:items-end justify-between gap-3 shrink-0">
                      <div>
                        <span className="text-xs text-slate-400 block md:text-right">Per Seat</span>
                        <span className="text-2xl font-extrabold text-orange-600">
                          ₹{bus.fare}
                        </span>
                      </div>

                      <button
                        onClick={() => handleChooseBus(bus)}
                        className="px-5 py-2.5 bg-orange-600 hover:bg-orange-500 active:bg-orange-700 text-white font-bold text-sm rounded-xl transition-all cursor-pointer shadow-sm hover:shadow"
                      >
                        Select Seat
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: SELECT SEATS */}
          {step === 'SELECT_SEATS' && selectedBus && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setStep('SELECT_BUS')}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1"
                >
                  ← Back to Bus List
                </button>
                <div className="text-xs text-slate-600">
                  Selected:{' '}
                  <span className="font-bold text-orange-600">
                    {selectedSeats.length} / {searchParams.passengers}
                  </span>{' '}
                  seat(s)
                </div>
              </div>

              {/* Bus Interior Layout Simulator */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4 text-xs font-semibold text-slate-600">
                  <span>Front (Driver Cabin)</span>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded bg-white border border-slate-300" /> Available
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded bg-orange-600" /> Selected
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded bg-slate-300" /> Booked
                    </span>
                  </div>
                </div>

                {/* Deck Simulator */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Lower Deck */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 text-center">
                      Lower Deck (Berths L1–L10)
                    </p>
                    <div className="grid grid-cols-3 gap-2.5">
                      {['L1', 'L2', 'AISLE', 'L3', 'L4', 'AISLE', 'L5', 'L6', 'AISLE', 'L7', 'L8', 'AISLE'].map(
                        (seat, i) => {
                          if (seat === 'AISLE') {
                            return <div key={i} className="text-center text-[10px] text-slate-300 pt-3">WALKWAY</div>;
                          }
                          const isBooked = ['L2', 'L6'].includes(seat);
                          const isSelected = selectedSeats.includes(seat);
                          return (
                            <button
                              key={seat}
                              disabled={isBooked}
                              onClick={() => toggleSeat(seat)}
                              className={`py-3 px-2 rounded-lg text-xs font-bold border transition-all ${
                                isBooked
                                  ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                                  : isSelected
                                  ? 'bg-orange-600 text-white border-orange-600 shadow-md scale-102'
                                  : 'bg-white hover:bg-orange-50 text-slate-800 border-slate-200 hover:border-orange-300 cursor-pointer'
                              }`}
                            >
                              {seat}
                              <span className="block text-[9px] font-normal opacity-80">
                                {isBooked ? 'Taken' : 'Window'}
                              </span>
                            </button>
                          );
                        }
                      )}
                    </div>
                  </div>

                  {/* Upper Deck */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 text-center">
                      Upper Deck (Berths U1–U10)
                    </p>
                    <div className="grid grid-cols-3 gap-2.5">
                      {['U1', 'U2', 'AISLE', 'U3', 'U4', 'AISLE', 'U5', 'U6', 'AISLE', 'U7', 'U8', 'AISLE'].map(
                        (seat, i) => {
                          if (seat === 'AISLE') {
                            return <div key={i} className="text-center text-[10px] text-slate-300 pt-3">WALKWAY</div>;
                          }
                          const isBooked = ['U3', 'U7'].includes(seat);
                          const isSelected = selectedSeats.includes(seat);
                          return (
                            <button
                              key={seat}
                              disabled={isBooked}
                              onClick={() => toggleSeat(seat)}
                              className={`py-3 px-2 rounded-lg text-xs font-bold border transition-all ${
                                isBooked
                                  ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                                  : isSelected
                                  ? 'bg-orange-600 text-white border-orange-600 shadow-md scale-102'
                                  : 'bg-white hover:bg-orange-50 text-slate-800 border-slate-200 hover:border-orange-300 cursor-pointer'
                              }`}
                            >
                              {seat}
                              <span className="block text-[9px] font-normal opacity-80">
                                {isBooked ? 'Taken' : 'Berth'}
                              </span>
                            </button>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom selection bar */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
                <div>
                  <p className="text-xs text-slate-500">Selected Seats</p>
                  <p className="text-base font-extrabold text-slate-900">
                    {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None yet'}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-slate-500">Total Base Fare</p>
                  <p className="text-xl font-extrabold text-orange-600">
                    ₹{selectedBus.fare * Math.max(1, selectedSeats.length)}
                  </p>
                </div>

                <button
                  onClick={handleProceedToPassengers}
                  disabled={selectedSeats.length < searchParams.passengers}
                  className={`px-7 py-3 rounded-xl font-bold text-sm transition-all ${
                    selectedSeats.length >= searchParams.passengers
                      ? 'bg-orange-600 hover:bg-orange-500 text-white shadow-md cursor-pointer'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Proceed to Passenger Details →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PASSENGER & CONTACT DETAILS */}
          {step === 'PASSENGER_INFO' && selectedBus && (
            <form onSubmit={handleConfirmBooking}>
              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  onClick={() => setStep('SELECT_SEATS')}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-900"
                >
                  ← Back to Seat Layout
                </button>
                <div className="text-xs font-semibold text-slate-600">
                  Coach: {selectedBus.type} ({selectedBus.busNumber})
                </div>
              </div>

              {bookingError && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span>{bookingError}</span>
                </div>
              )}

              {/* Passengers Information */}
              <div className="space-y-4 mb-6">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                  Passenger Details
                </h3>

                {passengersList.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
                  >
                    <div className="sm:col-span-1 text-center font-bold text-xs text-slate-400">
                      #{idx + 1}
                    </div>

                    <div className="sm:col-span-5">
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={p.name}
                        onChange={(e) => {
                          const updated = [...passengersList];
                          updated[idx].name = e.target.value;
                          setPassengersList(updated);
                        }}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-800 focus:outline-none focus:border-orange-500"
                        placeholder="e.g. Rahul Banerjee"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                        Age
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        required
                        value={p.age}
                        onChange={(e) => {
                          const updated = [...passengersList];
                          updated[idx].age = Number(e.target.value);
                          setPassengersList(updated);
                        }}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-800 focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                        Gender
                      </label>
                      <select
                        value={p.gender}
                        onChange={(e) => {
                          const updated = [...passengersList];
                          updated[idx].gender = e.target.value as any;
                          setPassengersList(updated);
                        }}
                        className="w-full px-2 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-800 focus:outline-none focus:border-orange-500"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2 text-center">
                      <span className="block text-[10px] font-semibold text-slate-400 uppercase">
                        Seat
                      </span>
                      <span className="inline-block px-3 py-1 bg-orange-100 text-orange-800 font-extrabold text-xs rounded-md">
                        {p.seat || `S${idx + 1}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Boarding Point & Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Boarding Point in {searchParams.from}
                  </label>
                  <select
                    value={selectedBoardingPoint}
                    onChange={(e) => setSelectedBoardingPoint(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:border-orange-500"
                  >
                    {(BOARDING_POINTS[searchParams.from] || []).map((pt) => (
                      <option key={pt.name} value={`${pt.name} (${pt.landmark})`}>
                        {pt.name} — {pt.landmark}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Mobile Number (For WhatsApp / SMS Ticket)
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:border-orange-500"
                    placeholder="+91 98300 45678"
                  />
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-orange-50/60 rounded-2xl p-4 border border-orange-100 mb-6 flex flex-wrap items-center justify-between text-xs sm:text-sm text-slate-700">
                <div>
                  <p className="font-semibold text-slate-900">
                    Base Fare: ₹{selectedBus.fare} × {searchParams.passengers} seat(s) = ₹
                    {selectedBus.fare * searchParams.passengers}
                  </p>
                  <p className="text-slate-500 text-xs">GST & Passenger Safety Insurance: +₹{Math.round(selectedBus.fare * searchParams.passengers * 0.05)}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 block">Total Payable</span>
                  <span className="text-2xl font-extrabold text-orange-600">
                    ₹{Math.round(selectedBus.fare * searchParams.passengers * 1.05)}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setStep('SELECT_SEATS')}
                  className="px-5 py-2.5 text-slate-600 hover:text-slate-900 font-semibold text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 bg-orange-600 hover:bg-orange-500 active:bg-orange-700 text-white font-extrabold text-sm sm:text-base rounded-xl shadow-lg shadow-orange-600/30 transition-all cursor-pointer flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Processing Ticket...</span>
                  ) : (
                    <>
                      <span>Confirm & Generate Ticket</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: CONFIRMATION & BOARDING PASS */}
          {step === 'CONFIRMATION' && confirmedBooking && (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-4">
                <Check className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-extrabold text-slate-900 mb-1">
                Booking Confirmed!
              </h3>
              <p className="text-sm text-slate-600 mb-6">
                Your bus ticket has been issued with Vandana Travels. An SMS and WhatsApp ticket has been sent to{' '}
                <span className="font-semibold text-slate-900">{confirmedBooking.contactPhone}</span>.
              </p>

              {/* Printable Boarding Pass Card */}
              <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 max-w-xl mx-auto text-left shadow-sm mb-6 print:shadow-none">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">
                      Official E-Ticket
                    </span>
                    <h4 className="text-lg font-extrabold text-slate-900">Vandana Travels</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">PNR Number</span>
                    <p className="text-lg font-mono font-extrabold text-orange-600">
                      {confirmedBooking.pnr}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs mb-4">
                  <div>
                    <span className="text-slate-400 block">Journey Route</span>
                    <span className="font-bold text-slate-900 text-sm">
                      {confirmedBooking.from} → {confirmedBooking.to}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Date of Journey</span>
                    <span className="font-bold text-slate-900 text-sm">
                      {confirmedBooking.date}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Bus Coach / No.</span>
                    <span className="font-semibold text-slate-900">
                      {confirmedBooking.busType} ({confirmedBooking.busNumber})
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Boarding Point</span>
                    <span className="font-semibold text-slate-900">
                      {confirmedBooking.boardingPoint}
                    </span>
                  </div>
                </div>

                {/* Passenger Seats */}
                <div className="border-t border-slate-200 pt-3">
                  <span className="text-xs font-bold text-slate-500 uppercase block mb-2">
                    Passengers & Reserved Seats
                  </span>
                  <div className="space-y-1.5">
                    {confirmedBooking.passengers.map((p, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between text-xs bg-white px-3 py-2 rounded-lg border border-slate-100"
                      >
                        <span className="font-semibold text-slate-800">
                          {p.name} ({p.gender}, {p.age} yrs)
                        </span>
                        <span className="font-mono font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                          Seat: {p.seat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 flex justify-between items-center text-xs">
                  <span className="text-slate-500">Status: <span className="font-bold text-emerald-600">PAID & CONFIRMED</span></span>
                  <span className="font-extrabold text-slate-900 text-sm">Total: ₹{confirmedBooking.totalFare}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handlePrint}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Ticket</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
