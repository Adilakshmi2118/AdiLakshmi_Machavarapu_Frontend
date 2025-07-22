// BookingCard.js
import React from 'react';
import './BookingCard.css';

const BookingCard = ({ booking }) => {
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="booking-card">
      <img src={booking.roomImage} alt="Room" className="booking-image" />
      <div className="booking-info">
        <h3 className="room-type">{booking.roomType}</h3>
        <p><strong>Check-in:</strong> {formatDate(booking.checkIn)}</p>
        <p><strong>Check-out:</strong> {formatDate(booking.checkOut)}</p>
        <p><strong>Guests:</strong> {booking.guests}</p>
        <p><strong>Payment:</strong> {booking.paymentMode}</p>
      </div>
    </div>
  );
};

export default BookingCard;
