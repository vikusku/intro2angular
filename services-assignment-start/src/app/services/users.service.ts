import { Injectable } from "@angular/core";
import { CounterService } from "./counter.service";

@Injectable({providedIn: 'root'})
export class UsersService {
  activeUsers = ['Max', 'Anna'];
  inactiveUsers = ['Chris', 'Manu'];

  constructor(private counterService: CounterService) {}

  doActivateUser(username: string, id: number) {
    this.activeUsers.push(username);
    this.inactiveUsers.splice(id, 1);

    this.counterService.incrementActivatingActionsCount();
  }

  doDeactivateUser(username: string, id: number) {
    this.inactiveUsers.push(username);
    this.activeUsers.splice(id, 1);

    this.counterService.incrementDeactivationActionsCount();
  }
}
