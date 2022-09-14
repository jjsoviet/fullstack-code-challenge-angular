import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Input } from '@angular/core';

import { Day } from '../../models/day.model';
import { ICON_PATH } from '../../util/constants';

@Component({
  selector: 'jon-week-component',
  templateUrl: 'week.component.html',
  styleUrls: ['week.component.scss'],
})
export class WeekComponent {
  iconPath = ICON_PATH;

  @Input() weatherDays: Day[] = [];
  @Input() activeDay: Day = this.weatherDays[0] || null;
  @Input() temperature: 'celsius' | 'fahrenheit' = 'fahrenheit';

  @Output() daySelected = new EventEmitter<Day>();

  ngOnInit(): void {
    this.activeDay = this.weatherDays[0] || null;
  }

  getPath(icon: string): string {
    return `${this.iconPath}/${icon}.svg`;
  }
}
