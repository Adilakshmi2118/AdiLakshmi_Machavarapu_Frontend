// src/components/explore/RoomCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './RoomCard.css';

function RoomCard({ room }) {
  return (
    <Link to={`/room/${room._id}`} className="room-link">
      <div className="room-card">
        <img
          src={room.image.startsWith('/assets') ? room.image : `/assets/${room.image}`}
          alt={room.name}
          className="room-card-img"
          />

        <div className="room-info">
          <h3>{room.name}</h3>
          <p className="price">₹{room.price} / night</p>
          <p className="desc">{room.description}</p>
          <button className="details-btn">View Details</button>
        </div>
      </div>
    </Link>
  );
}

export default RoomCard;
