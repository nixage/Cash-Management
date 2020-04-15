import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth-service/auth.service';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate, CanLoad {

  constructor(private router: Router, private authService: AuthService, private toastrService: ToastrService){}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean{
    return this.authService.isAuthenticate().pipe(
      map( data => {
        if (data['authenticated']){
          return true
        }
        this.toastrService.error('Please Log-In', 'Error')
        this.router.navigateByUrl('auth/sign-in')
        return false;
      })
    ).toPromise()

  }
  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticate().pipe(
      map( data => {
        if (data['authenticated']){
          return true
        }
        this.toastrService.error('Please Log-In', 'Error')
        this.router.navigateByUrl('auth/sign-in')
        return false;
      })
    ).toPromise()
  }
}
