import { Component } from '@angular/core';

@Component({
  selector: 'xm-root',
  template: `
  <xm-nav></xm-nav>
  <router-outlet></router-outlet>
  `,
})
export class AppComponent {
}
