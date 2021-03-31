import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, Subject, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { User } from "./user.model";

export interface AuthResponseData {
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  APIkey: string = 'AIzaSyAZ07LXGgnDablV64brk02aygPFB9k8cLI';
  userAuthenticatedSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  tokenExpirationTimer: any;

  constructor(private httpClient: HttpClient, private router: Router) {}

  signup(email: string, password: string): Observable<AuthResponseData> {
    return this.httpClient.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.APIkey,
      {
        email: email,
        password: password,
        returnSecureToken:true
      },
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }
    )
    .pipe(catchError(this.handleErrorResponse), tap(response => {
      this.handleAuthentication(
        response.email,
        response.localId,
        response.refreshToken,
        +response.expiresIn)
    }));
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.httpClient.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.APIkey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      },
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }
    ).pipe(catchError(this.handleErrorResponse), tap(response => {
      this.handleAuthentication(
        response.email,
        response.localId,
        response.idToken,
        +response.expiresIn)
    }))
  }


  autoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(()=> {
      this.logout();
    }, expirationDuration);
  }

  logout(): void {
    this.userAuthenticatedSubject.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin(): void {
    const userData: {
      email: string,
      userId: string,
      _token: string,
      _expirationDate: Date
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const user = new User(
      userData.email,
      userData.userId,
      userData._token,
      new Date(userData._expirationDate)
    );

    if (user.token) {
      this.userAuthenticatedSubject.next(user);
      const tokenExpiration = new Date(userData._expirationDate).getTime() - new Date().getTime();
      this.autoLogout(tokenExpiration);
    }
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number): void {
      const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
      const user = new User(email, userId, token, expirationDate);

      this.userAuthenticatedSubject.next(user);
      this.autoLogout(expiresIn * 1000);
      localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleErrorResponse(errorRes: HttpErrorResponse): Observable<never> {
    let errorMessage: string = 'An unknown error occured';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }

    switch(errorRes.error.error.message) {
      case 'EMAIL_EXISTS' :
        errorMessage = 'Email already exists!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'User with such email does not exist. Please sign up first.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Username or password is incorrect';
        break;
      case 'USER_DISABLED' :
        errorMessage = 'Accound was deactivated. Please contact administrator.'
        break;
    }

    return throwError(errorMessage);
  }
}
