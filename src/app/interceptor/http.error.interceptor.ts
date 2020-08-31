import { Injectable } from '@angular/core';

import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpResponse,
  } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from '@angular/router';

@Injectable()

  export class HttpErrorInterceptor implements HttpInterceptor {


    constructor( private route:Router){}

    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      return Observable.create( obs =>{
        const subscription = next.handle(req).subscribe( (event:HttpResponse<any>) => {
          if (event instanceof HttpResponse){
            if(event.body.msg){
              if(event.body.msg !== undefined){
                if (event.body.msg.toLowerCase() === 'unauthorized'){
                  subscription.unsubscribe()
                  this.route.navigateByUrl('auth/sign-in');
                  return;
                }
                return obs.next(event)
              }
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