import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jon-theme-component',
  templateUrl: 'theme.component.html',
  styleUrls: ['theme.component.scss'],
})
export class ThemeComponent {
  theme = 'light';

  ngOnInit(): void {
    this.theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('theme', this.theme);
  }

  switchTheme(newTheme: 'dark' | 'light') {
    document.documentElement.setAttribute('theme', (this.theme = newTheme));
    localStorage.setItem('theme', newTheme);
  }
}
