import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginModule} from "./login/login.module";
import {HomepageModule} from "./homepage/homepage.module";


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./login/login.module').then(() => LoginModule)
      },
      {
        path:'home',
        loadChildren: () =>  import('./homepage/homepage.module').then(() => HomepageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
