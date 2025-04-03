import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Phone } from 'lucide-react';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import BookingPage from './pages/BookingPage';
import BlogPage from './pages/BlogPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import FAQ from './pages/FAQ';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/om-oss" element={<AboutUs />} />
        <Route path="/tjanster" element={<ServicesPage />} />
        <Route path="/blogg" element={<BlogPage />} />
        <Route path="/kontakt" element={<ContactPage />} />
        <Route path="/boka" element={<BookingPage />} />
        <Route path="/integritetspolicy" element={<PrivacyPolicy />} />
        <Route path="/villkor" element={<Terms />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>

      {/* Sticky Phone Button */}
      <a
        href="tel:0735518845"
        className="sticky-phone fixed bottom-8 right-8 h-16 bg-primary text-white rounded-full flex items-center shadow-lg hover:bg-primary-hover z-50"
      >
        <span className="icon-container">
          <Phone className="h-8 w-8" />
        </span>
        <span className="phone-number font-semibold">073-551 88 45</span>
      </a>
    </div>
  );
}

export default App;