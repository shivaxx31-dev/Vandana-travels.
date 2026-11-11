import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import dotenv from 'dotenv';
import { POPULAR_ROUTES, FLEET_LIST, SAMPLE_SCHEDULES, BOARDING_POINTS } from './src/data/mockData.ts';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy Gemini client helper
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// In-memory mock booking store for realistic user workflow
interface BookingRecord {
  pnr: string;
  from: string;
  to: string;
  date: string;
  busType: string;
  busNumber: string;
  passengers: { name: string; age: number; gender: string; seat: string }[];
  totalFare: number;
  status: 'CONFIRMED' | 'CANCELLED';
  createdAt: string;
  contactEmail: string;
  contactPhone: string;
  boardingPoint: string;
}

const bookingsStore: Map<string, BookingRecord> = new Map([
  [
    'VT-89421',
    {
      pnr: 'VT-89421',
      from: 'Kolkata',
      to: 'Puri',
      date: '2026-11-15',
      busType: 'AC Sleeper (2+1)',
      busNumber: 'WB 02 B 9134',
      passengers: [{ name: 'Debashis Roy', age: 34, gender: 'Male', seat: 'U4' }],
      totalFare: 892,
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
      contactEmail: 'debashis@example.com',
      contactPhone: '+91 98300 45678',
      boardingPoint: 'Esplanade Bus Terminus, Kolkata',
    },
  ],
  [
    'VT-55012',
    {
      pnr: 'VT-55012',
      from: 'Kolkata',
      to: 'Digha',
      date: '2026-11-12',
      busType: 'AC Seater (Volvo)',
      busNumber: 'WB 02 B 4589',
      passengers: [
        { name: 'Ananya Sen', age: 29, gender: 'Female', seat: 'W12' },
        { name: 'Rahul Banerjee', age: 31, gender: 'Male', seat: 'W13' },
      ],
      totalFare: 735,
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
      contactEmail: 'ananya.sen@example.com',
      contactPhone: '+91 98301 23456',
      boardingPoint: 'Karunamoyee International Terminal, Salt Lake',
    },
  ],
]);

// 1. Booking API
app.post('/api/bookings', (req, res) => {
  const { from, to, date, busType, busNumber, passengers, totalFare, contactEmail, contactPhone, boardingPoint } = req.body;

  if (!from || !to || !passengers || passengers.length === 0) {
    return res.status(400).json({ error: 'Missing required booking details' });
  }

  const randomNum = Math.floor(10000 + Math.random() * 90000);
  const pnr = `VT-${randomNum}`;

  const newBooking: BookingRecord = {
    pnr,
    from,
    to,
    date: date || new Date().toISOString().split('T')[0],
    busType: busType || 'AC Sleeper (2+1)',
    busNumber: busNumber || 'WB 02 B 4589',
    passengers,
    totalFare: totalFare || 850,
    status: 'CONFIRMED',
    createdAt: new Date().toISOString(),
    contactEmail: contactEmail || 'passenger@vandanatravels.in',
    contactPhone: contactPhone || '+91 98300 45678',
    boardingPoint: boardingPoint || 'Esplanade Terminus, Kolkata',
  };

  bookingsStore.set(pnr, newBooking);

  res.json({
    success: true,
    message: 'Booking confirmed successfully!',
    booking: newBooking,
  });
});

// 3. Manage Booking Lookup & Cancel
app.get('/api/bookings/:pnr', (req, res) => {
  const pnr = (req.params.pnr || '').toUpperCase().trim();
  const booking = bookingsStore.get(pnr);
  if (!booking) {
    return res.status(404).json({ error: 'No booking found with this PNR' });
  }
  res.json({ success: true, booking });
});

app.post('/api/bookings/:pnr/cancel', (req, res) => {
  const pnr = (req.params.pnr || '').toUpperCase().trim();
  const booking = bookingsStore.get(pnr);
  if (!booking) {
    return res.status(404).json({ error: 'No booking found with this PNR' });
  }
  booking.status = 'CANCELLED';
  bookingsStore.set(pnr, booking);
  res.json({
    success: true,
    message: 'Booking cancelled. Refund of 80% initiated to original payment source within 2-4 business days.',
    booking,
  });
});

// 4. Routes Catalogue API
app.get('/api/routes', (_req, res) => {
  res.json({ success: true, routes: POPULAR_ROUTES });
});

app.get('/api/routes/:id', (req, res) => {
  const route = POPULAR_ROUTES.find((r) => r.id === req.params.id);
  if (!route) {
    return res.status(404).json({ error: 'Route not found' });
  }
  res.json({ success: true, route });
});

// 5. Fleet Catalogue API
app.get('/api/fleet', (_req, res) => {
  res.json({ success: true, fleet: FLEET_LIST });
});

// 6. Inquiries & Charter Booking API
app.post('/api/inquiries', (req, res) => {
  const { name, phone, email, message, type = 'general' } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  res.json({
    success: true,
    inquiryId: `INQ-${Math.floor(1000 + Math.random() * 9000)}`,
    message: 'Inquiry received successfully. Our dispatch officer will contact you within 15 minutes.',
  });
});

// 7. Gemini AI Chatbot for Vandana Travels Concierge
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        reply:
          "Namaste! Welcome to Vandana Travels. Our fleet connects Kolkata with Digha, Puri, Bhubaneswar, Darjeeling, and Mandarmani with AC Sleeper, AC Seater, and Volvo services. For instant bookings, please use our booking panel above or call our 24x7 desk at +91 98300 45678.",
      });
    }

    const systemInstruction = `You are "Vandana AI", the official travel concierge and route expert for Vandana Travels — East India's premier bus transportation company headquartered in Kolkata, West Bengal.
Your tone is professional, warm, courteous, and exceptionally helpful (using polite greetings like "Namaste" or "Hello").
Key knowledge:
- Brand: Vandana Travels. Safe, comfortable, and reliable passenger bus transportation across India.
- Headquarters: Kolkata, West Bengal.
- Main Hubs & Boarding Points:
  1. Esplanade Bus Terminus (Opposite Metro Gate 5, Strand Road - 24x7 primary dispatch hub)
  2. Babughat Bus Stand (Near Eden Gardens & Circular Railway)
  3. Karunamoyee International Terminal (Salt Lake Sector II)
  4. Santragachi Station Bay (Howrah-Kona Expressway Flyover)
  5. Kolkata Airport (NSCBIA Gate No. 1, VIP Road Rotary)
- Top Routes & Fares:
  1. Kolkata → Digha (approx 4.5 hrs, starting ₹350, 8 daily departures)
  2. Kolkata → Puri (approx 9 hrs overnight, starting ₹750, 6 daily departures)
  3. Kolkata → Bhubaneswar (approx 8 hrs, starting ₹700, 5 daily departures)
  4. Kolkata → Darjeeling (approx 12 hrs scenic mountain route, starting ₹950, 4 daily departures)
  5. Kolkata → Mandarmani (approx 4 hrs, starting ₹380, 6 daily departures)
- Fleet:
  1. Luxury AC Sleeper (2+1 layout, memory foam mattresses, individual curtains, USB charging, reading lamps)
  2. Premium AC Seater (Volvo B11R 2+2 pushback recliner with wide legroom)
  3. Non-AC Seater (Budget-friendly, airy pushback seats)
- Onboard Amenities: Free bottled water, fresh sanitised blankets in sleepers, high-speed Wi-Fi, sanitized conditioned coaches, 2 experienced drivers on overnight journeys, emergency SOS button.
- Baggage: Up to 20kg free luggage per passenger in undercarriage hold + 7kg handbag.
- 24x7 Helpline: +91 98300 45678 | Email: support@vandanatravels.in
- Cancellation: >24h = 100% refund, 12-24h = 80%, 4-12h = 50%.
Provide concise, formatted, human responses. When users ask for booking, guide them to the booking widget on the page or suggest specific route departure times.`;

    const chat = ai.chats.create({
      model: 'gemini-3.8-flash',
      config: {
        systemInstruction,
      },
    });

    const response = await chat.sendMessage({
      message,
    });

    res.json({ reply: response.text });
  } catch (error: any) {
    console.error('Gemini chat error:', error);
    res.status(500).json({
      error: 'Failed to generate response',
      details: error.message || String(error),
    });
  }
});

// Mount Vite in dev mode
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Vandana Travels server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
