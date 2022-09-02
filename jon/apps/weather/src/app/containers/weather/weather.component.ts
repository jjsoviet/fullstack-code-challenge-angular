import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { first, filter } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import * as fromWeather from '../../reducers/index.reducer';
import * as fromLocation from '../../reducers/index.reducer';

import * as WeatherActions from '../../actions/weather.actions';
import * as LocationActions from '../../actions/location.actions';

import { Day } from '../../models/day.model';
import { Hour } from '../../models/hour.model';
import { generateMockLocation, Location } from '../../models/location.model';

@Component({
  selector: 'jon-weather',
  templateUrl: 'weather.component.html',
  styleUrls: ['weather.component.scss'],
})
export class WeatherComponent {
  // Load weather days (week)
  // isLoading$ = this.store.pipe(select(fromLoadingError.getIsLoading([FETCH_WEATHER])))
  // hasError$ = this.store.pipe(select(fromLoadingError.getHasError([FETCH_WEATHER])))

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
        this.setHourMap(this.weatherDays[0]);
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
    this.setHourMap(this.activeDay);
  }

  setHourMap(day: Day, interval = 3): void {
    if (!day) {
      return;
    }

    const runningHours = Object.keys(day.hourly);

    for (let i = 0; i < runningHours.length; i += interval) {
      this.hourMap = {
        ...this.hourMap,
        [runningHours[i]]: day.hourly[runningHours[i]],
      };
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next({});
  }
}
