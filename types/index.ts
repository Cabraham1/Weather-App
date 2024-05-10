import { SxProps, Theme } from "@mui/material";

export type Dict = Record<string, string>;
export type DictOf<T> = Record<string, T>;

export type SxPropsType = {
    sx?: SxProps<Theme>;
  };

  export type WeatherDataProps = {
    temperature: number;
    humidity: string;
    windSpeed: string;
  };

 export  interface City {
    adminCode1: string;
    lng: string;
    lat: string;
    geonameId: number;
    toponymName: string;
    countryCode: string;
    population: number;
    id: number; 
  }

  export interface WeatherData {
    temperature?: string; 
    weatherObservation: any; 
  }

  export interface IndexProps {
    tempDegree: string;
    weatherLogo: string;
  }

  export interface Coordinates {
    latitude: number;
    longitude: number;
  }
  
  export interface Position {
    coords: Coordinates;
  }