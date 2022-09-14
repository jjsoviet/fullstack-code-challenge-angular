import { createAction } from '@ngrx/store';
import { Day } from '../models/day.model';

export const FETCH_WEATHER = 'FETCH_WEATHER';

export const fetchWeatherRequest = createAction(
  'FETCH_WEATHER_REQUEST',
  (payload: { latitude: number; longitude: number }) => ({ payload })
);

export const fetchWeatherSuccess = createAction(
  'FETCH_WEATHER_SUCCESS',
  (payload: { [id: string]: Day }) => ({ payload })
);

export const fetchWeatherFailure = createAction('FETCH_WEATHER_FAILURE');
