import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IUser } from 'src/app/interface/user/user.interface';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:3001/auth/';

  constructor(private http: HttpClient, private router: Router, private toastrService: ToastrService) { }

  login(user): Observable<IUser>{
    return this.http.post<IUser>(this.baseUrl + 'sign-in', user).pipe(
      map( (data:IUser) => {
        this.saveLocalStorage(data)
        return data
      }),
      catchError(this.handleError)
    )
  }

  registerUser(user): Observable<any>{
    return this.http.post(this.baseUrl + 'sign-up', user).pipe(
      catchError(this.handleError)
    )
  }

  logout() {
    return this.http.get(this.baseUrl + 'log-out').pipe(
      map( data => {
        return data
      })
    )
  }

  checkPassword(password: number):Observable<any> {
    const id = this.getCurrentUser().id
    return this.http.post(this.baseUrl + 'check-password', {password,id})
  }

  isAuthenticate(): Observable<any>{
    return this.http.get(this.baseUrl+ 'is-authenticated').pipe(catchError(this.handleError))
  }

  handleError(err) {
    let error = err.error;
    this.toastrService.error(error, 'Error')
    this.router.navigateByUrl('auth/sign-in');
    return throwError(error);
  }

  saveLocalStorage(data: IUser){
    const user:IUser = {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
    }
    localStorage.setItem('current-user', JSON.stringify(user));
  }

  getCurrentUser(): IUser {
    const user = JSON.parse(localStorage.getItem('current-user'));
    return user;
  }
}
