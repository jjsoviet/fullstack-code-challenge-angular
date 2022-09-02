import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import * as fromWeather from './weather.reducer';
import * as fromLocation from './location.reducer';

export interface State {
  weather: fromWeather.WeatherState;
  location: fromLocation.LocationState;
}

export const reducers: ActionReducerMap<State> = {
  weather: fromWeather.weather,
  location: fromLocation.location,
};

export const getState = createFeatureSelector<State>('state');

export const getWeatherState = createSelector(
  getState,
  (state) => state.weather
);

export const getWeatherDays = createSelector(
  getWeatherState,
  fromWeather.getWeatherDays
);

export const getWeatherIds = createSelector(
  getWeatherState,
  fromWeather.getWeatherIds
);

export const getWeatherHasLoaded = createSelector(
  getWeatherState,
  fromWeather.getWeatherHasLoaded
);

export const getLocationState = createSelector(
  getState,
  (state) => state.location
);

export const getCurrentLocation = createSelector(
  getLocationState,
  fromLocation.getCurrentLocation
);
