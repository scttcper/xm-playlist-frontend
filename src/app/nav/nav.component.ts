import { Component, OnInit, OnDestroy } from '@angular/core';

import { Api } from '../api';
import { Channel } from '../app.interfaces';

@Component({
  selector: 'xm-nav',
  template: `
  <nav class="navbar navbar-inverse navbar-toggleable">
    <div class="container">
      <a class="navbar-brand" routerLink="/">xmplaylist</a>
    </div>
  </nav>
  `,
  styles: [`
  .dropdown-menu {
    max-height: 400px;
    overflow-x: scroll;
  }
  .navbar {
    background: #242944;
  }
  .navbar-brand {
    font-family: 'Gruppo', cursive, "Times New Roman", -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
  }
  `],
})
export class NavComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  channelName: string;

  constructor(
    private api: Api,
  ) { }

  ngOnInit() {

  }
  ngOnDestroy() {

  }


}
