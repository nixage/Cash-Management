import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeGuard } from './home-module/guard/home.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './auth-module/guard/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'auth', loadChildren: () => import('./auth-module/auth.module').then(m => m.AuthModule), canLoad: [AuthGuard], canActivate: [AuthGuard],},
  {path: 'home', loadChildren: () => import('./home-module/home.module').then(m => m.HomeModule), canLoad: [HomeGuard]},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '404', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
