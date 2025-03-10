import React, { useState } from "react";
import "./App.css"; // Import the external CSS
import sun from "./image/sun.webp";

const App = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = () => {
    if (!location) {
      alert("Please enter a location.");
      return; //if location is empty
    }
    const apiKey = "d2b7ffd7bb5f4506a4545143251003";
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert("Location not found. Please try again.");
          setWeatherData(null);
        } else {
          setWeatherData(data);
        }
      })
      .catch(() => {
        alert("Error fetching data. Please try again.");
      });
  };

  return (
    <div className="main">
      <div className="header">
        <img className="App-logo" src={sun} alt="sun" />
        <h1>Weather App</h1>
        <img className="App-logo" src={sun} alt="sun" />
      </div>
      <input className="location-input" type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter city"
      />
      <br />
      <br />
      <button className="get-weather-button" onClick={fetchWeather}>
        Get Weather Details</button>
         {weatherData && (
        <div className="weather-info">
          <h2>Weather in {weatherData.location.name}</h2>
          <h3><i>Temperature:</i> {weatherData.current.temp_c}°C</h3>
          <p><b>Weather descriptors:</b> {weatherData.current.condition.text}</p>
          <img src={weatherData.current.condition.icon} alt="weather icon" />
          <br />
          <p> <b>Humidity:</b> {weatherData.current.humidity} </p>
        </div>
      )}
    </div>
  );
};

export default App;
