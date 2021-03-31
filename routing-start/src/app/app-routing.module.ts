import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgModule } from "@angular/core";
import { AuthGuard } from './auth-guard.service';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';
import { ErrorComponentComponent } from './error-component/error-component.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent , children: [
    { path: ':id/:name', component: UserComponent }
  ]},
  { path: 'servers', canActivateChild: [AuthGuard], component: ServersComponent, children: [
    { path: ':id', component: ServerComponent },
    { path: ':id/edit', canDeactivate: [CanDeactivateGuard], component: EditServerComponent }
  ] },
  // { path: '404', component: PageNotFoundComponent},
  { path: '404', component: ErrorComponentComponent, data: {message: 'Oooops! Page not found'} },
  { path: '**', redirectTo: '404'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{ }
