import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromRoot from './reducers/index.reducer';
import { effects } from './effects/index.effects';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { WeatherComponent } from './containers/weather/weather.component';
import { WeekComponent } from './components/week/week.component';
import { DayComponent } from './components/day/day.component';
import { ThemeComponent } from './components/theme/theme.component';
import { LoadingWrapperComponent } from './components/loading-wrapper/loading-wrapper.component';

export const REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<fromRoot.State>
>('Registered Reducers');

export const getReducers = () => fromRoot.reducers;

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    WeatherComponent,
    WeekComponent,
    DayComponent,
    ThemeComponent,
    LoadingWrapperComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('state', REDUCER_TOKEN),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature(effects),
  ],
  providers: [
    {
      provide: REDUCER_TOKEN,
      useFactory: getReducers,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
