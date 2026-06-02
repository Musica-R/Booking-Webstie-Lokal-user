import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import './App.css';
import LoginPage from './components/Login';
import Profile from './components/Profile';
import BookingService from './pages/Bookingservice';
import BecomeVendor from './pages/BecomVendor';
import { VendorProvider } from './pages/Vendorcontext';
import ServicesPage from './pages/Servicespage';

function App() {
  return (
    <VendorProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<Profile />} />
            <Route path="/booking/:id" element={<BookingService />} />
            <Route path="/become-vendor" element={<BecomeVendor />} />
            <Route path="/services" element={<ServicesPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </VendorProvider>);
}

export default App;