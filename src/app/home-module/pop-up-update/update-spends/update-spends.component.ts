import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { inOutAnimation } from 'src/app/animations/animations';

// SERVICE
import { UserService } from '../../service/user/user.service';
import { ToastrService } from 'ngx-toastr';

// INTERFACE
import { ISpends } from 'src/app/interface/finance/finance.interface';

// COMPONENT
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';

// NGRX
import { Store, ActionsSubject, select } from '@ngrx/store';
import { UserFinanceBalanceUpdateActions, UserFinanceExpensesUpdateActions, userFinanceActionsType } from '../../state/userFinance/userFinance.actions';
import { ofType } from '@ngrx/effects';
import { updateUserSavingsActions, userSavingsActionsType } from '../../state/userSaving/userSavings.actions';
import { selectUserSpends } from '../../state/userSpends/userSpends.selectors';
import { updateUserSpendsActions, userSpendsActionsType, deleteUserSpendsActions } from '../../state/userSpends/userSpends.actions';
import { wrapperLockActions } from 'src/app/appState/wrapperLock/wrapperLock.actions';

// RXJS
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-update-spends',
  templateUrl: './update-spends.component.html',
  styleUrls: ['./update-spends.component.scss'],
  animations: [inOutAnimation],
})
export class UpdateSpendsComponent implements OnInit,OnDestroy {
  spend: ISpends;
  spends: ISpends[];
  flag:boolean = false;
  
  updateUserBalanceSub = new Subscription()
  updateUserExpensesSub = new Subscription()
  updateUserSavingsSub = new Subscription()
  updateUserSpendsSub = new Subscription()
  deleteUserSpendsSub = new Subscription()

  userSpendStore:Observable<ISpends[]> = this.store.pipe(
    select(selectUserSpends)
  )

  constructor(
    private activateRoute: ActivatedRoute,
    private userService: UserService,
    private toastrService: ToastrService,
    private dialog: MatDialog,
    private store: Store,
    private actionsub: ActionsSubject
  ) {
  }
  ngOnDestroy(): void {
    this.updateUserBalanceSub.unsubscribe();
    this.updateUserExpensesSub.unsubscribe()
    this.updateUserSavingsSub.unsubscribe()
    this.updateUserSpendsSub.unsubscribe()
    this.deleteUserSpendsSub.unsubscribe()
  }

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((data) => {
      const id = +data['id'];
      this.userSpendStore.subscribe( (data:ISpends[]) => {
        this.spends = data
        this.spend = data.find(val => val.id === id)
      })
    });
    this.store.dispatch( new wrapperLockActions({flag:true}))
  }

  updateSpends(value: string): void | boolean {
    const newAmount = +value;
    const oldAmount = +this.spend.amount;
    const res = newAmount - oldAmount;
    const spend = this.spend
    this.store.dispatch(new updateUserSpendsActions({id: this.spend.id, amount: newAmount}))
    this.updateUserSpendsSub = this.actionsub.pipe(
      ofType(userSpendsActionsType.updateUserSpendsSuccess)
    ).subscribe( () => {
      const userSavingId = this.userService.userSpendsArray.find(
        (val) => val.savingId === spend.savingId
      );
      const userSaving = this.userService.userSavingsArray.find(
        (val) => val.id === userSavingId.savingId
      );
      const newUserSavingAmount = userSaving.amount - res;
      this.toastrService.success('Spend Update', 'Success');
      this.updateUserSavings(newUserSavingAmount, spend);
    }, err => this.showError(err))
  }

  deleteSpends(): void {
    const spend = this.spend
    this.store.dispatch( new deleteUserSpendsActions({id: spend.id}))
    this.deleteUserSpendsSub = this.actionsub.pipe(
      ofType(userSpendsActionsType.deleteUserSpendsSuccess)
    ).subscribe( () => {
      const userSaving = this.userService.userSavingsArray.find(
        (val) => val.id === spend.savingId
      );
      const newUserSavingAmount = userSaving.amount + spend.amount;
      this.toastrService.success('Spend Delete', 'Success');
      this.updateUserSavings(newUserSavingAmount, spend);
    }, err => this.showError(err))
  }

  updateUserSavings(newUserSavingAmount: number, spend: ISpends): void {
    this.store.dispatch(new updateUserSavingsActions({id: spend.savingId, amount: newUserSavingAmount}))
    this.updateUserSavingsSub = this.actionsub.pipe(
      ofType(userSavingsActionsType.updateUserSavingsSuccess)
    ).subscribe( () => {
      this.toastrService.success('Saving Update', 'Success');
      this.updateUserBalance();
    }, (err) => this.showError(err))
  }

  updateUserBalance(): void {
    this.store.dispatch(new UserFinanceBalanceUpdateActions())
    this.updateUserBalanceSub = this.actionsub.pipe(
      ofType(userFinanceActionsType.updateUserBalanceSuccess)
    ).subscribe( () => {
      this.updateUserExpenses()
    })
  }
  updateUserExpenses() {
    this.store.dispatch(new UserFinanceExpensesUpdateActions())
    this.updateUserExpensesSub = this.actionsub.pipe(
      ofType(userFinanceActionsType.updateUserExpensesSuccess)
    ).subscribe( () => {
      this.flag = true
    })
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
