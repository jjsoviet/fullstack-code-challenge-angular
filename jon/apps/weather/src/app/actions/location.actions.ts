import { createAction } from '@ngrx/store';
import { Location } from '../models/location.model';

export const FETCH_LOCATION = 'FETCH_LOCATION';

export const fetchLocationRequest = createAction('FETCH_LOCATION_REQUEST');

export const fetchLocationSuccess = createAction(
  'FETCH_LOCATION_SUCCESS',
  (payload: Location) => ({ payload })
);

export const fetchLocationFailure = createAction('FETCH_LOCATION_FAILURE');
