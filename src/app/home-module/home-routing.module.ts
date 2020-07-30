import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { HomeGuard } from './guard/home.guard';

import { UpdateSavingsComponent } from './pop-up-update/update-savings/update-savings.component';
import { UpdateSpendsComponent } from './pop-up-update/update-spends/update-spends.component';
import { UpdateIncomeComponent } from './pop-up-update/update-income/update-income.component';

import { AddSavingsComponent } from './pop-up-add/add-savings/add-savings.component';
import { AddSpendsComponent } from './pop-up-add/add-spends/add-spends.component';


const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [HomeGuard]},
  {path: 'settings', loadChildren: () => import('../settings-module/settings.module').then(m => m.SettingsModule)},
  {path: 'history', loadChildren: () => import('../history-module/history.module').then(m => m.HistoryModule)},
  {path: 'statistic', loadChildren: () => import('../statistic-module/statistic.module').then(m => m.StatisticModule)},
  {path: 'addSavings', component: AddSavingsComponent, outlet: 'popUpAdd'},
  {path: 'addSpends', component: AddSpendsComponent, outlet: 'popUpAdd'},
  {path: 'updateIncome', component: UpdateIncomeComponent, outlet: 'popUpUpdate'},
  {path: 'updateSavings', component: UpdateSavingsComponent, outlet: 'popUpUpdate'},
  {path: 'updateSpends', component: UpdateSpendsComponent, outlet: 'popUpUpdate'},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
