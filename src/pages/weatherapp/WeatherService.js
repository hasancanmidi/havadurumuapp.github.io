const apiKey = "ded2e517eaa3ca2de3e5a97ffa440f36";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeatherByCity = async (city) => {
  const url = `${baseUrl}?q=${city}&appid=${apiKey}&units=metric`;
  return await fetchAndProcessWeather(url);
};

// Konuma göre sorgulama
export const fetchWeatherByLocation = async (lat, lon) => {
  const url = `${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  return await fetchAndProcessWeather(url);
};

// Ortak fetch ve işleme
async function fetchAndProcessWeather(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Weather data could not be retrieved.');
  }
  return await response.json();
}