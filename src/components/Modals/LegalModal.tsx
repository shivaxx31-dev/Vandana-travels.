import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  tab?: 'privacy' | 'terms';
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  tab = 'terms',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        <div className="bg-[#0b192c] text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-orange-500" />
            <h2 className="text-lg font-extrabold tracking-tight">
              {tab === 'privacy' ? 'Privacy Policy' : 'Terms, Conditions & Cancellation Policy'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 max-h-[72vh] overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p className="font-semibold text-slate-900">
            Official travel policies of Vandana Travels Pvt. Ltd., Kolkata.
          </p>

          <h3 className="font-bold text-slate-900 text-sm mt-4">1. Ticket Booking & Reporting</h3>
          <p>
            Passengers must arrive at their designated boarding point at least 20 minutes prior to scheduled departure. Valid government photo identification (Aadhaar, Voter ID, Passport, or Driving License) must be presented alongside the SMS/WhatsApp e-ticket.
          </p>

          <h3 className="font-bold text-slate-900 text-sm mt-4">2. Baggage Allowances</h3>
          <p>
            Each passenger is entitled to carry up to 20kg of standard luggage in the secure under-hold luggage compartments and one 7kg cabin backpack. Flammable, corrosive, or illegal substances are strictly prohibited on board.
          </p>

          <h3 className="font-bold text-slate-900 text-sm mt-4">3. Cancellation & Refund Policy</h3>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5 font-mono text-xs">
            <p>• More than 24 hours prior to departure: 100% refund (minus payment gateway fee)</p>
            <p>• Between 12 to 24 hours prior: 80% refund</p>
            <p>• Between 4 to 12 hours prior: 50% refund</p>
            <p>• Less than 4 hours or No-Show: Non-refundable</p>
          </div>

          <h3 className="font-bold text-slate-900 text-sm mt-4">4. Passenger Safety & Conduct</h3>
          <p>
            Vandana Travels coaches are equipped with active CCTV cameras and speed governors adhering to AIS-140 safety directives. Consumption of alcohol or tobacco onboard is strictly prohibited.
          </p>
        </div>
      </div>
    </div>
  );
};
