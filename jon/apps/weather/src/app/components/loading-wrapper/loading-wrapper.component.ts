import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'jon-loading-wrapper-component',
  templateUrl: 'loading-wrapper.component.html',
  styleUrls: ['loading-wrapper.component.scss'],
})
export class LoadingWrapperComponent {
  @Input() loading: boolean | null = false;
  @Input() error: boolean | null = false;
  @Input() errorMessage = 'Unable to display data.';
  @Input() retryable = false;

  @Output() retry = new EventEmitter<void>();
}
