import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class CounterService {
  activatingActionsCount: number = 0;
  deactivationActionsCount: number = 0;

  incrementActivatingActionsCount() {
    this.activatingActionsCount++;
    console.log('Total activations: ' + this.activatingActionsCount);
  }

  incrementDeactivationActionsCount() {
    this.deactivationActionsCount++;
    console.log('Total deactivations: ' + this.deactivationActionsCount);
  }
}
