import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";

export interface CanComponentDeactivate {
  canDeactivate(): Promise<boolean> | Observable<boolean> | boolean
}

export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(
    canComponentDeactivate: CanComponentDeactivate,
    currentRoute:	ActivatedRouteSnapshot,
    currentState:	RouterStateSnapshot,
    nextState?:	RouterStateSnapshot
  ): Promise<boolean> | Observable<boolean> | boolean {
    return canComponentDeactivate.canDeactivate();
  }
}
