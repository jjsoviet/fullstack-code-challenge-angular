import { combineReducers, createReducer, on } from '@ngrx/store';
import * as WeatherActions from '../actions/weather.actions';

import { Day } from '../models/day.model';

export interface WeatherState {
  byId: { [id: string]: Day };
  allIds: string[];
}

const byId = createReducer(
  <{ [id: string]: Day }>{},
  on(WeatherActions.fetchWeatherSuccess, (state, { payload }) => ({
    ...state,
    ...payload,
  }))
);

const allIds = createReducer(
  <string[]>[],
  on(WeatherActions.fetchWeatherSuccess, (state, { payload }) =>
    Array.from(new Set([...state, ...Object.keys(payload)]))
  )
);

export const weather = combineReducers({
  byId,
  allIds,
});

export const getWeatherDays = (state: WeatherState): Day[] => {
  return state.allIds.map((id: string) => state.byId[id]);
};

export const getWeatherIds = (state: WeatherState): string[] => {
  return state.allIds;
};

export const getWeatherById = (state: WeatherState, id: string): Day =>
  state.byId[id];

export const getWeatherHasLoaded = (state: WeatherState): boolean =>
  state.allIds.length > 0;
