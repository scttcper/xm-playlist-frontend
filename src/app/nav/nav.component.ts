import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { Api } from '../api';
import { Channel } from '../app.interfaces';

@Component({
  selector: 'xm-nav',
  templateUrl: './nav.component.html',
  styles: [`
    .dropdown-menu {
      max-height: 400px;
      overflow-x: scroll;
    }
  `],
})
export class NavComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  channels: Observable<Channel[]>;
  channelName: string;
  private sub: Subscription;

  constructor(
    private api: Api,
  ) { }

  ngOnInit() {
    this.channels = this.api.getChannels();
    this.sub = this.api.currentChannel.subscribe((channelName) => {
      this.channelName = channelName;
      console.log(channelName);
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }


}
