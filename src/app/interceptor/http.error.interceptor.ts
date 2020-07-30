import { Injectable } from '@angular/core';

import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpClient,
    HttpResponse,
  } from "@angular/common/http";
import { Observable } from "rxjs";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../auth-module/service/auth-service/auth.service';

@Injectable()

  export class HttpErrorInterceptor implements HttpInterceptor {


    constructor(private http:HttpClient, private toastrService: ToastrService, private route:Router, private authService: AuthService){}

    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      return Observable.create( obs =>{
        const subscription = next.handle(req).subscribe( (event:HttpResponse<any>) => {
          if (event instanceof HttpResponse){
            if (event.body.msg !== undefined ){
              if (event.body.msg.toLowerCase() === 'unauthorized'){
                subscription.unsubscribe()
                this.route.navigateByUrl('auth/sign-in');
                return;
              }
              return obs.next(event)
            }
            return obs.next(event)
          }
          return obs.next(event)
        }, err => subscription.unsubscribe(), () => obs.complete())
        return () => {
          subscription.unsubscribe();
        };
      })
    }


  }