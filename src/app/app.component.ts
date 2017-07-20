import { Component } from '@angular/core';
import { Angulartics2GoogleAnalytics } from 'angulartics2';

@Component({
  selector: 'xm-root',
  template: `
  <xm-nav></xm-nav>
  <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  constructor(angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) { }
}
