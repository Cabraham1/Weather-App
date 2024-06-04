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

  export interface SideModalCardProps {
    humidityDegree: string;
    windDegree: string;
    isRow: boolean;
  }

  export interface AlertDialogProps {
    open: boolean;
    onClose: () => void;
    onAgree?: () => void;
    title: string;
    content: string;
    disagreeText?: string;
    agreeText?: string;
    deleteColor?: boolean;
  }
  export interface AlertDialogTextProps {
    open: boolean;
    onClose: () => void;
    onAgree: (newNote: string) => void;
    title: string;
    disagreeText: string;
    agreeText: string;
    newNote: string;
    setNewNote: (note: string) => void;
  }
  export interface WeatherModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    disagreeText: string;
    weatherLogo: string;
    tempDegree: string;
    humidityDegree: string;
    windDegree: string;
    location: string;
    isError: boolean;
  }

  export interface WeatherCardProps {
    time: string;
    iconSrc: string;
    temperature: string;
  }

  export interface CityCardProps {
    dislikeIconSrc?: any;
    likeIconSrc?: any;
    weatherIconSrc?: any;
    cityName?: string;
    isLiked?: boolean;
    temperature?: string;
    weatherDescription?: string;
    population?: number;
    onLikeClick?: () => void;
    onDeleteClick?: () => void;
    onViewClick?: () => void;
  }

  export interface Note {
    id: number;
    text: string;
  }
  
  export interface ViewNoteProps {
    note: Note;
    onView: (noteId: number, content: string) => void;
    onDelete: (noteId: number, content: string) => void;
    onEdit: (noteId: number, content: string) => void;
  }

  