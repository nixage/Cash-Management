import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// AUTH-HOME COMPONENT
import { AuthHomeComponent } from './auth-home/auth-home.component';
// CHILD COMPONENT
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
  {
    path: 'auth', 
    component: AuthHomeComponent,
    canLoad: [AuthGuard], canActivate: [AuthGuard],
    children: [
      {path: 'sign-in', component: SignInComponent},
      {path: 'sign-up', component: SignUpComponent},
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
