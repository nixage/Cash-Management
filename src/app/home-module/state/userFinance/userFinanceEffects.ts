import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import {
  UserFinanceActions,
  userFinanceActionsType,
  UserFinanceIncomeUpdateSuccessActions,
  UserFinanceBalanceUpdateSuccessActions,
  getUserFinanceSuccessActions,
  UserFinanceExpensesUpdateSuccessActions,
} from './userFinance.actions';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from '../../service/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { IFinance } from '../../../interface/finance/finance.interface';

@Injectable()
export class userFinanceEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private toastrService: ToastrService
  ) {}

  @Effect()
  updateExpenses() {
    return this.actions$.pipe(
      ofType(userFinanceActionsType.updateUserExpenses),
      switchMap(() => {
        return this.userService.updateUserExpenses().pipe(
          map((res: { expenses: number }) => {
            if (res) {
              this.toastrService.success('Expenses update', 'Success');
              return new UserFinanceExpensesUpdateSuccessActions({
                amount: res.expenses,
              });
            }
          })
        );
      })
    );
  }

  @Effect()
  updateBalance() {
    return this.actions$.pipe(
      ofType(userFinanceActionsType.updateUserBalance),
      switchMap(() => {
        return this.userService.updateUserBalance().pipe(
          map((res: { balance: number }) => {
            if (res) {
              this.toastrService.success('Balance update', 'Success');
              return new UserFinanceBalanceUpdateSuccessActions({
                amount: res.balance,
              });
            }
          })
        );
      })
    );
  }

  @Effect()
  updateIncome() {
    return this.actions$.pipe(
      ofType(userFinanceActionsType.updateUserIncome),
      switchMap((action: UserFinanceActions) => {
        return this.userService.updateUserIncome(action.payload.amount).pipe(
          map((res: { income: number }) => {
            if (res) {
              this.toastrService.success('Income update', 'Success');
              return new UserFinanceIncomeUpdateSuccessActions({
                amount: res.income,
              });
            }
          })
        );
      })
    );
  }

  @Effect()
  getUserFinance() {
    return this.actions$.pipe(
      ofType(userFinanceActionsType.getUserFinance),
      switchMap(() => {
        return this.userService.getUserFinance().pipe(
          map((data: IFinance) => {
            if (data) {
              return new getUserFinanceSuccessActions(data);
            }
          })
        );
      })
    );
  }
}
