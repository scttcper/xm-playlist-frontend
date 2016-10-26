import { Component, OnInit } from '@angular/core';

import { Api } from '../api';
import { Channel } from '../channel';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  channels: Channel[];

  constructor(private api: Api) { }

  ngOnInit() {
    this.api.getChannels().then((channels => this.channels = channels));
  }

}
