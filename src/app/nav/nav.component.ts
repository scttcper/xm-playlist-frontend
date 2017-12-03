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
    background: #242944;
  }
  .navbar-brand {
    color: #fff;
    transition: all 0.2s linear;
    font-family: 'Gruppo', cursive, "Times New Roman",
      -apple-system, system-ui, BlinkMacSystemFont,
      "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
  }
  .navbar-brand:hover {
    transition: all 0.2s linear;
    text-shadow: 0 0 5px #666, 0 0 10px #999, 0 0 15px #000, 0 0 20px #fff;
  }
  `,
  ],
})
export class NavComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  channelName: string;

  constructor() {}

  ngOnInit() {}
  ngOnDestroy() {}
}
