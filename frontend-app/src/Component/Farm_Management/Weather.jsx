import React, { useEffect, useState } from 'react';
import './Weather.css';
import axios from 'axios';

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Nashik'); // Default city
  const [error, setError] = useState('');

 const API_KEY = '97428254d887c3ebf72550b2c1e33f6a';


  const fetchWeather = async () => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    console.log("Fetching URL:", url);  // ✅ Log URL

    const res = await axios.get(url);
    const data = res.data;

    setWeatherData({
      temperature: data.main.temp,
      humidity: data.main.humidity,
      rainfall: data.rain?.['1h'] || 0,
      windSpeed: data.wind.speed,
      condition: data.weather[0].description,
    });

    setError('');
  } catch (err) {
    console.error("Weather fetch error:", err);  // ✅ Log error
    setError('City not found or API error.');
  }
};


  useEffect(() => {
    fetchWeather();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="weather-container">
      <h1>🌦 Live Weather Dashboard</h1>

      <form onSubmit={handleSearch} className="city-form">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {error && <p className="error">{error}</p>}

      {weatherData ? (
        <div className="weather-preview">
          <h3>📍 {city.toUpperCase()}</h3>
          <p><strong>🌡 Temperature:</strong> {weatherData.temperature}°C</p>
          <p><strong>💧 Humidity:</strong> {weatherData.humidity}%</p>
          <p><strong>🌧 Rainfall:</strong> {weatherData.rainfall} mm</p>
          <p><strong>💨 Wind Speed:</strong> {weatherData.windSpeed} km/h</p>
          <p><strong>🌤 Condition:</strong> {weatherData.condition}</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}

export default Weather;
