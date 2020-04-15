import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { inOutAnimation } from 'src/app/animations/animations';

import { UserService } from 'src/app/service/user/user.service';

import { ToastrService } from 'ngx-toastr';
import { BodyLockDirective } from '../../directive/bodyLock/body-lock.directive';

@Component({
  selector: 'app-update-income',
  templateUrl: './update-income.component.html',
  styleUrls: ['./update-income.component.scss'],
  animations: [inOutAnimation],

})
export class UpdateIncomeComponent implements OnInit {

  formUpdate: FormGroup;

  constructor(private router: Router, private activateRoute: ActivatedRoute, private userService: UserService, private toastrService: ToastrService,
              private bodyLockDirective: BodyLockDirective) {
    this.initForm()
   }

  ngOnInit(): void {
    this.userService.userFinanceSubject.forEach(val => {
      this.formUpdate.get('income').setValue(val.income)
    })
    this.bodyLockDirective.bodyLock()
  }

  get f(){
    return this.formUpdate.controls
  }

  initForm():void{
    this.formUpdate = new FormGroup({
      income: new FormControl('', {
        validators: [Validators.required, Validators.pattern('[0-9]+')],
        updateOn: 'change'
      })
    })
  }

  updateIncome(): void{
    if (this.formUpdate.invalid){return}

    const income:number = +this.formUpdate.get('income').value;
    this.userService.userFinaceData.income = income

    this.userService.updateUserIncome().subscribe( data => {
      this.toastrService.success('Income update', 'Success')
      this.updateBalance()
    }, err=> this.closeWithError(err))
  }
  
  updateBalance(): void{
    this.userService.updateUserBalance().subscribe(data => {
      this.userService.userFinanceSubject.next(this.userService.userFinaceData)
      this.toastrService.success('Balance Update', 'Success')
      this.closePopUp()
    }, err => this.closeWithError(err))
  }

  closePopUp(): void{
    this.router.navigate([{ outlets: { popUpUpdate: null } }], {relativeTo: this.activateRoute.parent});
  }
  closeWithError(err): void{
    this.toastrService.error(err.error.msg, 'Error');
    this.closePopUp()
  }

}
