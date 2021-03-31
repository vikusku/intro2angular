import { Injectable, EventEmitter} from "@angular/core";
import { LoggingService } from "./logging.service";

@Injectable({providedIn: 'root'})
export class AccountsService {
  accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];

  statusUpdateNotifier: EventEmitter<string> = new EventEmitter<string>();

  constructor(private logginService: LoggingService) {}

  addAccount(name: string, status: string) {
    this.accounts.push({name: name, status: status});
    this.logginService.logStatusChange(status);
  }

  updateStatus(updateInfo: {id: number, status: string}) {
    this.accounts[updateInfo.id].status = updateInfo.status;
    this.logginService.logStatusChange(status);
  }
}
