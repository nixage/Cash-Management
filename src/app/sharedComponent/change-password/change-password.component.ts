import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { inOutAnimation } from 'src/app/animations/animations';
import { UserService } from 'src/app/home-module/service/user/user.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  animations: [inOutAnimation],

})
export class ChangePasswordComponent implements OnInit {
  submitedForm:boolean = false;
  errorFormFromNotMatch:boolean = false;
  errorFormFromPattern:boolean = false;
  errorFormFromPatternSpecialSymbol:boolean = false;
  formPassword:FormGroup

  constructor(
    private toastrService: ToastrService,
    private userService:UserService,
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  get f() {
    return this.formPassword.controls;
  }

  initForm() {
    this.formPassword = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      confPassword: new FormControl('', [Validators.required, Validators.minLength(5)])
    })
  }

  resetFormValidate() {
    this.errorFormFromPattern = false;
    this.errorFormFromNotMatch = false;
    this.errorFormFromPatternSpecialSymbol = false;
  }
  

  savePassword() {
    if(this.formPassword.invalid){return}
    if(this.submitedForm) {this.resetFormValidate()}
    this.submitedForm = true;
    const regExpPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}/;
    const regExpPasswordNotUse = /.*[@\*\?]+.*/;
    const password = this.f.password.value
    const confPassword = this.f.confPassword.value
    if(password !== confPassword) {
      this.errorFormFromNotMatch = true;
      return
    }

    else if (!regExpPassword.test(password) || !regExpPassword.test(confPassword)) {
      this.errorFormFromPattern = true;
      return
    }

    else if(regExpPasswordNotUse.test(password) || regExpPasswordNotUse.test(confPassword)) {
      this.errorFormFromPatternSpecialSymbol = true
      return
    }

    else{
      this.userService.updateUserPassword(password).subscribe( data => {
        if(data.status) {
          this.toastrService.success('Password was update', 'Success');
          this.dialogRef.close()
        }
      })
    }
    
  }

}
