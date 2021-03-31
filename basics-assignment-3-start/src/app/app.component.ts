import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isPasswordDisplayed = false;
  clickLog = [];

  onDisplayDetailsClick(): void {
    this.isPasswordDisplayed = !this.isPasswordDisplayed;
    this.clickLog.push(new Date());
  }
}
