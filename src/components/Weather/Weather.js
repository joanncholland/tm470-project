import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/UserAuthContext";

import "./Weather.scss";

export default function Weather() {
  const { getLocation, weatherData } = useAuth();
  const [error, setError] = useState("");

  // load the user's location and local weather
  async function loadLocation() {
    try {
      await getLocation();
    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {
    // load the user's location to getch their local weather data
    loadLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {!weatherData && <p>Loading weather...</p>}
      {weatherData && (
        <div className="weather">
          {error && <p>{error}</p>}
          <div className="weather-description">
            <h3>{weatherData.day.condition.text}</h3>
            {weatherData.day.daily_will_it_rain === 1 ? (
              <p>The weather forecast predicts rain today.</p>
            ) : (
              <p>The weather forecast doesn't predict rain today.</p>
            )}
            <p>Chance of rain: {weatherData.day.daily_chance_of_rain}%</p>
          </div>
          <img
            src={`${weatherData.day.condition.icon}`}
            alt={`${weatherData.day.condition.text} icon`}
          />
        </div>
      )}
    </div>
  );
}
