import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  userActivated:boolean = false;
  userActivationSubsribtion: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userActivationSubsribtion = this.userService.userActivation.subscribe((isActivated: boolean) => {
      this.userActivated = isActivated;
    })
  }

  ngOnDestroy(): void {
    this.userActivationSubsribtion.unsubscribe();
  }
}
