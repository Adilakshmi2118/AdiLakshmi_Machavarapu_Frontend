// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import RoomDetails from './pages/RoomDetails';
import QuickBooking from './pages/QuickBooking';
import MyStays from './pages/MyStays';
import Auth from './pages/Auth';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/room/:id" element={<RoomDetails />} />
        <Route path="/quickbooking" element={<QuickBooking />} />
        <Route path="/mystays" element={<MyStays />} />
        <Route path="/auth" element={<Auth />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
