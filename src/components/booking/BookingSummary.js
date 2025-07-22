import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingSummary.css';

function BookingSummary({ room }) {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState('');

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getNights = () => {
    if (!checkIn || !checkOut) return 0;
    const diff = new Date(checkOut) - new Date(checkIn);
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const totalNights = getNights();
  const totalPrice = totalNights * room.price;

  const handleBookNow = () => {
    if (!checkIn || !checkOut) {
      setError('Please select both check-in and check-out dates.');
      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      setError('Check-out must be after check-in.');
      return;
    }

    if (new Date(checkIn) < new Date(getTodayDate())) {
      setError('Check-in date cannot be in the past.');
      return;
    }

    setError('');
    navigate('/quickbooking', {
      state: {
        roomId: room.id,
        roomName: room.name,
        roomImage: room.image,
        checkIn,
        checkOut,
        guests,
        totalPrice,
      },
    });
  };

  return (
    <div className="booking-summary">
      <h3>Book Your Stay</h3>

      <label>Check-In</label>
      <input
        type="date"
        min={getTodayDate()}
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
      />

      <label>Check-Out</label>
      <input
        type="date"
        min={checkIn || getTodayDate()}
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
      />

      <label>Guests</label>
      <input
        type="number"
        min="1"
        value={guests}
        onChange={(e) => setGuests(e.target.value)}
      />

      {error && <p className="error-msg" style={{ color: 'red' }}>{error}</p>}

      <div className="summary-total">
        <p>Price per Night: ₹{room.price}</p>
        <p>Total Nights: {totalNights}</p>
        <h4>Total: ₹{totalPrice || 0}</h4>
      </div>

      <button onClick={handleBookNow}>Book Now</button>
    </div>
  );
}

export default BookingSummary;
