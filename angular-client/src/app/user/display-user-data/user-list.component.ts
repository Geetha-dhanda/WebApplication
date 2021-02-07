import { Component, OnInit, OnDestroy } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Subscription } from "rxjs";

import { UserData } from "../user-data.model";
import { UserService } from "../../user/user.service";
import { environment } from "../../../environments/environment";


@Component({
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})
export class UserListComponent implements OnInit, OnDestroy {

  posts: UserData[] = [];
  isLoading = false;
  totalPosts = environment.pagination.totalPosts;
  postsPerPage = environment.pagination.postsPerPage;
  currentPage = environment.pagination.currentPage;
  pageSizeOptions = environment.pagination.pageSizeOptions;
  userIsAuthenticated = true;
  displayedColumns: string[] = [ 'name', 'surname', "email"];
  private postsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(

    private userService: UserService
  ) {}

  ngOnInit() {

    this.isLoading = true;
    this.userService.getUsers(this.postsPerPage, this.currentPage);
    this.postsSub = this.userService.getPostUpdateListener()
    .subscribe((posts: { posts: UserData[]; postCount: number }) => {
      this.isLoading = false;
      this.totalPosts = posts.postCount;
      this.posts = posts.posts;
    });

    this.authStatusSub = this.userService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;

      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.userService.getUsers(this.postsPerPage, this.currentPage);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
