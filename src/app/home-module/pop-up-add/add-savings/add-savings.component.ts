import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  ISavingsOptions,
  ISavings,
} from 'src/app/interface/finance/finance.interface';
import { inOutAnimation } from 'src/app/animations/animations';

import { UserService } from 'src/app/service/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { AppListenerService } from 'src/app/service/appListener/app-listener.service';

@Component({
  selector: 'app-add-savings',
  templateUrl: './add-savings.component.html',
  styleUrls: ['./add-savings.component.scss'],
  animations: [inOutAnimation],
})
export class AddSavingsComponent implements OnInit {
  optionsSavings: Array<ISavingsOptions>;

  formAdd: FormGroup;

  constructor(
    private activateRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private toastrService: ToastrService,
    private appListener: AppListenerService
  ) {
    this.formAdd = new FormGroup({
      options: new FormControl('', Validators.required),
      amount: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]+'),
      ]),
    });
  }

  ngOnInit(): void {
    this.userService
      .getSavings()
      .subscribe((data: Array<ISavingsOptions>): void => {
        this.optionsSavings = data;
      });
    this.appListener.wrapperLockSubject.next(true)
  }

  get f() {
    return this.formAdd.controls;
  }

  addSavings(): void {
    if (this.formAdd.invalid) {
      return;
    }
    const savings: ISavings = {
      name: this.formAdd.get('options').value.toLowerCase().replace(/\s+/, ''),
      img: this.formAdd.get('options').value + '.png'.toLowerCase().replace(/\s+/, ''),
      amount: +this.formAdd.get('amount').value,
    };
    const sumOfUserSavings = this.userService.getUserAmountSavings() + savings.amount;
    if (sumOfUserSavings > this.userService.userFinaceData.income) {
      this.toastrService.error('Sum of savings is more than income for this mounth');
      return;
    }
    this.userService.addUserSavings(savings).subscribe( (data) => {
        this.toastrService.success(savings.name + ' add', 'Success');
        this.formAdd.reset();
        this.updateUserBalance();
      },
      (err) => this.closeWithError(err)
    );
  }

  updateUserBalance(): void {
    this.userService.updateUserBalance().subscribe((data) => {
      this.toastrService.success('Balance update', 'Success');
      this.closePopUp();
    });
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
