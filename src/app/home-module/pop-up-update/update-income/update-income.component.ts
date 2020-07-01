import { Component, OnInit } from '@angular/core';

import { inOutAnimation } from 'src/app/animations/animations';

import { UserService } from 'src/app/service/user/user.service';

import { ToastrService } from 'ngx-toastr';
import { AppListenerService } from 'src/app/service/appListener/app-listener.service';

@Component({
  selector: 'app-update-income',
  templateUrl: './update-income.component.html',
  styleUrls: ['./update-income.component.scss'],
  animations: [inOutAnimation],
})
export class UpdateIncomeComponent implements OnInit {
  flag:boolean = false;

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private appListener: AppListenerService
  ) {
  }

  ngOnInit(): void {
    this.appListener.wrapperLockSubject.next(true)
  }

  updateIncome(value: string): void {
    const income: number = +value
    this.userService.userFinaceData.income = income;

    this.userService.updateUserIncome().subscribe(
      (data) => {
        this.toastrService.success('Income update', 'Success');
        this.flag = true;
      },
      (err) => this.showError(err)
    );
  }
  showError(err): void {
    this.toastrService.error(err.error.msg, 'Error');
  }
}
