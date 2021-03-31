import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Output() onServerCreate = new EventEmitter<{name: string, content: string}>();
  @Output('onBPCreate') onBlueprintCreate = new EventEmitter<{name: string, content: string}>();
  @ViewChild('serverContentInput') serverContentInput: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  onAddServer(serverNameInput: HTMLInputElement): void {
    if (serverNameInput.value !== '' && this.serverContentInput.nativeElement.value !== '') {
      this.onServerCreate.emit({
        name: serverNameInput.value,
        content: this.serverContentInput.nativeElement.value
      });
    }
  }

  onAddBlueprint(serverNameInput: HTMLInputElement): void {
    if (serverNameInput.value !== '' && this.serverContentInput.nativeElement.value !== '') {
      this.onBlueprintCreate.emit({
        name: serverNameInput.value,
        content: this.serverContentInput.nativeElement.value
      });
    }
  }
}
