import { create } from "zustand";

interface City {
  adminCode1: string;
  lng: string;
  lat: string;
  geonameId: number; // Change id to geonameId
  toponymName: string;
  countryCode: string;
}

interface Note {
  cityId: number; // Reference to city ID
  text: string;
}

interface WeatherData {
  temperature?: string;
  weatherObservation: any;
}

interface CustomState {
  citiesWeather: {
    city: City;
    weatherData: WeatherData;
    notes: string;
    favorite: boolean;
    isDelete: boolean;
  }[];
  addCityWeather: (cityWeather: {
    city: City;
    weatherData: WeatherData;
  }) => void;
  addNote: (cityId: number, note: string) => void;
  removeNote: (cityId: number) => void;
  editNote: (cityId: number, note: string) => void;
  viewNotes: (cityId: number) => string;
  toggleFavorite: (cityId: number) => void;
  toggleDelete: (cityId: number) => void;
  getState: () => CustomState; // Include the getState method
}

const useWeatherStore = create<CustomState>((set, get) => ({
  citiesWeather: [],
  addCityWeather: (cityWeather: { city: City; weatherData: WeatherData }) => {
    set((state) => ({
      citiesWeather: [
        ...state.citiesWeather,
        {
          city: cityWeather.city,
          weatherData: cityWeather.weatherData,
          notes: "",
          favorite: false,
          isDelete: false,
        },
      ],
    }));
  },
  addNote: (cityId: number, note: string) => {
    set((state) => ({
      citiesWeather: state.citiesWeather.map((cityWeather) =>
        cityWeather.city.geonameId === cityId
          ? { ...cityWeather, notes: note }
          : cityWeather
      ),
    }));
  },
  removeNote: (cityId: number) => {
    set((state) => ({
      citiesWeather: state.citiesWeather.map((cityWeather) =>
        cityWeather.city.geonameId === cityId
          ? { ...cityWeather, notes: "" }
          : cityWeather
      ),
    }));
  },
  viewNotes: (cityId: number) => {
    const cityWeather: CustomState["citiesWeather"][0] | undefined =
      get().citiesWeather.find(
        (cityWeather) => cityWeather.city.geonameId === cityId
      );
    return cityWeather?.notes || "";
  },
  editNote: (cityId: number, note: string) => {
    set((state) => ({
      citiesWeather: state.citiesWeather.map((cityWeather) =>
        cityWeather.city.geonameId === cityId
          ? { ...cityWeather, notes: note }
          : cityWeather
      ),
    }));
  },
  toggleFavorite: (cityId: number) => {
    set((state) => ({
      citiesWeather: state.citiesWeather.map((cityWeather) =>
        cityWeather.city.geonameId === cityId
          ? { ...cityWeather, favorite: !cityWeather.favorite }
          : cityWeather
      ),
    }));
  },
  toggleDelete: (cityId: number) => {
    set((state) => ({
      citiesWeather: state.citiesWeather.map((cityWeather) =>
        cityWeather.city.geonameId === cityId
          ? { ...cityWeather, isDelete: !cityWeather.isDelete } // Toggle isDelete
          : cityWeather
      ),
    }));
  },
  getState: () => get(), // Implement the getState method
}));

export default useWeatherStore;
