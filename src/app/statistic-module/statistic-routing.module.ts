import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatisticHomeComponent } from './statistic-home/statistic-home.component';


const routes: Routes = [
  {path:'',component:StatisticHomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticRoutingModule { }
