import React, { useState, useEffect } from "react";
import "./GovernmentSchemes.css"; // Import CSS

const schemes = [
  {
    schemeName: "PM Kisan Samman Nidhi",
    category: "Subsidy",
    eligibleCrops: ["Wheat", "Rice"],
    description: "Direct income support of ₹6000 per year to farmers.",
    lastDate: "2025-12-31",
    link: "https://pmkisan.gov.in/"
  },
  {
    schemeName: "Soil Health Card",
    category: "Soil Management",
    eligibleCrops: ["All Crops"],
    description: "Provides farmers with soil nutrient status and recommendations.",
    lastDate: "2025-06-30",
    link: "https://soilhealth.dac.gov.in/"
  }
];

export default function GovernmentSchemes() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [newScheme, setNewScheme] = useState(null);

  useEffect(() => {
    // Simulate new scheme coming from API
    setTimeout(() => {
      setNewScheme({
        schemeName: "Organic Farming Subsidy",
        description: "Government support for organic crop cultivation.",
      });
    }, 2000);
  }, []);

  return (
    <div className="schemes-container">
      <h2 className="schemes-title">🌾 Government Schemes & Subsidy Alerts</h2>

      {/* ✅ New Scheme Alert Box */}
      {newScheme && (
        <div className="new-scheme-alert">
          🚨 New Scheme Launched: <strong>{newScheme.schemeName}</strong> <br />
          {newScheme.description}
        </div>
      )}

      {/* Filter Dropdown */}
      <div className="filter-box">
        <label className="filter-label">Filter by Category:</label>
        <select
          className="filter-select"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Subsidy">Subsidy</option>
          <option value="Soil Management">Soil Management</option>
        </select>
      </div>

      {/* Scheme Cards */}
      <div className="schemes-grid">
        {schemes
          .filter(
            (s) =>
              selectedCategory === "All" || s.category === selectedCategory
          )
          .map((scheme, index) => (
            <div key={index} className="scheme-card">
              <h3 className="scheme-name">{scheme.schemeName}</h3>
              <p className="scheme-description">{scheme.description}</p>
              <p className="scheme-crops">
                <strong>Eligible Crops:</strong> {scheme.eligibleCrops.join(", ")}
              </p>
              <p className="scheme-date">Last Date: {scheme.lastDate}</p>
              <a
                href={scheme.link}
                target="_blank"
                rel="noreferrer"
                className="scheme-link"
              >
                Learn More
              </a>
            </div>
          ))}
      </div>
    </div>
  );
}
