import { combineReducers, createReducer, on } from '@ngrx/store';
import * as LocationActions from '../actions/location.actions';

import { Location } from '../models/location.model';

export interface LocationState {
  currentLocation: Location;
}

const currentLocation = createReducer(
  <Location>{},
  on(LocationActions.fetchLocationSuccess, (_, { payload }) => payload)
);

export const location = combineReducers({
  currentLocation,
});

export const getCurrentLocation = (state: LocationState): Location => {
  return state.currentLocation;
};

export const getLocationHasLoaded = (state: LocationState): boolean =>
  !!state.currentLocation;
