import React, { useState } from 'react';
import { X, MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setPhone('');
      setMessage('');
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        <div className="bg-[#0b192c] text-white px-6 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold tracking-tight">Contact Vandana Travels</h2>
            <p className="text-xs text-slate-400">24×7 Passenger Help Desk & Terminal Counters</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
              <span className="font-bold text-orange-600 uppercase tracking-wide block mb-1">
                Head Office & Main Counter
              </span>
              <p className="font-bold text-slate-900 text-sm mb-1">Esplanade Central Terminus</p>
              <p className="text-slate-600 mb-2">Gate No. 5, Strand Road, Esplanade, Kolkata 700069</p>
              <p className="text-slate-500">Open 24 Hours Daily</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
              <span className="font-bold text-orange-600 uppercase tracking-wide block mb-1">
                Salt Lake Counter
              </span>
              <p className="font-bold text-slate-900 text-sm mb-1">Karunamoyee Bus Terminal</p>
              <p className="text-slate-600 mb-2">Bay 4, Sector II, Salt Lake City, Kolkata 700091</p>
              <p className="text-slate-500">06:00 AM – 11:30 PM Daily</p>
            </div>
          </div>

          <div className="mb-6 flex flex-wrap items-center justify-between p-4 bg-orange-50/60 rounded-2xl border border-orange-200 text-xs text-slate-800 gap-3">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-orange-600" />
              <span className="font-bold">+91 98300 45678 / +91 98301 98765</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-orange-600" />
              <span>support@vandanatravels.in</span>
            </div>
          </div>

          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center text-emerald-800">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
              <p className="font-bold text-base">Inquiry Submitted Successfully!</p>
              <p className="text-xs text-emerald-600 mt-1">
                Our support team will call or message you within 15 minutes.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                Send Direct Message / Charter Request
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ananya Sen"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98300 45678"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Message / Route Request
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Need group booking for Kolkata to Puri on upcoming weekend..."
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-orange-600 hover:bg-orange-500 active:bg-orange-700 text-white font-bold text-sm rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
