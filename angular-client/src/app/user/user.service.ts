import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "../../environments/environment";
import { UserData } from "./user-data.model";

const BACKEND_URL = environment.apiUrl + "/user/";

@Injectable({ providedIn: "root" })
export class UserService {
  private posts: UserData[] = [];
  private postsUpdated = new Subject<{ posts: UserData[]; postCount: number }>();
  private token: any;

  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(name: string, surname: string, email: string) {
    const posts: UserData = { name:name, surname:surname, email: email };
    this.http.post(BACKEND_URL + "add", posts).subscribe(
      () => {
        this.router.navigate([environment.defaultClientRoute]);
      },
      error => {
        this.authStatusListener.next(false);
      }
    );
  }



  getUsers(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    const serverUrl = BACKEND_URL + "list" + queryParams ;

    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(serverUrl)
      .pipe(
        map(postData => {
          return {
            posts: postData.posts,
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }



}
