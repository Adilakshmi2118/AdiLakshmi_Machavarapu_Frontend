import React, { useEffect, useState } from 'react';
import './MyStays.css';
import BookingCard from '../components/dashboard/BookingCard';

const MyStays = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
  const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
  setBookings(storedBookings);
  setLoading(false);
}, []);


    
  if (loading) return <div className="loader">Loading...</div>;

  return (
    <div className="myStays">
      <h2 className="heading">My Stays</h2>
      {bookings.length === 0 ? (
        <p className="noBookings">No bookings found.</p>
      ) : (
        <div className="cardGrid">
          {bookings.map((booking, index) => (
            <BookingCard key={index} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyStays;
