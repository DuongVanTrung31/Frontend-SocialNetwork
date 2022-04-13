import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login.component";
import {SignupComponent} from "./signup/signup.component";


const routes: Routes = [
  {
    path: '',
    component:LoginComponent,
    children: [
      {
        path: "",
        component: SignupComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {
}
