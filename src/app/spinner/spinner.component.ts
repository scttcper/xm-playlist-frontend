import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'xm-spinner',
  template: `
    <div class="your-loader mb-3 mt-3"></div>
  `,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
