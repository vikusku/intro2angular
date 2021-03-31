import { Component } from '@angular/core';

import { Server } from './server.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  servers: Server[] = [];

  onServerAdded(event: {name: string, content: string}): void {
    this.addServer('server', event.name, event.content);
  }

  onBlueprintAdded(event: {name: string, content: string}): void {
    this.addServer('blueprint', event.name, event.content);
  }

  addServer(type: string, name: string, content: string): void {
      this.servers.push({
        type: type,
        name: name,
        content: content
    });
  }
}
