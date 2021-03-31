import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') submitForm: NgForm;
  subscribtions: string[] = ['Basic', 'Advanced', 'Pro'];
  submitted: boolean = false;
  userInput = {
    email: '',
    subscribtion: '',
    password: ''
  }

  onSubmit(): void {
    this.userInput.email = this.submitForm.value.email;
    this.userInput.subscribtion = this.submitForm.value.subscribtion;
    this.userInput.password = this.submitForm.value.password;

    this.submitted = true;
  }
}
