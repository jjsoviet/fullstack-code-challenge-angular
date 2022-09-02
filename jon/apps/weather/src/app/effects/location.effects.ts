import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as LocationActions from '../actions/location.actions';

const IP_URL =
  'https://cors-anywhere.herokuapp.com/http://api.ipify.org/?format=json';
const URL = 'http://ipwho.is/';

@Injectable()
export class LocationEffects {
  fetchLocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LocationActions.fetchLocationRequest),
      switchMap(() =>
        this.http.get(IP_URL).pipe(map((response: any) => response.ip))
      ),
      switchMap((ip: string) =>
        this.http.get(this.generateUrl(ip)).pipe(
          map((response: any) =>
            LocationActions.fetchLocationSuccess(response)
          ),
          catchError(() => of(LocationActions.fetchLocationFailure()))
        )
      )
    )
  );

  generateUrl(ip: string) {
    return `${URL}/${ip}`;
  }

  constructor(private actions$: Actions, private http: HttpClient) {}
}
