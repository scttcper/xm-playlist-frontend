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
    transition: all 0.2s linear;
    font-family: 'Gruppo', cursive, "Times New Roman", -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
  }
  .navbar-brand:hover {
    transition: all 0.2s linear;
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #ff00de, 0 0 35px #ff00de, 0 0 40px #ff00de, 0 0 50px #ff00de, 0 0 75px #ff00de;
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
