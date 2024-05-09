import SunnyLogo from "../../public/sunny.svg";
import CloudLogo from "../../public/cloudy.svg";
import RainLogo from "../../public/rain.svg";
import useWeatherStore from "../zustandStore/useWeatherStore";

interface City {
  adminCode1: string;
  lng: string;
  lat: string;
  geonameId: number;
  toponymName: string;
  countryCode: string;
  // Add more properties if needed
}

interface WeatherData {
  temperature?: string; // Make temperature optional
  weatherObservation: any; // Adjust as needed
  // Add more properties if needed
}

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

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

export const fetchCitiesWeather = async () => {
  try {
    const response = await fetch(
      "http://api.geonames.org/searchJSON?q=&featureCode=PPLC&orderby=population&maxRows=15&username=cabraham"
    );
    const citiesData: { geonames: City[] } = await response.json(); // Type assertion

    // Map over each city and fetch its weather information
    const citiesWeatherPromises = citiesData.geonames.map(
      async (city: City) => {
        const { lat, lng, toponymName } = city;
        const weatherResponse = await fetch(
          `http://api.geonames.org/findNearByWeatherJSON?lat=${lat}&lng=${lng}&username=cabraham`
        );
        const weatherData: WeatherData = await weatherResponse.json(); // Type assertion

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
