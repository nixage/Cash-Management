import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../service/auth-service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService
      .isAuthenticate()
      .pipe(
        map((data) => {
          if (data['authenticated']) {
            this.toastrService.error('You are loggined', 'Error');
            this.router.navigateByUrl('home');
            return false;
          }
          return true;
        })
      ).toPromise();
  }
  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService
      .isAuthenticate()
      .pipe(
        map((data) => {
          if (data['authenticated']) {
            this.toastrService.error('You are loggined', 'Error');
            this.router.navigateByUrl('home');
            return false;
          }
          return true;
        })
      )
      .toPromise();
  }
}
