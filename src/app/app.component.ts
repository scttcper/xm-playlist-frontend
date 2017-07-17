import { Component } from '@angular/core';
import { Angulartics2GoogleAnalytics } from 'angulartics2';

@Component({
  selector: 'xm-root',
  template: `
  <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  constructor(angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) { }
}
