import { Component, EventEmitter, Output, OnChanges } from '@angular/core';
import { Input } from '@angular/core';
import * as dayjs from 'dayjs';

import { Hour } from '../../models/hour.model';
import { generateMockLocation, Location } from '../../models/location.model';
import { ICON_PATH } from '../../util/constants';

@Component({
  selector: 'jon-day-component',
  templateUrl: 'day.component.html',
  styleUrls: ['day.component.scss'],
})
export class DayComponent {
  iconPath = ICON_PATH;

  @Input() hourMap: { [id: string]: Hour } = {};
  @Input() currentLocation: Location = generateMockLocation();
  @Input() activeHourKey = '';
  @Input() temperature: 'celsius' | 'fahrenheit' = 'fahrenheit';

  @Output() temperatureSelected = new EventEmitter<'celsius' | 'fahrenheit'>();

  get hourKeys(): string[] {
    if (!this.hourMap) {
      return [];
    }

    return Object.keys(this.hourMap);
  }

  ngOnChanges(): void {
    this.activeHourKey = Object.keys(this.hourMap)[0] || '';
  }

  formatHour(key: string): string {
    if (!key) {
      return '';
    }

    const hour = key.split(':')[0];

    return dayjs(
      dayjs()
        .set('hour', +hour)
        .set('minute', 0)
    ).format('h A');
  }

  setActiveHour(key: string): void {
    if (!key) {
      return;
    }

    this.activeHourKey = key;
  }

  getPath(icon: string): string {
    return `${this.iconPath}/${icon}.svg`;
  }
}
