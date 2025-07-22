import React from 'react';
import RoomCard from '../components/explore/RoomCard';
import './Explore.css';
import rooms from '../components/data/dummyRooms';  // 💡 Local static data

function Explore() {
  return (
    <div className="explore-page">
      <h2>Explore Our Rooms</h2>
      <div className="room-grid">
        {rooms.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
}

export default Explore;
