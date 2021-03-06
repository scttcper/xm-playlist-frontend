import { Component } from '@angular/core';

import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

@Component({
  selector: 'xm-root',
  template: `
  <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  constructor(googleAnalytics: Angulartics2GoogleAnalytics) {
    googleAnalytics.startTracking();
  }
}
