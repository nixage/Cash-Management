import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ROUTER
import { SettingsRoutingModule } from './settings-routing.module';

// COMPONENT
import { SettingsHomeComponent } from './settings-home/settings-home.component';


@NgModule({
  declarations: [SettingsHomeComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
