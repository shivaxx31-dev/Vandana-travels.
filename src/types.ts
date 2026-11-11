export interface RouteStop {
  name: string;
  landmark: string;
  timeFromStart: string;
  isRestStop?: boolean;
}

export interface RouteItem {
  id: string;
  from: string;
  to: string;
  name: string;
  startingFare: number;
  duration: string;
  distance: string;
  image: string;
  description: string;
  departuresDaily: number;
  highway: string;
  bestTimeToVisit: string;
  touristHighlights: string[];
  stops: RouteStop[];
  dropPoints: string[];
  timetable: {
    serviceName: string;
    type: string;
    departure: string;
    arrival: string;
    fare: number;
  }[];
  travelTips: string[];
}

export interface BusSchedule {
  id: string;
  busNumber: string;
  name: string;
  type: 'AC Sleeper (2+1)' | 'AC Seater (Volvo)' | 'Non-AC Seater' | 'Bharat Benz Executive';
  departureTime: string;
  arrivalTime: string;
  duration: string;
  from: string;
  to: string;
  boardingPoint: string;
  droppingPoint: string;
  fare: number;
  availableSeats: number;
  rating: number;
  reviewsCount: number;
  amenities: string[];
}

export interface Passenger {
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  seat: string;
}

export interface BookingRecord {
  pnr: string;
  from: string;
  to: string;
  date: string;
  busType: string;
  busNumber: string;
  passengers: Passenger[];
  totalFare: number;
  status: 'CONFIRMED' | 'CANCELLED';
  createdAt: string;
  contactEmail: string;
  contactPhone: string;
  boardingPoint: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  location: string;
  route: string;
  rating: number;
  avatar: string;
}

export interface FleetItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  capacity: string;
  layout: string;
  features: string[];
  specs: {
    engine: string;
    suspension: string;
    safety: string;
    cooling: string;
  };
  seatMapType: 'sleeper' | 'seater' | 'standard';
  dimensions: string;
  topSpeed: string;
  fuelType: string;
}

export type ActivePage = 'home' | 'routes' | 'fleet' | 'manage' | 'about' | 'contact';
