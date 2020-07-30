import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// ROUTING
import { AppRoutingModule } from './app-routing.module';
// HTTP MODULE, INTERCEPTOR
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { credentialsInterceptor } from './interceptor/credentials.Interceptor';
// TOASTER
import { ToastrModule } from 'ngx-toastr';
// ANIMATION
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// FORMS
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// COMPONENT
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpErrorInterceptor } from './interceptor/http.error.interceptor';
// MATTERIAL
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { sideBarNode, sideBarReducer } from './appState/openSideBar/sideBar.reducer';
import { wrapperNode, wrapperReducer } from './appState/wrapperLock/wrapperLock.reducer';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,

    HttpClientModule,

    ToastrModule.forRoot(),

    AppRoutingModule,
    BrowserAnimationsModule,

    FormsModule,
    ReactiveFormsModule,

    StoreModule.forRoot({
      [sideBarNode]: sideBarReducer,
      [wrapperNode]: wrapperReducer
    }, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),

    MatProgressSpinnerModule,
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
