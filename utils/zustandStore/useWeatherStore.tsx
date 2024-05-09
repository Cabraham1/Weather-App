// useWeatherStore.js
import { create } from "zustand";

interface City {
  adminCode1: string;
  lng: string;
  lat: string;
  geonameId: number;
  toponymName: string;
  countryCode: string;
}

interface WeatherData {
  temperature?: string;
  weatherObservation: any;
}

interface State {
  citiesWeather: {
    city: City;
    weatherData: WeatherData;
    notes: string;
    likes: number;
    dislikes: number;
    favorite: boolean;
  }[];
  addCityWeather: (cityWeather: {
    city: City;
    weatherData: WeatherData;
  }) => void;
  addNote: (cityId: number, note: string) => void;
  removeNote: (cityId: number) => void;
  editNote: (cityId: number, note: string) => void;
  addLike: (cityId: number) => void;
  addDislike: (cityId: number) => void;
  toggleFavorite: (cityId: number) => void;
}

const useWeatherStore = create<State>((set) => ({
  citiesWeather: [],
  addCityWeather: (cityWeather) => {
    set((state) => ({
      citiesWeather: [
        ...state.citiesWeather,
        { ...cityWeather, notes: "", likes: 0, dislikes: 0, favorite: false },
      ],
    }));
  },
  addNote: (cityId, note) => {
    set((state) => ({
      citiesWeather: state.citiesWeather.map((cityWeather) =>
        cityWeather.city.geonameId === cityId
          ? { ...cityWeather, notes: note }
          : cityWeather
      ),
    }));
  },
  removeNote: (cityId) => {
    set((state) => ({
      citiesWeather: state.citiesWeather.map((cityWeather) =>
        cityWeather.city.geonameId === cityId
          ? { ...cityWeather, notes: "" }
          : cityWeather
      ),
    }));
  },
  editNote: (cityId, note) => {
    set((state) => ({
      citiesWeather: state.citiesWeather.map((cityWeather) =>
        cityWeather.city.geonameId === cityId
          ? { ...cityWeather, notes: note }
          : cityWeather
      ),
    }));
  },
  addLike: (cityId) => {
    set((state) => ({
      citiesWeather: state.citiesWeather.map((cityWeather) =>
        cityWeather.city.geonameId === cityId
          ? { ...cityWeather, likes: cityWeather.likes + 1 }
          : cityWeather
      ),
    }));
  },
  addDislike: (cityId) => {
    set((state) => ({
      citiesWeather: state.citiesWeather.map((cityWeather) =>
        cityWeather.city.geonameId === cityId
          ? { ...cityWeather, dislikes: cityWeather.dislikes + 1 }
          : cityWeather
      ),
    }));
  },
  toggleFavorite: (cityId) => {
    set((state) => ({
      citiesWeather: state.citiesWeather.map((cityWeather) =>
        cityWeather.city.geonameId === cityId
          ? { ...cityWeather, favorite: !cityWeather.favorite }
          : cityWeather
      ),
    }));
  },
}));

export default useWeatherStore;
