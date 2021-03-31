import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  @Output() onIncrement = new EventEmitter<number>();
  count: number = 0;
  intervalID: number;

  constructor() { }

  ngOnInit(): void {
  }

  onStartGame(): void {
    console.log("Start incerement");
    this.intervalID = setInterval(
      () => {
        this.onIncrement.emit(this.count++)
      }, 1000
    );
    console.log("intervalID " + this.intervalID);
  }

  onStopGame(): void {
    console.log("Stop incerement");
    clearInterval(this.intervalID);
  }
}
