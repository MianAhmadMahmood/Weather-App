import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import searchIcon from '../assets/search.png';
import clear from '../assets/clear.png';
import cloud from '../assets/cloud.png';
import rain from '../assets/rain.png';
import drizzle from '../assets/drizzle.png';
import snow from '../assets/snow.png';
import wind from '../assets/wind.png';
import humidity from '../assets/humidity.png';

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);

  const allIcons = {
    '01d': clear,
    '01n': clear,
    '02d': cloud,
    '02n': cloud,
    '03d': cloud,
    '04d': drizzle,
    '04n': drizzle,
    '09d': rain,
    '09n': rain,
    '10d': rain,
    '10n': rain, 
    '13d': snow,
    '13n': snow,
  };

  const fetchWeather = async (city) => {
    if (city.trim() === '') {
      alert('Enter a city name');
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=34bacb452326d81a826a35bed373bf92`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear;
      setWeatherData({
        humidity: data.main.humidity,
        wind: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(null);
      console.error('Error fetching data:', error);
      alert('Failed to fetch weather data. Please try again later.');
    }
  };

  useEffect(() => {
    fetchWeather('London');
  }, []);

  return (
    <div className='weather'>
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='Search' />
        <img src={searchIcon} alt="Search" onClick={() => fetchWeather(inputRef.current.value)} />
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="Weather Icon" className='weather-icon' />
          <p className='temperature'>{weatherData.temperature}°</p>
          <p className='location'>{weatherData.location}</p>

          <div className="weather-data">
            <div className="col">
              <img src={humidity} alt="Humidity" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>

            <div className="col">
              <img src={wind} alt="Wind" />
              <div>
                <p>{weatherData.wind} m/s</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
