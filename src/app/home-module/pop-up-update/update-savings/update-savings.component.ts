import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { inOutAnimation } from 'src/app/animations/animations';
import { UserService } from 'src/app/service/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { ISavings } from 'src/app/interface/finance/finance.interface';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';

import { MatDialog } from '@angular/material/dialog';
import { AppListenerService } from 'src/app/service/appListener/app-listener.service';

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

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private userService: UserService,
    private toastrService: ToastrService,
    private dialog: MatDialog,
    private appListener: AppListenerService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((data) => {
      const id = data['id'];
      this.savignId = data['id'];
      this.userService.getUserSavingsById(id).subscribe((data: ISavings) => {
        this.saving = data;
        this.formUpdate.get('amount').setValue(data.amount);
      });
    });
    this.appListener.wrapperLockSubject.next(true)
  }

  get f() {
    return this.formUpdate.controls;
  }

  initForm(): void {
    this.formUpdate = new FormGroup({
      amount: new FormControl('', {
        validators: [Validators.required, Validators.pattern('[0-9]+')],
        updateOn: 'change',
      }),
    });
  }

  updateSavings(): void | boolean {
    if (this.formUpdate.invalid) {
      return false;
    }
    const newAmount = +this.f.amount.value;
    const sumOfUserSavings = this.userService.getUserAmountSavings();
    const resultOfNewSaving = newAmount - this.saving.amount;
    if (
      sumOfUserSavings + resultOfNewSaving >
      this.userService.userFinaceData.income
    ) {
      this.toastrService.error(
        'Sum of savings is more than income for this mounth'
      );
      return;
    }
    this.userService.updateUserSavings(this.saving.id, newAmount).subscribe(
      (data) => {
        this.toastrService.success('Saving Update', 'Success');
        this.updateUserBalance();
      },
      (err) => {
        this.closeWithError(err);
      }
    );
  }
  updateUserBalance() {
    this.userService.updateUserBalance().subscribe((data) => {
      this.closePopUp();
    });
  }

  deleteSavings(): void {
    this.userService.deleteUserSavings(this.saving.id).subscribe(
      (data) => {
        this.toastrService.success('Saving Delete', 'Success');
        this.updateUserBalance();
      },
      (err) => this.closeWithError(err)
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteSavings();
      }
    });
  }

  closePopUp(): void {
    this.router.navigate([{ outlets: { popUpUpdate: null } }], {
      relativeTo: this.activateRoute.parent,
    });
    this.appListener.wrapperLockSubject.next(false)
  }

  closeWithError(err): void {
    this.toastrService.error(err.error.msg, 'Error');
    this.closePopUp();
  }
}
