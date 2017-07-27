import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'xm-spinner',
  template: `
    <div class="your-loader"></div>
  `,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
