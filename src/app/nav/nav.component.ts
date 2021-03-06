import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'xm-nav',
  template: `
    <nav class="navbar navbar-inverse navbar-toggleable">
      <div class="container">
        <a class="navbar-brand" routerLink="/">xmplaylist</a>
      </div>
    </nav>
  `,
  styles: [
    `
      .dropdown-menu {
        max-height: 400px;
        overflow-x: scroll;
      }
      .navbar {
        background: #33485a;
      }
      .navbar-brand {
        font-weight: 600;
        transition: all 0.2s ease-in;
        color: #fff;
        font-family: 'Open Sans', system-ui, -apple-system, BlinkMacSystemFont,
          Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Droid Sans,
          Helvetica Neue, Fira Sans, sans-serif;
      }
      .navbar-brand:hover {
        color: yellow;
      }
    `
  ]
})
export class NavComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  channelName: string;

  constructor() {}

  ngOnInit() {}
  ngOnDestroy() {}
}
