import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookingSummary from '../components/booking/BookingSummary';
import rooms from '../components/data/dummyRooms'; // ✅ Import local data
import './RoomDetails.css';

function RoomDetails() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundRoom = rooms.find((r) => r._id === id);
    setRoom(foundRoom);
    setLoading(false);
  }, [id]);

  if (loading) return <div className="room-details">Loading...</div>;
  if (!room) return <div className="room-details"><h2>Room not found</h2></div>;

  return (
    <div className="room-details-container">
      {/* Left: Room Info */}
      <div className="room-info">
        <div className="room-banner">
          <img src={room.image} alt={room.name} />
        </div>
        <div className="room-content">
          <h2>{room.name}</h2>
          <p>{room.description}</p>
          <p><strong>Price:</strong> ₹{room.price} / night</p>
          <p><strong>Type:</strong> {room.type}</p>
          <p><strong>Amenities:</strong> {room.amenities?.join(', ')}</p>
        </div>
      </div>

      {/* Right: Booking Sidebar */}
      <div className="booking-sidebar">
        <BookingSummary room={room} />
      </div>
    </div>
  );
}

export default RoomDetails;
