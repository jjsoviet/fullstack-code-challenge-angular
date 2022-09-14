import { Temperature } from './temperature.model';

export interface Hour {
  icon: string;
  relative_humidity: number;
  temperature: Temperature;
  weather: string;
  weathercode: number;
  wind_direction: string;
  wind_speed: number;
}
