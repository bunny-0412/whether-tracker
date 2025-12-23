import React, { useState } from "react";

export default function Whetherpage() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [upcom5days, setUpcom5days] = useState([]);

  const getWeather = async () => {
    if (!city) {
      alert("Enter city name");
      return;
    }

    try {
      // current weather
      const response = await fetch(
        `http://localhost:5000/api/weather?city=${city}`
      );
      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        setWeather(null);
        return;
      }

      setWeather(data);
      setError("");

      // upcoming 5 days
      const forecastRes = await fetch(
        `http://localhost:5000/api/forecast?city=${city}`
      );
      const forecastData = await forecastRes.json();
      if (forecastRes.ok) {
        setUpcom5days(forecastData);
      }
    } catch {
      setError("Backend not running");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center p-6"
      style={{
        background:
          "linear-gradient(to right, #74ebd5, #acb6e5)",
      }}
    >
     
      <div
        className="flex items-center w-full max-w-xl mb-2 p-2"
        style={{
          background: "rgba(255,255,255,0.3)",
          backdropFilter: "blur(10px)",
          borderRadius: "999px",
        }}
      >
        <input
          type="text"
          placeholder="Search city"
          className="flex-1 bg-transparent outline-none px-4 text-lg"
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          onClick={getWeather}
          className="px-6 py-2 bg-blue-600 text-white rounded-full"
        >
          🔍
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {/* 🌤 Current Weather */}
      {weather && (
        <div
          className="w-full max-w-xl p-6 mb-2 text-center"
          style={{
            background: "rgba(255,255,255,0.35)",
            backdropFilter: "blur(12px)",
            borderRadius: "20px",
          }}
        >
          <h2 className="text-2xl font-bold mb-2">
            {weather.city}
          </h2>
          <h1 className="text-4xl font-bold mb-2">
            {weather.temperature}°C
          </h1>
          <p className="text-lg capitalize">
            {weather.description}
          </p>
          <hr className="my-4" />
          <p>Date: {weather.date}</p>
          <p>Time: {weather.time}</p>
        </div>
      )}

      {/* 📅 Upcoming 5 Days */}
      {upcom5days.length > 0 && (
        <div
          className="w-full max-w-4xl p-6"
          style={{
            background: "rgba(255,255,255,0.35)",
            backdropFilter: "blur(12px)",
            borderRadius: "20px",
          }}
        >
          <h3 className="text-xl font-bold mb-4 text-center">
            Upcoming 5 Days
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {upcom5days.map((item, index) => (
              <div
                key={index}
                className="text-center p-4"
                style={{
                  background: "rgba(255,255,255,0.4)",
                  borderRadius: "15px",
                }}
              >
                <p className="font-semibold">{item.day}</p>
                <p className="text-sm">{item.date}</p>
                <h2 className="text-2xl font-bold my-2">
                  {item.temp}°C
                </h2>
                <p className="capitalize text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
