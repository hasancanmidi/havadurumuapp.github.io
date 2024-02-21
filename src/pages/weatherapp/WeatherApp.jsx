import React, { useState, useEffect } from 'react';
import './Weatherapp.css';
import search_icon from "../../assets/search.png";
import humidity_icon from "../../assets/humidity.png";
import wind_icon from "../../assets/wind.png";
import { fetchWeather } from './WeatherService';
import getWeatherIcon from './weatherIcons';

const WeatherApp = () => {
    const [city, setCity] = useState('Trabzon'); // Başlangıçta varsayılan bir şehir.
    const [weatherData, setWeatherData] = useState(null);
    const [wicon, setWicon] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchWeather(city);
                setWeatherData(data);
                setWicon(getWeatherIcon(data.weather[0].icon));
            } catch (error) {
                console.error(error);
            }
        };

        loadData();
    }, [city]);

    const handleSearch = () => {
        const inputElement = document.getElementsByClassName("cityInput")[0];
        setCity(inputElement.value);
    };

    return (
        <div className="container">
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder='Ara'/>
                <div className="search-icon" onClick={handleSearch}>
                    <img src={search_icon} alt="search" />
                </div>
            </div>
            <div className="weather-image">
                <img src={wicon} alt="weather icon" />
            </div>
            <div className="weather-temp">{weatherData ? `${weatherData.main.temp}°C` : 'Yükleniyor...'}</div>
            <div className="feelslike-temp">{weatherData ? `Hissedilen: ${weatherData.main.feels_like}°C` : 'Yükleniyor...'}</div>
            <div className="weather-location">{weatherData ? weatherData.name : 'Yükleniyor...'}</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="humidity" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">{weatherData ? `${weatherData.main.humidity}%` : 'Yükleniyor...'}</div>
                        <div className="text">Nem</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="wind" className="icon" />
                    <div className="data">
                        <div className="wind-rate">{weatherData ? `${weatherData.wind.speed} km/h` : 'Yükleniyor...'}</div>
                        <div className="text">Rüzgar Hızı</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;
