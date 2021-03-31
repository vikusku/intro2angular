import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  countSubscriber: Subscription;

  constructor() {}

  ngOnInit() {
    const countObservable = Observable.create((subscriber) => {
      let count = 0;
      setInterval(() => {
        subscriber.next(count);
        count++;

        if (count === 4) {
          subscriber.complete();
        }

        if (count >  5) {
          subscriber.error("Count is more then 3!!!");
        }

      }, 1000)
    })

    const countObservableWithOperators = countObservable.pipe(filter((data:number) => {
      return data !== 0;
    }), map((data:number) => {
      return 'Round ' + (data);
    }))

    this.countSubscriber = countObservable.subscribe((data) => {
      console.log(data)
    }, (error) => {
      alert("Error! Count is more then 3");
    }, () => {
      console.log("Complete!");
    })
  }

  ngOnDestroy(): void {
    this.countSubscriber.unsubscribe();
  }
}
