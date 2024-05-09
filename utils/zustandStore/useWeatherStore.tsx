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
  id: number;
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
  addNote: (cityId: number, note: string, id: number) => void;
  removeNote: (cityId: number, noteId: number) => void;
  viewNotes: (cityId: number) => string[];
  editNote: (cityId: number, noteId: number, newText: string) => void;
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
      const cityExists = state.citiesWeather.some(
        (existingCity) =>
          existingCity.city.geonameId === cityWeather.city.geonameId
      );

      if (!cityExists) {
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
        return state;
      }
    });
  },
  addNote: (cityId: number, note: string, id: number) => {
    set((state) => ({
      citiesWeather: state.citiesWeather.map((cityWeather) =>
        cityWeather.city.geonameId === cityId
          ? {
              ...cityWeather,
              notes: [...cityWeather.notes, { id, text: note }],
            }
          : cityWeather
      ),
      favoriteCitiesWeather: state.favoriteCitiesWeather.map((cityWeather) =>
        cityWeather.city.geonameId === cityId
          ? {
              ...cityWeather,
              notes: [...cityWeather.notes, { id, text: note }],
            }
          : cityWeather
      ),
      activeCitiesWeather: state.activeCitiesWeather.map((cityWeather) =>
        cityWeather.city.geonameId === cityId
          ? {
              ...cityWeather,
              notes: [...cityWeather.notes, { id, text: note }],
            }
          : cityWeather
      ),
    }));
  },

  removeNote: (cityId: number, noteId: number) => {
    set((state) => ({
      citiesWeather: state.citiesWeather.map((cityWeather) =>
        cityWeather.city.geonameId === cityId
          ? {
              ...cityWeather,
              notes: cityWeather.notes.filter((note) => note.id !== noteId),
            }
          : cityWeather
      ),
      favoriteCitiesWeather: state.favoriteCitiesWeather.map((cityWeather) =>
        cityWeather.city.geonameId === cityId
          ? {
              ...cityWeather,
              notes: cityWeather.notes.filter((note) => note.id !== noteId),
            }
          : cityWeather
      ),
      activeCitiesWeather: state.activeCitiesWeather.map((cityWeather) =>
        cityWeather.city.geonameId === cityId
          ? {
              ...cityWeather,
              notes: cityWeather.notes.filter((note) => note.id !== noteId),
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
  editNote: (cityId: number, noteId: number, newText: string) => {
    set((state) => ({
      citiesWeather: state.citiesWeather.map((cityWeather) =>
        cityWeather.city.geonameId === cityId
          ? {
              ...cityWeather,
              notes: cityWeather.notes.map((note) =>
                note.id === noteId ? { ...note, text: newText } : note
              ),
            }
          : cityWeather
      ),
      favoriteCitiesWeather: state.favoriteCitiesWeather.map((cityWeather) =>
        cityWeather.city.geonameId === cityId
          ? {
              ...cityWeather,
              notes: cityWeather.notes.map((note) =>
                note.id === noteId ? { ...note, text: newText } : note
              ),
            }
          : cityWeather
      ),
      activeCitiesWeather: state.activeCitiesWeather.map((cityWeather) =>
        cityWeather.city.geonameId === cityId
          ? {
              ...cityWeather,
              notes: cityWeather.notes.map((note) =>
                note.id === noteId ? { ...note, text: newText } : note
              ),
            }
          : cityWeather
      ),
    }));
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
    set((state) => {
      // Toggle the isDelete property for the specific city
      const updatedCitiesWeather = state.citiesWeather.map((cityWeather) =>
        cityWeather.city.geonameId === cityId
          ? { ...cityWeather, isDelete: !cityWeather.isDelete }
          : cityWeather
      );

      // Filter out the clicked city from the activeCitiesWeather and favoriteCitiesWeather arrays
      const updatedActiveCitiesWeather = state.activeCitiesWeather.filter(
        (cityWeather) => cityWeather.city.geonameId !== cityId
      );
      const updatedFavoriteCitiesWeather = state.favoriteCitiesWeather.filter(
        (cityWeather) => cityWeather.city.geonameId !== cityId
      );

      return {
        ...state,
        citiesWeather: updatedCitiesWeather,
        activeCitiesWeather: updatedActiveCitiesWeather,
        favoriteCitiesWeather: updatedFavoriteCitiesWeather,
      };
    });
  },

  getState: () => get(),
}));

export default useWeatherStore;
