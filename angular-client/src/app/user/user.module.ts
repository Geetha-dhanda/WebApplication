import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AngularMaterialModule } from "../angular-material.module";
import { MatTableModule } from "@angular/material/table"



import { UserRoutingModule } from "./user-routing.module";
import { CreateUserComponent } from "./create-user-data/createuser.component";
import { UserListComponent } from "./display-user-data/user-list.component";



@NgModule({
  declarations: [CreateUserComponent, UserListComponent],
  imports: [CommonModule, AngularMaterialModule, FormsModule, MatTableModule, UserRoutingModule]
})
export class UserModule {}
