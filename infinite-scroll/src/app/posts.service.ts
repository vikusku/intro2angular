import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PostModel } from "./post.model";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  posts: Array<PostModel> = [
    new PostModel('one', 'one descr', "https://pi.tedcdn.com/r/talkstar-assets.s3.amazonaws.com/production/playlists/playlist_398/reconnect_with_nature.jpg?"),
    new PostModel('two', 'two descr', "https://pi.tedcdn.com/r/talkstar-assets.s3.amazonaws.com/production/playlists/playlist_398/reconnect_with_nature.jpg?"),
    new PostModel('three', 'three descr', "https://pi.tedcdn.com/r/talkstar-assets.s3.amazonaws.com/production/playlists/playlist_398/reconnect_with_nature.jpg?"),
    new PostModel('four', 'four descr', "https://pi.tedcdn.com/r/talkstar-assets.s3.amazonaws.com/production/playlists/playlist_398/reconnect_with_nature.jpg?"),
    new PostModel('five', 'five descr', "https://pi.tedcdn.com/r/talkstar-assets.s3.amazonaws.com/production/playlists/playlist_398/reconnect_with_nature.jpg?"),
    new PostModel('six', 'six descr', "https://pi.tedcdn.com/r/talkstar-assets.s3.amazonaws.com/production/playlists/playlist_398/reconnect_with_nature.jpg?"),
    new PostModel('seven', 'seven descr', "https://pi.tedcdn.com/r/talkstar-assets.s3.amazonaws.com/production/playlists/playlist_398/reconnect_with_nature.jpg?"),
    new PostModel('eight', 'eight descr', "https://pi.tedcdn.com/r/talkstar-assets.s3.amazonaws.com/production/playlists/playlist_398/reconnect_with_nature.jpg?"),
    new PostModel('nine', 'nine descr', "https://pi.tedcdn.com/r/talkstar-assets.s3.amazonaws.com/production/playlists/playlist_398/reconnect_with_nature.jpg?"),
    new PostModel('ten', 'ten descr', "https://pi.tedcdn.com/r/talkstar-assets.s3.amazonaws.com/production/playlists/playlist_398/reconnect_with_nature.jpg?"),
    new PostModel('eleven', 'eleven descr', "https://pi.tedcdn.com/r/talkstar-assets.s3.amazonaws.com/production/playlists/playlist_398/reconnect_with_nature.jpg?"),
  ]

  getPosts(pageNo: number, pageSize: number): Observable<Array<PostModel>> {
    return new Observable(subscriber => {
      if (pageNo === 0) {
        subscriber.next(this.getPagedPosts(pageNo, pageSize));
        subscriber.complete();
      } else {
        setTimeout(()=> {
          subscriber.next(this.getPagedPosts(pageNo, pageSize));
          subscriber.complete();
        }, 1000)
      }
    });
  }

  getPagedPosts(pageNo: number, pageSize: number): Array<PostModel> {
    const start = pageNo * pageSize;
    return this.posts.slice(start, start + pageSize);
  }
}
