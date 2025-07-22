// src/pages/Home.js
import React from 'react';
import WhyChooseUs from '../components/home/WhyChooseUs';
import './Home.css';

function Home() {
  return (
    <div className="home-page">
      <section
        className="hero"
        style={{
          backgroundImage: "url('/assets/hotel-banner.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          position: 'relative',
          color: 'white',
        }}
      >
        <div className="overlay">
          <h1>Welcome to Klassic Stay</h1>
          <p>Your comfort, our priority</p>
          <div className="cta-buttons">
            <a href="/explore" className="btn-primary">Explore Rooms</a>
            <a href="/auth" className="btn-secondary">Login / Register</a>
          </div>
        </div>
      </section>

      <WhyChooseUs />
    </div>
  );
}

export default Home;
