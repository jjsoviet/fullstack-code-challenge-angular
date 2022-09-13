import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import * as fromWeather from './weather.reducer';
import * as fromLocation from './location.reducer';
import * as fromError from './error.reducer';
import * as fromLoading from './loading.reducer';

export interface State {
  weather: fromWeather.WeatherState;
  location: fromLocation.LocationState;
  loading: fromLoading.State;
  error: fromError.State;
}

export const reducers: ActionReducerMap<State> = {
  weather: fromWeather.weather,
  location: fromLocation.location,
  loading: fromLoading.loading,
  error: fromError.error,
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

export const getLoadingState = createSelector(
  getState,
  (state) => state.loading
);

export const getErrorState = createSelector(getState, (state) => state.error);

export const getIsLoading = (actionTypes: string[]) =>
  createSelector(getLoadingState, fromLoading.getIsLoading(actionTypes));

export const getAllLoading = createSelector(
  getLoadingState,
  fromLoading.getAllLoading
);

export const getHasError = (actionTypes: string[]) =>
  createSelector(getErrorState, fromError.getHasError(actionTypes));
