import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { Api } from '../api';
import { Channel } from '../app.interfaces';

@Component({
  selector: 'xm-nav',
  template: `
  <nav class="navbar navbar-inverse navbar-toggleable-sm">
    <div class="container">
      <a class="navbar-brand" routerLink="/">[xmplaylist]</a>
    </div>
  </nav>
  `,
  styles: [`
  .dropdown-menu {
    max-height: 400px;
    overflow-x: scroll;
  }
  .navbar {
    background: #181818;
  }
  .navbar-brand {
    font-family: "Times New Roman", -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  }
  `],
})
export class NavComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  channelName: string;
  private sub: Subscription;

  constructor(
    private api: Api,
  ) { }

  ngOnInit() {
    this.sub = this.api.currentChannel.subscribe((channelName) => {
      this.channelName = channelName;
      console.log(channelName);
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }


}
