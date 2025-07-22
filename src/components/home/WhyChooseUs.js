// src/components/home/WhyChooseUs.js
import React from 'react';
import './WhyChooseUs.css';
import { FaShieldAlt, FaMoneyBillAlt, FaClock } from 'react-icons/fa';

function WhyChooseUs() {
  return (
    <section className="why-us">
      <h2>Why Choose Us?</h2>
      <div className="features">
        <div className="feature-card">
          <FaMoneyBillAlt size={32} />
          <h3>Affordable</h3>
          <p>Budget-friendly rooms for every traveler.</p>
        </div>
        <div className="feature-card">
          <FaShieldAlt size={32} />
          <h3>Secure</h3>
          <p>Your data and payments are always safe.</p>
        </div>
        <div className="feature-card">
          <FaClock size={32} />
          <h3>24x7 Support</h3>
          <p>Always here to assist you, day or night.</p>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
