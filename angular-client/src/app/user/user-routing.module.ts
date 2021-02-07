import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CreateUserComponent } from "./create-user-data/createuser.component";
import { UserListComponent } from "./display-user-data/user-list.component";

const routes: Routes = [

  { path: "add", component: CreateUserComponent },
  { path: "list", component: UserListComponent }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UserRoutingModule {}
