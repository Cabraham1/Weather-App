import SunnyLogo from "../../public/sunny.svg";
import CloudLogo from "../../public/cloudy.svg";
import RainLogo from "../../public/rain.svg";
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
