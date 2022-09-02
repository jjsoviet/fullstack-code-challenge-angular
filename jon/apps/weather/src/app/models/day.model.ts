import { Hour } from './hour.model';
import { Temperature } from './temperature.model';

export interface Day {
  date: string;
  hourly: { [id: string]: Hour };
  icon: string;
  max_temperature: Temperature;
  min_temperature: Temperature;
  weather: string;
  weathercode: number;
  weekday: string;
}
