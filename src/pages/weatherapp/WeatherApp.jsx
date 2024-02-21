import React, { useState, useEffect } from 'react';
import './Weatherapp.css';
import search_icon from "../../assets/search.png";
import humidity_icon from "../../assets/humidity.png";
import wind_icon from "../../assets/wind.png";
import { fetchWeatherByCity, fetchWeatherByLocation } from './WeatherService';
import getWeatherIcon from './weatherIcons';

const WeatherApp = () => {
    const [city, setCity] = useState('Trabzon');
    const [weatherData, setWeatherData] = useState(null);
    const [wicon, setWicon] = useState(null);
    const [isLocationBased, setIsLocationBased] = useState(true); // Yeni state ekleyin

    useEffect(() => {
        if (isLocationBased) {
            navigator.geolocation.getCurrentPosition(success, handleError, {timeout: 10000});
        } else {
            fetchWeather();
        }

        async function success(position) {
            try {
                const data = await fetchWeatherByLocation(position.coords.latitude, position.coords.longitude);
                updateWeatherData(data);
            } catch (error) {
                console.error(error);
                fetchWeather();
            }
        }

        function handleError(error) {
            console.warn(`ERROR(${error.code}): ${error.message}`);
            fetchWeather(); // Konum alınamazsa varsayılan şehri kullan
        }

        function fetchWeather() {
            fetchWeatherByCity(city).then(updateWeatherData).catch(console.error);
        }
    }, [city, isLocationBased]); // isLocationBased'i bağımlılıklara ekleyin

    function updateWeatherData(data) {
        setWeatherData(data);
        setWicon(getWeatherIcon(data.weather[0].icon));
    }

    const handleSearch = async () => {
        const inputElement = document.getElementsByClassName("cityInput")[0];
        const newCity = inputElement.value;
        setIsLocationBased(false); // Kullanıcı manuel bir arama yaptığında, aramayı konum bazlı olmayan olarak işaretle
        setCity(newCity);
    };


    return (
        <div className="container">
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder='Ara' />
                <div className="search-icon" onClick={handleSearch}>
                    <img src={search_icon} alt="search" />
                </div>
            </div>
            <div className="weather-image">
                {wicon && <img src={wicon} alt="weather icon" />}
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
