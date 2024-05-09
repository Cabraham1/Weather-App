import { create } from "zustand";
interface City {
  adminCode1: string;
  lng: string;
  lat: string;
  geonameId: number;
  toponymName: string;
  countryCode: string;
  population: number;
}

interface Note {
  text: string;
}

interface WeatherData {
  temperature?: string;
  weatherObservation: any;
  clouds: string;
}

interface CityWeather {
  city: City;
  weatherData: WeatherData;
  notes: Note[];
  favorite: boolean;
  isDelete: boolean;
}

interface CustomState {
  citiesWeather: CityWeather[];
  favoriteCitiesWeather: CityWeather[];
  activeCitiesWeather: CityWeather[];
  addCityWeather: (cityWeather: {
    city: City;
    weatherData: WeatherData;
  }) => void;
  addNote: (cityId: number, note: string) => void;
  removeNote: (cityId: number, noteIndex: number) => void;
  viewNotes: (cityId: number) => string[];
  toggleFavorite: (cityId: number) => void;
  toggleDelete: (cityId: number) => void;
  getState: () => CustomState;
}

const useWeatherStore = create<CustomState>((set, get) => ({
  citiesWeather: [],
  favoriteCitiesWeather: [],
  activeCitiesWeather: [],
  addCityWeather: (cityWeather: { city: City; weatherData: WeatherData }) => {
    set((state) => {
      // Check if the city already exists in any of the arrays
      const cityExists = state.citiesWeather.some(
        (existingCity) =>
          existingCity.city.geonameId === cityWeather.city.geonameId
      );

      if (!cityExists) {
        // Add the city to each array if it doesn't exist
        return {
          citiesWeather: [
            ...state.citiesWeather,
            {
              city: cityWeather.city,
              weatherData: cityWeather.weatherData,
              notes: [],
              favorite: false,
              isDelete: false,
            },
          ],
          favoriteCitiesWeather: [
            ...state.favoriteCitiesWeather,
            {
              city: cityWeather.city,
              weatherData: cityWeather.weatherData,
              notes: [],
              favorite: false,
              isDelete: false,
            },
          ],
          activeCitiesWeather: [
            ...state.activeCitiesWeather,
            {
              city: cityWeather.city,
              weatherData: cityWeather.weatherData,
              notes: [],
              favorite: false,
              isDelete: false,
            },
          ],
        };
      } else {
        // Return the current state without adding the city if it already exists
        return state;
      }
    });
  },
  addNote: (cityId: number, note: string) => {
    set((state) => ({
      citiesWeather: state.citiesWeather.map((cityWeather) =>
        cityWeather.city.geonameId === cityId
          ? { ...cityWeather, notes: [...cityWeather.notes, { text: note }] }
          : cityWeather
      ),
      favoriteCitiesWeather: state.favoriteCitiesWeather.map((cityWeather) =>
        cityWeather.city.geonameId === cityId
          ? { ...cityWeather, notes: [...cityWeather.notes, { text: note }] }
          : cityWeather
      ),
      activeCitiesWeather: state.activeCitiesWeather.map((cityWeather) =>
        cityWeather.city.geonameId === cityId
          ? { ...cityWeather, notes: [...cityWeather.notes, { text: note }] }
          : cityWeather
      ),
    }));
  },
  removeNote: (cityId: number, noteIndex: number) => {
    set((state) => ({
      citiesWeather: state.citiesWeather.map((cityWeather) =>
        cityWeather.city.geonameId === cityId
          ? {
              ...cityWeather,
              notes: cityWeather.notes.filter(
                (_, index) => index !== noteIndex
              ),
            }
          : cityWeather
      ),
      favoriteCitiesWeather: state.favoriteCitiesWeather.map((cityWeather) =>
        cityWeather.city.geonameId === cityId
          ? {
              ...cityWeather,
              notes: cityWeather.notes.filter(
                (_, index) => index !== noteIndex
              ),
            }
          : cityWeather
      ),
      activeCitiesWeather: state.activeCitiesWeather.map((cityWeather) =>
        cityWeather.city.geonameId === cityId
          ? {
              ...cityWeather,
              notes: cityWeather.notes.filter(
                (_, index) => index !== noteIndex
              ),
            }
          : cityWeather
      ),
    }));
  },
  viewNotes: (cityId: number) => {
    const cityWeather = get().citiesWeather.find(
      (cityWeather) => cityWeather.city.geonameId === cityId
    );
    return cityWeather ? cityWeather.notes.map((note) => note.text) : [];
  },
  toggleFavorite: (cityId: number) => {
    set((state) => {
      const updatedActiveCitiesWeather = state.activeCitiesWeather.map(
        (cityWeather) =>
          cityWeather.city.geonameId === cityId
            ? { ...cityWeather, favorite: !cityWeather.favorite }
            : cityWeather
      );

      const updatedFavoriteCitiesWeather = state.favoriteCitiesWeather.map(
        (cityWeather) =>
          cityWeather.city.geonameId === cityId
            ? { ...cityWeather, favorite: !cityWeather.favorite }
            : cityWeather
      );

      return {
        ...state,
        activeCitiesWeather: updatedActiveCitiesWeather,
        favoriteCitiesWeather: updatedFavoriteCitiesWeather,
      };
    });
  },

  toggleDelete: (cityId: number) => {
    set((state) => ({
      ...state,
      citiesWeather: state.citiesWeather.map((cityWeather) =>
        cityWeather.city.geonameId === cityId
          ? { ...cityWeather, isDelete: !cityWeather.isDelete }
          : cityWeather
      ),
      activeCitiesWeather: state.activeCitiesWeather.filter(
        (cityWeather) => !cityWeather.isDelete
      ),
      favoriteCitiesWeather: state.favoriteCitiesWeather.filter(
        (cityWeather) => !cityWeather.isDelete
      ),
    }));
  },

  getState: () => get(),
}));

export default useWeatherStore;
