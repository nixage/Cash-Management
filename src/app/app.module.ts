import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// OTHER MODULE
import { AuthModule } from './auth-module/auth.module';

// HTTP MODULE
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// TOASTER
import { ToastrModule } from 'ngx-toastr';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { credentialsInterceptor } from './interceptor/credentials.Interceptor';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpErrorInterceptor } from './interceptor/http.error.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,

    HttpClientModule,

    ToastrModule.forRoot(),

    AuthModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: credentialsInterceptor, 
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: HttpErrorInterceptor, 
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
