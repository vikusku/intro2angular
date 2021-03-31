import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-successalert',
  template: `<div class="success-alert">Success!!!</div>`,
  styles: [`
    .success-alert {
      background-color: green;
      color: white;
    }
  `]
})
export class SuccessalertComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
