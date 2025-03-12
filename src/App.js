import React, { useState, useEffect } from "react";
import "./App.css"; // Import the external CSS
import sun from "./image/sun.webp";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import 'animate.css'; // Import Animate.css

const MySwal = withReactContent(Swal);

const App = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [animationClass, setAnimationClass] = useState(""); // State for animation class

  // Trigger animation when weather data changes
  useEffect(() => {
    if (weatherData) {
      // Apply animation class when new weather data is set
      setAnimationClass("animate__animated animate__backInDown");

      // Remove the animation class after the animation is completed
      const timer = setTimeout(() => {
        setAnimationClass(""); // Reset animation class
      }, 1000); // Match the duration of the animation

      return () => clearTimeout(timer); // Cleanup timeout on component unmount or re-fetch
    }
  }, [weatherData]); // Runs whenever weatherData changes

  const fetchWeather = () => {
    if (!location) {
      alert("Please enter a location.");
      return; // if location is empty
    }

    // Swal.fire({
    //   position: "top-center",
    //   icon: "success",
    //   title: "Data Found Successfully",
    //   showConfirmButton: false,
    //   timer: 1500,
    // });

    const apiKey = "d2b7ffd7bb5f4506a4545143251003";
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert("Location not found. Please try again.");
          setWeatherData(null);
        } else {
          setWeatherData(data); // Set weather data and trigger animation
        }
      })
      .catch(() => {
        alert("Error fetching data. Please try again.");
      });
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchWeather(); // Call fetchWeather when Enter is pressed
    }
  };

  return (
    <div className="main">
      <div className="header">
        <img className="App-logo" src={sun} alt="sun" />
        <h1 className="animate__animated animate__backInDown">Weather App</h1>
        <img className="App-logo" src={sun} alt="sun" />
      </div>
      <input
        className="location-input"
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter city"
        onKeyDown={handleKeyDown} 
      />
      <br />
      <br />
      <button className="get-weather-button" onClick={fetchWeather}>
        Get Weather Details
      </button>
      {weatherData && (
        <div className={`weather-info ${animationClass}`}>
          <h2>Weather in {weatherData.location.name}</h2>
          <h3>
            <i>Temperature:</i> {weatherData.current.temp_c}°C
          </h3>
          <p>
            <b>Weather descriptors:</b> {weatherData.current.condition.text}
          </p>
          <img
            src={weatherData.current.condition.icon}
            alt="weather icon"
          />
          <br />
          <p>
            <b>Humidity:</b> {weatherData.current.humidity} %
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
