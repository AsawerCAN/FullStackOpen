import axios from "axios";

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

export const getWeather = async (city) => {
  if (!WEATHER_API_KEY) {
    console.error("API Key is missing. Please check your .env file.");
    return null;
  }

  try {
    console.log("Fetching weather for:", city); // for debug
    const response = await axios.get(baseUrl, {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
        units: "metric", // Use metric units for temperature in Celsius
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    if (error.response && error.response.status === 401) {
      console.error("Invalid API key or unauthorized access.");
    }
    return null;
  }
};
