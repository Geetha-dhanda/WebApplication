import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

import { UserService } from "../user.service";

@Component({
  templateUrl: "./createuser.component.html",
  styleUrls: ["./createuser.component.css"]
})
export class CreateUserComponent implements OnInit, OnDestroy {
  isLoading = false;
  private userStatusSub: Subscription;

  constructor(public userService: UserService,
    public route: ActivatedRoute
    ) {}

  ngOnInit() {
    this.userStatusSub = this.userService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
  }

  onAddUser(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.userService.createUser(form.value.name, form.value.surname, form.value.email);
  }

  ngOnDestroy() {
    this.userStatusSub.unsubscribe();
  }
}
