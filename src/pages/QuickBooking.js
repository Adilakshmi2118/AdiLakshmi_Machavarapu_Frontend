import React, { useState, useEffect, useRef } from 'react';
import './QuickBooking.css';
import Confetti from 'react-confetti';
import { useLocation, useNavigate } from 'react-router-dom';


const QuickBooking = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const popupRef = useRef(null);

  const { roomName, roomImage, checkIn, checkOut, guests } = state || {};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    checkIn: checkIn || '',
    checkOut: checkOut || '',
    guests: guests || 1,
    payment: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.checkIn) newErrors.checkIn = 'Check-in date required';
    if (!formData.checkOut) newErrors.checkOut = 'Check-out date required';
    if (formData.checkIn && formData.checkOut && formData.checkIn > formData.checkOut)
      newErrors.checkOut = 'Check-out must be after Check-in';
    if (!formData.payment) newErrors.payment = 'Select a payment mode';
    return newErrors;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validateForm();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  try {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('bookings')) || [];
    const newBooking = {
      id: Date.now(),
      roomType: roomName,
      roomImage,
      name: formData.name,
      email: formData.email,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      guests: formData.guests,
      paymentMode: formData.payment,
    };

    localStorage.setItem('bookings', JSON.stringify([...existing, newBooking]));

    const audio = new Audio('/assets/success.mp3');
    audio.play();
    setShowSuccess(true);
    setLoading(false);

    setTimeout(() => {
      setShowSuccess(false);
      navigate('/my-stays');
    }, 4000);
  } catch (err) {
    console.error(err);
    alert('Booking failed. Please try again.');
    setLoading(false);
  }
};


  // Click outside popup to close
  useEffect(() => {
    const handleClickOutside = e => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowSuccess(false);
      }
    };
    if (showSuccess) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSuccess]);

  return (
    <div className="quick-booking-container">
      <h2>Quick Booking</h2>

      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back to Room Details
      </button>

      <form onSubmit={handleSubmit} className="quick-booking-form">
        <div className="form-group">
          <label>Room Type:</label>
          <p>{roomName || 'Not specified'}</p>
          {roomImage && <img src={roomImage} alt="Room" className="room-preview" />}
        </div>

        <div className="form-group">
          <label>Name:</label>
          <input name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Check-In:</label>
            <input type="date" name="checkIn" value={formData.checkIn} onChange={handleChange} />
            {errors.checkIn && <span className="error">{errors.checkIn}</span>}
          </div>

          <div className="form-group">
            <label>Check-Out:</label>
            <input type="date" name="checkOut" value={formData.checkOut} onChange={handleChange} />
            {errors.checkOut && <span className="error">{errors.checkOut}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>Guests:</label>
          <input
            type="number"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            min={1}
          />
        </div>

        <div className="form-group">
          <label>Payment Mode:</label>
          <select name="payment" value={formData.payment} onChange={handleChange}>
            <option value="">Select</option>
            <option value="card">Credit/Debit Card</option>
            <option value="upi">UPI</option>
            <option value="cash">Cash on Arrival</option>
          </select>
          {errors.payment && <span className="error">{errors.payment}</span>}
        </div>

        <button type="submit" className="confirm-btn" disabled={loading}>
          {loading ? 'Booking...' : 'Confirm Booking'}
        </button>
      </form>

      {showSuccess && (
        <div className="success-popup">
          <Confetti />
          <div className="success-box" ref={popupRef}>
            <h3>🎉 Booking Confirmed!</h3>
            <img src={roomImage} alt="Room" className="room-confirm-img" />
            <p>Thank you for booking <strong>{roomName}</strong> with us.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickBooking;
