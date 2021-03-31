import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.allowEdit = params['allowEdit'] === '1' ? true : false;
    })

    this.server = this.serversService.getServer(+this.route.snapshot.params['id']);
    this.route.params.subscribe((params: Params) => {
      this.server = this.serversService.getServer(+params['id']);
    })

    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  canDeactivate(): Promise<boolean> | Observable<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }

    if ((this.server.name !== this.serverName || this.server.status !== this.serverStatus)
      && !this.changesSaved) {
      confirm('Are you sure you want to live page? All unsaved changes will be lost?');
    } else {
      return true;
    }
  }
}
