import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  errorSubject: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) { }

  createPost(post: Post): void {
    this.http.post<{name: string}>(
      'https://ng-complete-guide-ef36c-default-rtdb.firebaseio.com/posts.json',
      post, {
        observe: 'response',
        headers: {
          'Silly-header': 'silly-value'
        }
      })
      .subscribe(response => {
        console.log(response);
      }, error => {
        this.errorSubject.next(error.message);
      });
  }

  fetchPosts(): Observable<Post[]> {
    let requestParams = new HttpParams();
    requestParams = requestParams.append('print', 'pretty');
    requestParams = requestParams.append('hello', 'world');

    return this.http.get<{[key: string]: Post}>(
      'https://ng-complete-guide-ef36c-default-rtdb.firebaseio.com/posts.json',
      {
        headers: new HttpHeaders({
          'Custom-header': 'test',
        }),
        params: requestParams
      })
    .pipe(map(response => {
      let postArray: Post[] = [];

      for (let key in response) {
        postArray.push({...response[key], id: key});
      }

      return postArray
    }), catchError(error => {
      return throwError(this.getErrorMessage(error));
    }))
  }

  private getErrorMessage(error:any): string {
    switch(error.status) {
      case 401:
        return 'Please login or signup to perform following operation.';
      case 404:
        return 'Ooops! Resourse not found.';
      default:
        return 'Something went wrong. Please contact administrator.';
    }
  }

  clearPosts(): void {
    this.http.delete(
      'https://ng-complete-guide-ef36c-default-rtdb.firebaseio.com/posts.json', {
        observe: 'events',
      })
      .pipe(tap(event => {
        console.log(event);
        if (event.type === HttpEventType.Response) {
          console.log("RESPONSE");
        }
      }))
      .subscribe(response => {
        console.log(response);
      })
  }
}
