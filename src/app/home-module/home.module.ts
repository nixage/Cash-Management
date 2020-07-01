import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';

import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';

import { UpdateSavingsComponent } from './pop-up-update/update-savings/update-savings.component';
import { UpdateSpendsComponent } from './pop-up-update/update-spends/update-spends.component';

import { AddSpendsComponent } from './pop-up-add/add-spends/add-spends.component';
import { AddSavingsComponent } from './pop-up-add/add-savings/add-savings.component';

// SHARED COMPONENT
import { CalcComponent } from '../sharedComponent/calc/calc.component';
import { PopUpComponent } from '../sharedComponent/pop-up/pop-up.component';


import { BodyLockDirective } from './directive/bodyLock/body-lock.directive';
import { BodyUnLockDirective } from './directive/bodyUnLock/body-un-lock.directive';

import { MatRadioModule } from '@angular/material/radio'
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';

import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { UpdateIncomeComponent } from './pop-up-update/update-income/update-income.component';


@NgModule({
  declarations: [
    HomeComponent, 
    HeaderComponent, 
    MainComponent, 
    FooterComponent, 

    BodyLockDirective, 
    BodyUnLockDirective, 

    AddSpendsComponent,
    AddSavingsComponent,

    UpdateSavingsComponent, 
    UpdateSpendsComponent,
    UpdateIncomeComponent,

    DeleteDialogComponent,

    UpdateIncomeComponent,
    
    CalcComponent,
    PopUpComponent
  ],

  imports: [
    CommonModule,

    HomeRoutingModule,

    FormsModule,
    ReactiveFormsModule,

    MatRadioModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  providers: [
    
  ],
  entryComponents: [
    DeleteDialogComponent
  ]
})
export class HomeModule { }
