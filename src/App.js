import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import './App.css';
import LoginPage from './components/Login';
import SignupPage from "./components/Signup";
import Profile from './components/Profile';
import BookingService from './pages/Bookingservice';
import BecomeVendor from './pages/BecomVendor';
import { VendorProvider } from './pages/Vendorcontext';
import ServicesPage from './pages/Servicespage';
import VendorList from './pages/Vendorlist';       // ← add this
import ForgotPasswordPage from "./components/Forgotpassword";
import Activity from './pages/Activity';
import ActivityBooking from './pages/ActivityBooking';

function App() {
  return (
    <VendorProvider>
      <Router>

        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<Profile />} />
            <Route path="/category/:categoryId" element={<VendorList />} />  {/* ← add this */}
            <Route path="/booking/:id" element={<BookingService />} />
            <Route path="/activity-booking" element={<ActivityBooking />} />
            <Route path="/activity-booking/:activityName" element={<ActivityBooking />} />
            <Route path="/become-vendor" element={<BecomeVendor />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </VendorProvider>
  );
}

export default App;