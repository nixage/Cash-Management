import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { inOutAnimation } from 'src/app/animations/animations';
import { UserService } from 'src/app/service/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { ISpends } from 'src/app/interface/finance/finance.interface';

import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { AppListenerService } from 'src/app/service/appListener/app-listener.service';

@Component({
  selector: 'app-update-spends',
  templateUrl: './update-spends.component.html',
  styleUrls: ['./update-spends.component.scss'],
  animations: [inOutAnimation],
})
export class UpdateSpendsComponent implements OnInit {
  spends: ISpends;
  flag:boolean = false;

  constructor(
    private activateRoute: ActivatedRoute,
    private userService: UserService,
    private toastrService: ToastrService,
    private dialog: MatDialog,
    private appListener: AppListenerService
  ) {
  }

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((data) => {
      const id = data['id'];
      this.userService.getUserSpendsById(id).subscribe((data: ISpends) => {
        this.spends = data;
      });
    });
    this.appListener.wrapperLockSubject.next(true)
  }

  updateSpends(value: string): void | boolean {
    const newAmount = +value;
    const oldAmount = +this.spends.amount;
    const res = newAmount - oldAmount;
    this.userService.updateUserSpends(this.spends.id, newAmount).subscribe(
      (data) => {
        const userSavingId = this.userService.userSpendArray.find(
          (val) => val.savingId === this.spends.savingId
        );
        const userSaving = this.userService.userSavingsArray.find(
          (val) => val.id === userSavingId.savingId
        );
        const newUserSavingAmount = userSaving.amount - res;
        this.toastrService.success('Spend Update', 'Success');
        this.updateUserSavings(newUserSavingAmount);
      },
      (err) => this.showError(err)
    );
  }

  deleteSpends(): void {
    this.userService.deleteUserSpends(this.spends.id).subscribe(
      (data) => {
        const userSaving = this.userService.userSavingsArray.find(
          (val) => val.id === this.spends.savingId
        );
        const newUserSavingAmount = userSaving.amount + this.spends.amount;
        this.toastrService.success('Spend Delete', 'Success');
        this.updateUserSavings(newUserSavingAmount);
      },
      (err) => this.showError(err)
    );
  }

  updateUserSavings(newUserSavingAmount: number): void {
    this.userService
      .updateUserSavings(this.spends.savingId, newUserSavingAmount)
      .subscribe(
        (data) => {
          this.toastrService.success('Saving Update', 'Success');
          this.updateUserFinance();
        },
        (err) => this.showError(err)
      );
  }

  updateUserFinance(): void {
    this.userService.updateUserFinance().subscribe(
      (data) => {
        this.toastrService.success('Balance and Expenses update', 'Success');
        this.flag = true
      },
      (err) => this.showError(err)
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteSpends();
      }
    });
  }

  showError(err): void {
    this.toastrService.error(err.error.msg, 'Error');
  }
}
