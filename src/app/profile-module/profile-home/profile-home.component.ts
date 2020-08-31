import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
// RXJS
import { Observable, Subscription } from 'rxjs';

// INTERFACE
import { IUserInfo } from 'src/app/interface/user/user.interface';

// NGRX
import { Store, select, ActionsSubject } from '@ngrx/store';
import { selectUserInfo } from 'src/app/home-module/state/userInfo/userInfo.selectors';
import {
  getUserInfoActions,
  updateUserInfo,
  userInfoActionsType,
} from 'src/app/home-module/state/userInfo/userInfo.actions';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { inOutAnimation } from 'src/app/animations/animations';
import { ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { PasswordCheckComponent } from 'src/app/sharedComponent/password-check/password-check.component';
import { selectUserBalance } from 'src/app/home-module/state/userFinance/userFinance.selectors';
import { ChangePasswordComponent } from 'src/app/sharedComponent/change-password/change-password.component';
import { UserService } from 'src/app/home-module/service/user/user.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-profile-home',
  templateUrl: './profile-home.component.html',
  styleUrls: ['./profile-home.component.scss'],
  animations: [inOutAnimation],
})
export class ProfileHomeComponent implements OnInit, OnDestroy {
  user: IUserInfo;
  userIcon: string;
  userInfoStore: Observable<IUserInfo> = this.store.pipe(
    select(selectUserInfo)
  );
  userBalanceStore: Observable<number> = this.store.pipe(
    select(selectUserBalance)
  )
  getUserInfoStoreSub: Subscription = new Subscription();
  updateUserInfoSub: Subscription = new Subscription()
  formUser: FormGroup;
  enableForm:boolean = false;

  constructor(
    public store: Store,
    private formBuilder: FormBuilder,
    private location: Location,
    private actionsub: ActionsSubject,
    private toastrService: ToastrService,
    private dialog: MatDialog,
    private userService: UserService,
    private sanitizer: DomSanitizer

  ) {}
  ngOnDestroy(): void {
    this.updateUserInfoSub.unsubscribe()
    this.getUserInfoStoreSub.unsubscribe();
  }

  ngOnInit(): void {
    this.store.dispatch(new getUserInfoActions());
    this.userInfoStore.subscribe((user: IUserInfo) => {
      this.user = user;
      this.userIcon = this.sanitizer.bypassSecurityTrustUrl(user.icon)['changingThisBreaksApplicationSecurity']
      this.initFormUser();
    });
  }

  get f() {
    return this.formUser.controls;
  }

  initFormUser() {
    this.formUser = this.formBuilder.group({
      id: [this.user.id],
      lastVisit: [this.user.lastVisit],
      firstName: [
        { value: this.user.firstName, disabled: true },
        [Validators.required],
      ],
      lastName: [
        { value: this.user.lastName, disabled: true },
        [Validators.required],
      ],
      email: [
        { value: this.user.email, disabled: true },
        [Validators.email, Validators.required],
      ],
    });
  }

  chooseFile(files: FileList) {
    const file = files.item(0)
    const re = /jpe?g|png|svg/
    if(!re.test(file.type)) {
      this.toastrService.error('PNG or JPEG(JPG) or SVG', 'Error')
      return
    }
    this.userService.uploadUserImage(file).subscribe( data => {
      this.userIcon = data.src
      this.toastrService.success('Image upload', 'Success')
    })
  }

  editField(input: HTMLInputElement) {
    if(this.enableForm){return};
    const text = 'For changing name/surname/email/balance you should enter your password'
    this.checkPassword(text).subscribe( data => {
      if(data){
        this.toastrService.success('Password correct', 'Success')
        this.enableForm = true
        this.formUser.enable()
        input.focus()
      }
    })
  }

  checkPassword(text:string) {
    const passwordCheck = this.dialog.open(PasswordCheckComponent, {
      data: {text:text}
    })
    return passwordCheck.afterClosed()
  }

  changePassword() {
    const text = 'For changing password you should enter your password'
    this.checkPassword(text).subscribe( data => {
      console.log(data)
      if(data){
        this.toastrService.success('Password correct', 'Success')
        const changePassword = this.dialog.open(ChangePasswordComponent)
      }
    })
  }

  saveForm() {
    if (this.formUser.invalid) {
      return;
    }
    this.formUser.enable();
    const user: IUserInfo = this.formUser.value;
    user.lastVisit = new Date().toISOString();
    this.store.dispatch(new updateUserInfo(user));
    this.updateUserInfoSub = this.actionsub.pipe(
      ofType(userInfoActionsType.updateUserInfoSuccess)
    ).subscribe( () => {
      this.toastrService.success(`User ${user.firstName} ${user.lastName} update`, 'Success')
    })
    this.formUser.disable();
    this.enableForm = false;
  }

  resetForm() {
    this.initFormUser();
    this.formUser.disable();
    this.enableForm = false;
  }

  backPage() {
    this.location.back();
  }
}
