import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild('authForm') authForm: NgForm;
  @ViewChild(PlaceHolderDirective) alertHost: PlaceHolderDirective;
  alertCloseSbcr: Subscription;
  isLoginState: boolean = false;
  isAuthenticating: boolean = false;
  error: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  onStateSwith(): void {
    this.isLoginState = !this.isLoginState;
  }

  onSubmit(): void {
    if (this.authForm.invalid) {
      return
    }

    this.isAuthenticating = true;
    this.error = '';

    const email = this.authForm.value.email;
    const password = this.authForm.value.password;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginState) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(response => {
      this.isAuthenticating = false;
      this.router.navigate(['/recipes']);
    }, errorMessage => {
      this.error = errorMessage;
      this.showErrorMessage(errorMessage);
      this.isAuthenticating = false;
    });

    this.authForm.reset();
  }

  handleClose(): void {
    this.error = null;
  }

  ngOnDestroy(): void {
    if (this.alertCloseSbcr) {
      this.alertCloseSbcr.unsubscribe();
    }
  }

  private showErrorMessage(message: string) {
    let alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const alertContainerRef = this.alertHost.viewContainerRef;
    alertContainerRef.clear();
    const componentRef = alertContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = message;

    this.alertCloseSbcr = componentRef.instance.close.subscribe(event => {
      this.alertCloseSbcr.unsubscribe();
      alertContainerRef.clear();
    });
  }
}
