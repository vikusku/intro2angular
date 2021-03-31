import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { PostService } from './post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isLoading: boolean = false;
  error: string = null;
  errorSubscribtion: Subscription;

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
    this.errorSubscribtion = this.postService.errorSubject.subscribe((errorMessage) => {
      this.error = errorMessage;
    })

    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.postService.createPost(postData);
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    this.postService.clearPosts();
  }

  onErrorHandle(): void {
    this.error = null;
  }

  private fetchPosts() {
    this.isLoading = true;

    this.postService.fetchPosts()
    .subscribe(
      (posts: Post[]) => {
      this.loadedPosts = posts;
      this.isLoading = false;
    },
      (error: string) => {
        this.error = error;
        this.isLoading = false;
      });
  }
 }
