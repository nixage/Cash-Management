import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticRoutingModule } from './statistic-routing.module';
import { StatisticHomeComponent } from './statistic-home/statistic-home.component';


@NgModule({
  declarations: [StatisticHomeComponent],
  imports: [
    CommonModule,
    StatisticRoutingModule
  ]
})
export class StatisticModule { }
