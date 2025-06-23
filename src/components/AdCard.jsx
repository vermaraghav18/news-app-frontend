// src/components/AdCard.jsx
import React from 'react';
import './AdCard.css';
import aiBanner from '../assets/ai-tools-banner.jpg'; // You can replace this with any banner image you like

function AdCard() {
  return (
    <div className="ad-card">
      <div className="ad-header">Sponsored</div>
      <h2 className="ad-title">🧠 Supercharge Your Workflow with AI Tools</h2>
      <p className="ad-desc">
        Discover the top 10 AI tools that save you hours weekly. Used by 20,000+ creators worldwide.
      </p>
      <img src={aiBanner} alt="AI Tools Banner" className="ad-image" />
      <a
        href="https://example.com/ai-tools" // Replace with your real link
        target="_blank"
        rel="noopener noreferrer"
        className="ad-button"
      >
        Explore Now →
      </a>
    </div>
  );
}

export default AdCard;
