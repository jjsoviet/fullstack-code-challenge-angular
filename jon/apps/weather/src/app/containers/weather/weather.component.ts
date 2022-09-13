import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { first, filter } from 'rxjs/operators';

import * as fromWeather from '../../reducers/index.reducer';
import * as fromLocation from '../../reducers/index.reducer';
import * as fromLoadingError from '../../reducers/index.reducer';

import * as WeatherActions from '../../actions/weather.actions';
import * as LocationActions from '../../actions/location.actions';

import { Day } from '../../models/day.model';
import { Hour } from '../../models/hour.model';
import { generateMockLocation, Location } from '../../models/location.model';
import { generateRunningHours } from '../../util/util';

@Component({
  selector: 'jon-weather',
  templateUrl: 'weather.component.html',
  styleUrls: ['weather.component.scss'],
})
export class WeatherComponent {
  isLoading$ = this.store.pipe(
    select(
      fromLoadingError.getIsLoading([
        WeatherActions.FETCH_WEATHER,
        LocationActions.FETCH_LOCATION,
      ])
    )
  );
  hasError$ = this.store.pipe(
    select(
      fromLoadingError.getHasError([
        WeatherActions.FETCH_WEATHER,
        LocationActions.FETCH_LOCATION,
      ])
    )
  );

  weatherDays: Day[] = [];
  activeDay: Day = this.weatherDays[0];
  hourMap: { [id: string]: Hour } = {};
  currentLocation: Location = generateMockLocation();
  temperature: 'celsius' | 'fahrenheit' = 'fahrenheit';

  private unsubscribe$ = new Subject();

  constructor(private store: Store<fromWeather.State>) {}

  ngOnInit(): void {
    this.load();

    this.store
      .pipe(
        select(fromWeather.getWeatherDays),
        filter((days: Day[]) => !!days && !!days.length)
      )
      .subscribe((days: Day[]) => {
        this.weatherDays = days;
        this.setActiveDay(this.weatherDays[0]);
        const nextDayIndex = this.weatherDays
          .map((day: Day) => day.date)
          .indexOf(this.activeDay.date);

        if (nextDayIndex < 0) {
          return;
        }

        this.setHourMap(
          this.weatherDays[0],
          this.weatherDays[nextDayIndex + 1]
        );
      });
  }

  load() {
    this.store.dispatch(LocationActions.fetchLocationRequest());

    this.store
      .pipe(
        select(fromLocation.getCurrentLocation),
        first(
          (location: Location) =>
            !!location && !!location.latitude && !!location.longitude
        )
      )
      .subscribe((location: Location) => {
        this.currentLocation = location;

        this.store.dispatch(
          WeatherActions.fetchWeatherRequest({
            latitude: this.currentLocation.latitude,
            longitude: this.currentLocation.longitude,
          })
        );
      });
  }

  setTemperature(temperature: 'celsius' | 'fahrenheit'): void {
    if (!temperature) {
      return;
    }

    this.temperature = temperature;
  }

  setActiveDay(day: Day): void {
    if (!day) {
      return;
    }

    this.activeDay = { ...day };
    const nextDayIndex = this.weatherDays
      .map((day: Day) => day.date)
      .indexOf(this.activeDay.date);

    if (nextDayIndex < 0) {
      return;
    }

    this.setHourMap(this.activeDay, this.weatherDays[nextDayIndex + 1]);
  }

  setHourMap(currentDay: Day, nextDay: Day, interval = 3): void {
    if (!currentDay) {
      return;
    }

    const runningHours = generateRunningHours(currentDay, nextDay, interval);

    this.hourMap = runningHours.reduce(
      (acc, hour) => ({
        ...acc,
        ...hour,
      }),
      {}
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next({});
  }
}
