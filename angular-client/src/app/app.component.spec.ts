import { APP_BASE_HREF } from '@angular/common';
import { TestBed, async , ComponentFixture } from '@angular/core/testing';
//import { RouterModule, Routes } from "@angular/router";
import { AngularMaterialModule } from "./angular-material.module";
import { AppComponent } from './app.component';
//import { CreateUserComponent } from "./user/create-user-data/createuser.component";
//import { UserListComponent } from "./user/display-user-data/user-list.component";



describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let appComponent: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      imports: [
        AngularMaterialModule  ],
      providers: [

      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      appComponent = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));
  it('should create the app', async(() => {
    expect(appComponent).toBeTruthy();
  }));
 it(`should have as title `, async(() => {
  expect(appComponent.title).toEqual('Sapiens-Task');
  }));
  it('should render app-heade tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-header'));
  }));
  it('should render router-outlet tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('router-outlet'));
  }));

});
