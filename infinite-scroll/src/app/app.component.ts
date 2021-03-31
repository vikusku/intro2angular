import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { PostModel } from './post.model';
import { PostsService } from './posts.service';
import { WindowScrollService } from './window-scroll.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  posts: PostModel[] = [];
  pageNo: number = 0;
  pageSize: number = 3;

  constructor(private postsService: PostsService, private windowScrollService: WindowScrollService) {}

  @HostListener('window:scroll', ['$event']) onScroll(e: Event): void {
    this.windowScrollService.updateWindowPosition(e.target['scrollingElement'].scrollTop);
  }

  ngOnInit(): void {
    this.postsService.getPosts(this.pageNo, this.pageSize).subscribe(posts => {
      this.posts = posts;
      this.pageNo++;
    })

    this.windowScrollService.windowPosition$.subscribe(updatedPosition => {
      let scrollHeight = this.windowScrollService.getScrollHeight();
      if (updatedPosition >= scrollHeight && this.pageNo > 0) {
        console.log('BOTTOM');

        this.postsService.getPosts(this.pageNo, this.pageSize).subscribe(posts => {
          this.posts.push(...posts);
          this.pageNo++;
        })
      }
    })
  }

  loadMore(): void {
    this.postsService.getPosts(this.pageNo, this.pageSize).subscribe(posts => {
      this.posts.push(...posts);
      this.pageNo++;
    })
  }
}
