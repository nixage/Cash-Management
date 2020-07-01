import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  ISpendsOptions,
  ISpends,
  ISavings,
} from 'src/app/interface/finance/finance.interface';
import { inOutAnimation } from 'src/app/animations/animations';

import { UserService } from 'src/app/service/user/user.service';
import { ToastrService } from 'ngx-toastr';

import { AppListenerService } from 'src/app/service/appListener/app-listener.service';

@Component({
  selector: 'app-add-spends',
  templateUrl: './add-spends.component.html',
  styleUrls: ['./add-spends.component.scss'],
  animations: [inOutAnimation],
})
export class AddSpendsComponent implements OnInit {
  optionsSpends: Array<ISpendsOptions>;
  userSavings: Array<ISavings>;

  formAdd: FormGroup;

  constructor(
    private activateRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private toastrService: ToastrService,
    private appListener: AppListenerService
  ) {
    this.formAdd = new FormGroup({
      userSavings: new FormControl('', Validators.required),
      optionsSpends: new FormControl('', Validators.required),
      amount: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]+'),
      ]),
    });
  }

  ngOnInit(): void {
    this.userService
      .getSpends()
      .subscribe((data: Array<ISpendsOptions>): void => {
        this.optionsSpends = data;
      });
    this.userSavings = this.userService.userSavingsArray;
    this.appListener.wrapperLockSubject.next(true)
  }

  get f() {
    return this.formAdd.controls;
  }

  addSpends(): void {
    if (this.formAdd.invalid) {
      return;
    }
    const spends: ISpends = {
      name: this.formAdd.get('optionsSpends').value,
      img:
        this.formAdd
          .get('optionsSpends')
          .value.toLowerCase()
          .replace(/\s+/, '') + '.png',
      amount: +this.formAdd.get('amount').value,
      savingId: +this.formAdd.get('userSavings').value,
    };
    const sumOfUserSpends =
      this.userService.getUserAmountSpends() + spends.amount;
    if (sumOfUserSpends > this.userService.getUserAmountSavings()) {
      this.toastrService.error('Sum of spends is more than savings', 'Error');
      return;
    }
    this.userService.addUserSpends(spends).subscribe(
      (data) => {
        this.toastrService.success(spends.name + ' add', 'Success');
        this.updateUserSavings();
      },
      (err) => this.closeWithError(err)
    );
  }

  updateUserSavings(): void {
    const amount = +this.formAdd.get('amount').value;
    const userSavingsId = +this.formAdd.get('userSavings').value;
    const oldUserSavingAmount = this.userService.userSavingsArray.find(
      (val) => val.id === userSavingsId
    );
    const newUserSavingsAmount = oldUserSavingAmount.amount - amount;
    this.userService
      .updateUserSavings(userSavingsId, newUserSavingsAmount)
      .subscribe(
        (data) => {
          this.toastrService.success('Saving Update', 'Success');
          this.updateUserFinance();
        },
        (err) => this.closeWithError(err)
      );
  }

  updateUserFinance(): void {
    this.userService.updateUserFinance().subscribe(
      (data) => {
        this.toastrService.success(
          'Spend add ang user finance update',
          'Success'
        );
        this.closePopUp();
      },
      (err) => this.closeWithError(err)
    );
  }

  closePopUp(): void {
    this.router.navigate([{ outlets: { popUpAdd: null } }], {
      relativeTo: this.activateRoute.parent,
    });
    this.appListener.wrapperLockSubject.next(false)
  }
  closeWithError(err) {
    this.toastrService.error(err.error.msg, 'Error');
    this.closePopUp();
  }
}
