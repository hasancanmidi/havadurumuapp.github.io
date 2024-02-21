const apiKey = "ded2e517eaa3ca2de3e5a97ffa440f36";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeather = async (city) => {
  const url = `${baseUrl}?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Weather data Getirilemedi.');
  }
  return await response.json();
};
