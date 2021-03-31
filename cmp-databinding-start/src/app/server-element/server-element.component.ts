import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Server } from '../server.model';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit, OnChanges {
  // @Input() element: {name: string, type: string, content: string};
  @Input('srvElement') element: Server;

  constructor() {
    console.log('constructor called');
  }

  ngOnInit(): void {
    console.log('ngOnInit called!');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges called!');
    console.log(changes);
  }
}
