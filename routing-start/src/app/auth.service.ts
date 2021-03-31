export class AuthService {
  loggedIn = false

  isAuthenticated(): Promise<{}> {
    let promise = new Promise((resolve, reject) => {
      setTimeout(()=> {
        resolve(this.loggedIn);
      }, 800);
    });

    return promise;
  }

  login(): void {
    this.loggedIn = true;
  }

  logout(): void {
    this.loggedIn = false;
  }
}
