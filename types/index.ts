import { SxProps, Theme } from "@mui/material";

export type Dict = Record<string, string>;
export type DictOf<T> = Record<string, T>;

export type SxPropsType = {
    sx?: SxProps<Theme>;
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
    temperature?: string; // Make temperature optional
    weatherObservation: any; // Adjust as needed
    // Add more properties if needed
  }