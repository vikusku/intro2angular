import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  even: number[] = [];
  odd: number[] = [];

  doSmth(value:number): void {
    value % 2 === 0 ? this.even.push(value) : this.odd.push(value);
  }
}
