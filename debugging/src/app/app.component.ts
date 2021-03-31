import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  servers = [];
  index = 0;

  onAddServer() {
    this.servers.push('Another Server ' + this.index);
    this.index++;
  }

  onRemoveServer(id: number) {
    // const position = id + 1;
    this.servers.splice(id, 1);
  }
}
