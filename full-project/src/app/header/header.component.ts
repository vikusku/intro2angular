import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
  isAuthenticated: boolean = false;
  authenticationSubject: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.authenticationSubject = this.authService.userAuthenticatedSubject
      .subscribe(user => {
        this.isAuthenticated = !!user;
      });
  }

  onSaveData(): void {
    this.dataStorageService.saveRecipe();
  }

  onFetchData(): void {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy(): void {
    this.authenticationSubject.unsubscribe();
  }

  onLogout(): void {
    this.authService.logout();
  }
}
