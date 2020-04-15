import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { inOutAnimation } from 'src/app/animations/animations';
import { UserService } from 'src/app/service/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { ISpends } from 'src/app/interface/finance/finance.interface';

import {MatDialog} from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';

import { BodyLockDirective } from '../../directive/bodyLock/body-lock.directive';



@Component({
  selector: 'app-update-spends',
  templateUrl: './update-spends.component.html',
  styleUrls: ['./update-spends.component.scss'],
  animations: [inOutAnimation],
})
export class UpdateSpendsComponent implements OnInit {

  formUpdate: FormGroup;
  spends: ISpends;

   constructor(private router: Router, private activateRoute: ActivatedRoute, private userService: UserService, private toastrService: ToastrService,
               private dialog: MatDialog, private bodyLockDirective: BodyLockDirective) { 
    this.initForm()
  }

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe( data => {
    const id = data['id']
      this.userService.getUserSpendsById(id).subscribe( (data: ISpends) => {
        this.spends = data;
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

  updateSpends(): void | boolean{
    if (this.formUpdate.invalid){ return false};
    const newAmount = +this.f.amount.value;
    const oldAmount = +this.spends.amount
    const res = (newAmount - oldAmount);

    /* UPDATE USER SPENDS IN DATABASE */
    this.userService.updateUserSpends(this.spends.id, newAmount).subscribe( data => {
      /* UPDATE USER SAVINGS IN DATABASE*/
      const userSavingId = this.userService.userSpendArray.find(val => val.savingId === this.spends.savingId);
      const userSaving = this.userService.userSavingsArray.find(val => val.id === userSavingId.savingId)
      const newUserSavingAmount = userSaving.amount - (+res);
      this.toastrService.success('Spend Update', 'Success')
      this.updateUserSavings(newUserSavingAmount)
    },err => this.closeWithError(err))

  }

  deleteSpends(): void{
    /* DELETE USER SPENDS IN DATABASE */
    this.userService.deleteUserSpends(this.spends.id).subscribe( data => {
      const userSaving = this.userService.userSavingsArray.find( val => val.id === this.spends.savingId);      
      const newUserSavingAmount = userSaving.amount + this.spends.amount;
      this.toastrService.success('Spend Delete', 'Success')
      this.updateUserSavings(newUserSavingAmount)
    }, err=>this.closeWithError(err))
  }

  updateUserSavings(newUserSavingAmount: number):void{
     /* UPDATE USER SAVING IN DATABASE */
    this.userService.updateUserSavings(this.spends.savingId, newUserSavingAmount).subscribe(data => {
      this.toastrService.success('Saving Update', 'Success')
      this.updateUserFinance()
    }, err=> this.closeWithError(err))
  }

  updateUserFinance():void{
    /* UPDATE USER FINANCE IN DATABASE */
    this.userService.updateUserFinance().subscribe(data=>{
      this.toastrService.success('Balance and Expenses update', 'Success');
      this.closePopUp()
    }, err=> this.closeWithError(err))
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){this.deleteSpends()}
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
