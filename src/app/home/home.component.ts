import { Component, OnInit } from '@angular/core';

import { Api } from '../api';
import { Channel } from '../channel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  channels: Channel[];

  constructor(private api: Api) { }

  ngOnInit() {
    this.api.getChannels().then((channels => this.channels = channels));
  }

}
