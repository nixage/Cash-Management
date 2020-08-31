import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    MatTooltipModule,
    MatDialogModule,
    MatRadioModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  exports: [
    MatTooltipModule,
    MatDialogModule,
    MatRadioModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
})
export class MaterialModule {}
