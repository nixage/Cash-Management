import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
// REACTIVE FORMS MODULE
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// COMPONENT
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
// UPDATE COMPONENT
import { UpdateSavingsComponent } from './pop-up-update/update-savings/update-savings.component';
import { UpdateSpendsComponent } from './pop-up-update/update-spends/update-spends.component';
import { UpdateIncomeComponent } from './pop-up-update/update-income/update-income.component';
// ADD COMPONENT
import { AddSpendsComponent } from './pop-up-add/add-spends/add-spends.component';
import { AddSavingsComponent } from './pop-up-add/add-savings/add-savings.component';
// SHARED COMPONENT
import { CalcComponent } from '../sharedComponent/calc/calc.component';
import { PopUpComponent } from '../sharedComponent/pop-up/pop-up.component';
// NGRX
import { StoreModule } from '@ngrx/store';
// REDUCERS
import { userSavingsNode, userSavingsReducer } from './state/userSaving/userSavings.reducer';
import { userFinanceNode, userFinanceReducer } from './state/userFinance/userFinance.reducer';
import { userSpendsNode, userSpendsReducer } from './state/userSpends/userSpends.reducer';
import { userInfoNode, userInfoReducer } from './state/userInfo/userInfo.reducer'
// EFFECTS
import { EffectsModule } from '@ngrx/effects';
import { userSavingsEffects } from './state/userSaving/userSavingsEffects';
import { userFinanceEffects } from './state/userFinance/userFinanceEffects';
import { userSpendsEffects } from './state/userSpends/userSpendsEffects';
import { userInfoEffects } from './state/userInfo/userInfoEffects';
// DIRECTIVE
import { ClickOutSideBarDirective } from './directive/click-out-side-bar.directive';

// MATERIAL MODULE 
import { MaterialModule } from '../material-module/material.module';
// CUSTOM MATERIAL
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';


@NgModule({
  declarations: [
    HomeComponent, 
    HeaderComponent, 
    MainComponent, 
    FooterComponent, 

    AddSpendsComponent,
    AddSavingsComponent,

    UpdateSavingsComponent, 
    UpdateSpendsComponent,
    UpdateIncomeComponent,

    DeleteDialogComponent,
    
    CalcComponent,
    PopUpComponent,

    ClickOutSideBarDirective
  ],

  imports: [
    CommonModule,

    HomeRoutingModule,

    FormsModule,
    ReactiveFormsModule,

    MaterialModule,

    StoreModule.forFeature(userFinanceNode, userFinanceReducer),
    StoreModule.forFeature(userSavingsNode, userSavingsReducer),
    StoreModule.forFeature(userSpendsNode, userSpendsReducer),
    StoreModule.forFeature(userInfoNode, userInfoReducer),
    EffectsModule.forFeature([userSavingsEffects,userFinanceEffects,userSpendsEffects,userInfoEffects])

  ],
  providers: [
    
  ],
  entryComponents: [
    DeleteDialogComponent
  ]
})
export class HomeModule { }
