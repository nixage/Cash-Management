import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';


import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {MaterialModule } from '../material-module/material.module'
// COMPONENT
import { ProfileHomeComponent } from './profile-home/profile-home.component';
import { PasswordCheckComponent } from '../sharedComponent/password-check/password-check.component';




@NgModule({
  declarations: [ProfileHomeComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  entryComponents: [
    PasswordCheckComponent
  ]
})
export class ProfileModule { }
