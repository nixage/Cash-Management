import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// ANIMATION
import { inOutAnimation } from 'src/app/animations/animations';

// INTERFACE
import { ISavings } from 'src/app/interface/finance/finance.interface';

// COMPONENT
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';

// SERVICES
import { UserService } from '../../service/user/user.service';
import { ToastrService } from 'ngx-toastr';

// NGRX
import { Store, select, ActionsSubject } from '@ngrx/store';
import { UserFinanceBalanceUpdateActions, userFinanceActionsType } from '../../state/userFinance/userFinance.actions';
import { ofType } from '@ngrx/effects';
import { updateUserSavingsActions, userSavingsActionsType, deleteUserSavingsActions } from '../../state/userSaving/userSavings.actions';
import { selectUserIncome } from '../../state/userFinance/userFinance.selectors';
import { selectUserSavings } from '../../state/userSaving/userSavings.selectors';
import { wrapperLockActions } from 'src/app/appState/wrapperLock/wrapperLock.actions';

// RXJS
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-update-savings',
  templateUrl: './update-savings.component.html',
  styleUrls: ['./update-savings.component.scss'],
  animations: [inOutAnimation],
})
export class UpdateSavingsComponent implements OnInit, OnDestroy{
  saving: ISavings;
  userIncome: number = 0;
  userIncomeStore: Observable<number> = this.store.pipe(
    select(selectUserIncome)
  )
  flag:boolean = false;

  updateUserBalanceSub = new Subscription()
  updateUserSavingsSub = new Subscription()
  deleteUSerSavingsSub = new Subscription()

  userSavingsStore:Observable<ISavings[]> = this.store.pipe(
    select(selectUserSavings)
  )
  
  constructor(
    private activateRoute: ActivatedRoute,
    private userService: UserService,
    private toastrService: ToastrService,
    private dialog: MatDialog,
    private store:Store,
    private actionsub: ActionsSubject
  ) {
  }
  ngOnDestroy(): void {
    this.updateUserBalanceSub.unsubscribe()
    this.updateUserSavingsSub.unsubscribe()
    this.deleteUSerSavingsSub.unsubscribe()
  }
  ngOnInit(): void {
    this.userIncomeStore.subscribe( income => this.userIncome = income)
    this.activateRoute.queryParams.subscribe((data) => {
      const id = +data['id'];
      this.userSavingsStore.subscribe( (data:ISavings[]) => {
        this.saving = data.find(val => val.id === id)
      })
    });
    this.store.dispatch( new wrapperLockActions({flag:true}))
  }

  updateSavings(value: string): void | boolean {
    const newAmount = +value;
    const sumOfUserSavings = this.userService.returnUserAmountSavings();
    const resultOfNewSaving = newAmount - this.saving.amount;
    if (
      sumOfUserSavings + resultOfNewSaving >
      this.userIncome
    ) {
      this.toastrService.error(
        'Sum of savings is more than income for this mounth'
      );
      return;
    }
    this.store.dispatch(new updateUserSavingsActions({id: this.saving.id, amount: newAmount}))
    this.updateUserSavingsSub = this.actionsub.pipe(
      ofType(userSavingsActionsType.updateUserSavingsSuccess)
    ).subscribe( () => {
      this.updateUserBalance();
    }, err => this.showError(err))
  }
  updateUserBalance() {
    this.store.dispatch(new UserFinanceBalanceUpdateActions())
    this.updateUserBalanceSub = this.actionsub.pipe(
      ofType(userFinanceActionsType.updateUserBalanceSuccess)
    ).subscribe( () => {
      this.flag = true
    }, err => this.showError(err))
  }

  deleteSavings(): void {
    this.store.dispatch(new deleteUserSavingsActions({id: this.saving.id}))
    this.deleteUSerSavingsSub = this.actionsub.pipe(
      ofType(userSavingsActionsType.deletUserSavingsSuccess)
    ).subscribe( () => {
      this.toastrService.success('Saving Delete', 'Success');
      this.updateUserBalance()
    }, (err) => this.showError(err))
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

  showError(err): void {
    this.toastrService.error(err.error.msg, 'Error');
  }
}
