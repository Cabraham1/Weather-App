import SunnyLogo from "../../public/sunny.svg";
import CloudLogo from "../../public/cloudy.svg";
import RainLogo from "../../public/rain.svg";
import useWeatherStore from "../zustandStore/useWeatherStore";
import { City, WeatherData } from "../../types";


// Get the weather icon based on the weather description
export const getWeatherIcon = (weatherDescription: string) => {
  switch (weatherDescription) {
    case "Sunny":
      return SunnyLogo;
    case "Cloudy":
      return CloudLogo;
    case "Rain":
      return RainLogo;
    default:
      return null;
  }
};

// Truncate text to a specified length
export const truncateText = (text: string, maxLength: number): string => {
  if (text?.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};


// Fetch cities weather data and add it to the store
export const fetchCitiesWeather = async () => {
  try {
    const response = await fetch(
      "http://api.geonames.org/searchJSON?q=&featureCode=PPLC&orderby=population&maxRows=15&username=cabraham"
    );
    const citiesData: { geonames: City[] } = await response.json();

    // Map over each city and fetch its weather information
    const citiesWeatherPromises = citiesData.geonames.map(
      async (city: City) => {
        const { lat, lng, toponymName } = city;
        const weatherResponse = await fetch(
          `http://api.geonames.org/findNearByWeatherJSON?lat=${lat}&lng=${lng}&username=cabraham`
        );
        const weatherData: WeatherData = await weatherResponse.json();

        return {
          city: city,
          weatherData: weatherData?.weatherObservation || {},
          id: city.geonameId,
        };
      }
    );

    // Wait for all weather data promises to resolve
    const citiesWeather = await Promise.all(citiesWeatherPromises);

    // Add each cityWeather object to the store
    citiesWeather.forEach((cityWeather) => {
      useWeatherStore.getState().addCityWeather(cityWeather);
    });
  } catch (error) {
    console.error("Error fetching cities weather:", error);
  }
};



export function getFormattedDate() {
  const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];

  const days = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];

  const currentDate = new Date();
  const dayOfWeek = days[currentDate.getDay()];
  const dayOfMonth = currentDate.getDate();
  const month = months[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  return `${dayOfWeek}, ${dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth} ${month}, ${year}`;
}
