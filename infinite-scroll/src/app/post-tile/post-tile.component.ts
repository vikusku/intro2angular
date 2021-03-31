import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { PostModel } from '../post.model';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {
  @Input() post: PostModel;

  constructor() { }

  ngOnInit(): void {
  }

}
