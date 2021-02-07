import { TestBed, async , ComponentFixture } from '@angular/core/testing';
import { RouterModule, Routes } from "@angular/router";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserService } from './user.service';
import { UserListComponent } from "./display-user-data/user-list.component";


describe('UserService', () => {
  let userservice: UserService;
  let httpMock: HttpTestingController;
  const routes: Routes = [

    { path: 'user/list', component: UserListComponent },
    { path: '', redirectTo: '/user/list', pathMatch: 'full'}
  ]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot(routes),
        HttpClientTestingModule
      ],
      providers: [ UserService  ]
    });
    userservice = TestBed.get(UserService);
    httpMock = TestBed.get(HttpTestingController);
  }));
  it('should create the UserService', async(() => {
    expect(UserService).toBeTruthy();
  }));
  it('Get User() should return  data', () => {
    userservice.getPostUpdateListener().subscribe(posts => {
      expect(posts.posts).toBe([]);

    });
  });
});
