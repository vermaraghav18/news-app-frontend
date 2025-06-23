import React from 'react';
import './AdBanner.css';
import aiBanner from '../assets/ai-tools-banner.jpg'; // Use your banner path

function AdBanner() {
  return (
    <div className="ad-banner">
      <span className="sponsored">Sponsored</span>
      <div className="ad-content">
        <div className="ad-text">
          <h3>🧠 Supercharge Your Workflow with <strong>AI Tools</strong></h3>
          <p>Discover the top 10 AI tools saving you hours every week. Trusted by 20,000+ creators.</p>
          <a href="https://example.com" target="_blank" rel="noopener noreferrer">Explore Now →</a>
        </div>
        <img src={aiBanner} alt="AI Tools Banner" className="ad-image" />
      </div>
    </div>
  );
}

export default AdBanner;
