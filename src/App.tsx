import { useState } from 'react';
import type React from 'react';
import axios from 'axios';
import './App.css';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setWeather(null);
    try {
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            q: city,
            appid: apiKey,
            units: 'metric',
          },
        }
      );
      setWeather(response.data);
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        setError('City not found. Please try another city.');
      } else {
        setError('Failed to fetch weather data. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-blue-500 p-4">
      <form onSubmit={fetchWeather} className="w-full max-w-md flex flex-col gap-4 bg-white bg-opacity-80 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-2">Weather App</h1>
        <input
          type="text"
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="Enter city name"
          className="p-2 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Get Weather'}
        </button>
        {error && <div className="text-red-600 text-center">{error}</div>}
      </form>
      {weather && (
        <div className="mt-8 w-full max-w-md bg-white bg-opacity-90 rounded-lg shadow-lg p-6 flex flex-col items-center">
          <h2 className="text-xl font-bold mb-2">{weather.name}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            className="w-20 h-20"
          />
          <p className="text-lg capitalize mb-2">{weather.weather[0].description}</p>
          <div className="flex flex-col gap-1 text-gray-700">
            <span>Temperature: <b>{weather.main.temp}°C</b></span>
            <span>Humidity: <b>{weather.main.humidity}%</b></span>
            <span>Wind Speed: <b>{weather.wind.speed} m/s</b></span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
