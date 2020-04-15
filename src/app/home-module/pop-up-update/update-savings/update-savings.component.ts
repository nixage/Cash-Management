import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { inOutAnimation } from 'src/app/animations/animations';
import { UserService } from 'src/app/service/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { ISavings } from 'src/app/interface/finance/finance.interface';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';

import {MatDialog} from '@angular/material/dialog';
import { BodyLockDirective } from '../../directive/bodyLock/body-lock.directive';

@Component({
  selector: 'app-update-savings',
  templateUrl: './update-savings.component.html',
  styleUrls: ['./update-savings.component.scss'],
  animations: [inOutAnimation],
})
export class UpdateSavingsComponent implements OnInit {

  formUpdate: FormGroup;
  saving: ISavings;
  savignId: string;

  constructor(private router: Router, private activateRoute: ActivatedRoute, private userService: UserService, private bodyLockDirective: BodyLockDirective,
              private toastrService: ToastrService, private dialog: MatDialog) { 
    this.initForm()
  }

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe( data => {
      const id = data['id'];
      this.savignId = data['id'];
      this.userService.getUserSavingsById(id).subscribe( (data: ISavings) => {
        this.saving = data;
        this.formUpdate.get('amount').setValue(data.amount)
      })
    })
    this.bodyLockDirective.bodyLock()
  }

  get f(){
    return this.formUpdate.controls
  }

  initForm(): void{
    this.formUpdate = new FormGroup({
      amount: new FormControl('', {
        validators: [Validators.required, Validators.pattern('[0-9]+')],
        updateOn: 'change'
      })
    })
  }

  updateSavings(): void | boolean{
    if (this.formUpdate.invalid){ return false};
    const newAmount = +this.f.amount.value;
    this.userService.updateUserSavings(this.saving.id, newAmount).subscribe( data => {
      this.toastrService.success('Saving Update', 'Success')
      this.closePopUp()
    },err => {
      this.closeWithError(err)
    })
  }

  deleteSavings(): void{
    this.userService.deleteUserSavings(this.saving.id).subscribe( data => {
      this.toastrService.success('Saving Delete', 'Success')
      this.closePopUp()
    }, err => this.closeWithError(err))
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){this.deleteSavings()}
    });
  }

  closePopUp(): void{
    this.router.navigate([{ outlets: { popUpUpdate: null } }], {relativeTo: this.activateRoute.parent});
  }

  closeWithError(err): void{
    this.toastrService.error(err.error.msg, 'Error');
    this.closePopUp()
  }

}
