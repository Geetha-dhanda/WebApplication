import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { environment } from "../environments/environment";

const routes: Routes = [
  {
    path: '',
    redirectTo: environment.defaultClientRoute,
    pathMatch: 'full'
  },
  { path: "user", loadChildren: () => import('./user/user.module').then(m => m.UserModule)  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
