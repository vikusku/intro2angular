import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WindowScrollService{
  windowPosition = new BehaviorSubject(0);
  windowPosition$ = this.windowPosition.asObservable();

  constructor() {}

  updateWindowPosition(scrollTop: number): void {
    this.windowPosition.next(window.innerHeight + scrollTop);
  }

  getScrollHeight(): number {
    return Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
  }
}
