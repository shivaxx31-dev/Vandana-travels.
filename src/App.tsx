/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TopBar } from './components/TopBar.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { BookingWidget } from './components/BookingWidget.tsx';
import { PopularRoutes } from './components/PopularRoutes.tsx';
import { WhyChooseUs } from './components/WhyChooseUs.tsx';
import { OurFleet } from './components/OurFleet.tsx';
import { Testimonials } from './components/Testimonials.tsx';
import { FinalCTA } from './components/FinalCTA.tsx';
import { Footer } from './components/Footer.tsx';

// Dedicated Detailed Pages
import { RoutesPage } from './pages/RoutesPage.tsx';
import { FleetPage } from './pages/FleetPage.tsx';
import { ManageBookingPage } from './pages/ManageBookingPage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';

// Interactive Modals & AI Tools
import { SearchResultsModal } from './components/Modals/SearchResultsModal.tsx';
import { ManageBookingModal } from './components/Modals/ManageBookingModal.tsx';
import { FleetDetailModal } from './components/Modals/FleetDetailModal.tsx';
import { AboutUsModal } from './components/Modals/AboutUsModal.tsx';
import { ContactModal } from './components/Modals/ContactModal.tsx';
import { LegalModal } from './components/Modals/LegalModal.tsx';
import { VandanaAIChat } from './components/VandanaAIChat.tsx';
import { MobileBottomNav } from './components/MobileBottomNav.tsx';

import { RouteItem, FleetItem, BookingRecord, ActivePage } from './types.ts';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');

  // Booking search modal state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchParams, setSearchParams] = useState({
    from: 'Kolkata',
    to: 'Digha',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    passengers: 1,
  });

  // Manage booking modal state
  const [isManageBookingModalOpen, setIsManageBookingModalOpen] = useState(false);
  const [latestBooking, setLatestBooking] = useState<BookingRecord | null>(null);

  // Fleet detail modal state
  const [isFleetModalOpen, setIsFleetModalOpen] = useState(false);
  const [selectedFleetItem, setSelectedFleetItem] = useState<FleetItem | null>(null);

  // About, Contact & Legal modals
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<'privacy' | 'terms'>('terms');

  // Navigation and Action Handlers
  const handleNavigate = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBooking = () => {
    if (activePage !== 'home') {
      setActivePage('home');
      setTimeout(() => {
        const el = document.getElementById('booking-widget');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    } else {
      const el = document.getElementById('booking-widget');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handleSearchSubmit = (params: {
    from: string;
    to: string;
    date: string;
    passengers: number;
  }) => {
    setSearchParams(params);
    setIsSearchOpen(true);
  };

  const handleSelectPopularRoute = (route: RouteItem) => {
    setSearchParams({
      from: route.from,
      to: route.to,
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      passengers: 1,
    });
    setIsSearchOpen(true);
  };

  const handleBookRouteDirect = (from: string, to: string) => {
    setSearchParams((prev) => ({
      ...prev,
      from,
      to,
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      passengers: 1,
    }));
    setIsSearchOpen(true);
  };

  const handleOpenFleetModal = (item?: FleetItem) => {
    if (item) setSelectedFleetItem(item);
    setIsFleetModalOpen(true);
  };

  const handleBookingConfirmed = (booking: BookingRecord) => {
    setLatestBooking(booking);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans antialiased selection:bg-orange-500 selection:text-white pb-16 md:pb-0">
      {/* SECTION 1 — TOP INFORMATION BAR */}
      <TopBar
        onNavigate={handleNavigate}
        onOpenManageBookingModal={() => setIsManageBookingModalOpen(true)}
      />

      {/* SECTION 2 — MAIN NAVIGATION */}
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        onBookNowClick={scrollToBooking}
      />

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activePage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {/* SECTION 3 — HERO SECTION */}
              <Hero onBookClick={scrollToBooking} />

              {/* SECTION 4 — BUS BOOKING WIDGET (Overlaps bottom of Hero) */}
              <BookingWidget
                onSearch={handleSearchSubmit}
                initialFrom={searchParams.from}
                initialTo={searchParams.to}
              />

              {/* SECTION 5 — POPULAR ROUTES */}
              <PopularRoutes
                onSelectRoute={handleSelectPopularRoute}
                onViewAllRoutes={() => handleNavigate('routes')}
              />

              {/* SECTION 6 — WHY CHOOSE VANDANA TRAVELS */}
              <WhyChooseUs onGetToKnowUsClick={() => handleNavigate('about')} />

              {/* SECTION 7 — OUR FLEET */}
              <OurFleet
                onViewFleetClick={(item) => handleOpenFleetModal(item)}
                onExploreAllFleet={() => handleNavigate('fleet')}
              />

              {/* SECTION 8 — CUSTOMER TESTIMONIALS */}
              <Testimonials />

              {/* SECTION 9 — FINAL CTA */}
              <FinalCTA onBookNowClick={scrollToBooking} />
            </motion.div>
          )}

          {activePage === 'routes' && (
            <motion.div
              key="routes"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <RoutesPage onBookRoute={handleBookRouteDirect} />
            </motion.div>
          )}

          {activePage === 'fleet' && (
            <motion.div
              key="fleet"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <FleetPage onBookNow={scrollToBooking} />
            </motion.div>
          )}

          {activePage === 'manage' && (
            <motion.div
              key="manage"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <ManageBookingPage
                initialPnr={latestBooking ? latestBooking.pnr : 'VT-89421'}
                onBookNew={scrollToBooking}
              />
            </motion.div>
          )}

          {activePage === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <AboutPage onBookNow={scrollToBooking} />
            </motion.div>
          )}

          {activePage === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <ContactPage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* SECTION 10 — FOOTER */}
      <Footer
        onNavigate={handleNavigate}
        onOpenPrivacyPolicy={() => {
          setLegalTab('privacy');
          setIsLegalModalOpen(true);
        }}
        onOpenTerms={() => {
          setLegalTab('terms');
          setIsLegalModalOpen(true);
        }}
      />

      {/* MODALS & OVERLAYS */}
      {/* 1. Live Bus Search & Seat Selection Modal */}
      <SearchResultsModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        searchParams={searchParams}
        onBookingConfirmed={handleBookingConfirmed}
      />

      {/* 2. Manage Booking / Lookup Modal */}
      <ManageBookingModal
        isOpen={isManageBookingModalOpen}
        onClose={() => setIsManageBookingModalOpen(false)}
        recentBooking={latestBooking}
      />

      {/* 3. Fleet Technical Specifications Showcase Modal */}
      <FleetDetailModal
        isOpen={isFleetModalOpen}
        onClose={() => setIsFleetModalOpen(false)}
        selectedFleetItem={selectedFleetItem}
        onBookNow={scrollToBooking}
      />

      {/* 4. About Us Modal */}
      <AboutUsModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
        onBookNow={scrollToBooking}
      />

      {/* 5. Contact & Terminal Counters Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      {/* 6. Legal & Terms Modal */}
      <LegalModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        tab={legalTab}
      />

      {/* 7. Floating Vandana AI Multi-Turn Travel Assistant */}
      <VandanaAIChat
        onSearchBuses={(from, to) => {
          setSearchParams((prev) => ({ ...prev, from, to }));
          setIsSearchOpen(true);
        }}
      />

      {/* 8. Mobile Bottom Navigation Bar (1-tap quick navigation for mobile users) */}
      <MobileBottomNav
        activePage={activePage}
        onNavigate={handleNavigate}
        onQuickBook={scrollToBooking}
      />
    </div>
  );
}
