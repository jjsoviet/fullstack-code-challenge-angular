import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as WeatherActions from '../actions/weather.actions';
import { Day } from '../models/day.model';

const URL =
  'https://floral-paper-1590.fly.dev/?latitude=40.75&longitude=-74&transform=true';

@Injectable()
export class WeatherEffects {
  fetchWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.fetchWeatherRequest),
      switchMap(() =>
        this.http.get(URL).pipe(
          map((response: any) =>
            WeatherActions.fetchWeatherSuccess(this.transformResponse(response))
          ),
          catchError(() => of(WeatherActions.fetchWeatherFailure()))
        )
      )
    )
  );

  transformResponse(response: any): { [id: string]: Day } {
    return Object.keys(response['daily']).reduce(
      (acc, key) => ({
        ...acc,
        [key]: {
          ...response['daily'][key],
          date: key,
        },
      }),
      {}
    );
  }

  constructor(private actions$: Actions, private http: HttpClient) {}
}
