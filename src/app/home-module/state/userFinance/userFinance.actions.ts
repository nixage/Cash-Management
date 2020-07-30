import { Action } from '@ngrx/store';
import { IFinance } from 'src/app/interface/finance/finance.interface';

export enum userFinanceActionsType{
  getUserFinance = '[USER_FINANCE] get',
  getUserFinanceSuccess = '[USER_FINANCE] get success',
  updateUserIncome = '[USER_FINANCE_INCOME] update',
  updateUserIncomeSuccess = '[USER_FINANCE_INCOME] update success',
  updateUserBalance = '[USER_FINANCE_BALANCE] update',
  updateUserBalanceSuccess = '[USER_FINANCE_BALANCE] update success',
  updateUserExpenses = '[USER_FINANCE_EXPENSES] update',
  updateUserExpensesSuccess = '[USER_FINANCE_EXPENSES] update success'
}

export class getUserFinanceActions implements Action {
  readonly type =  userFinanceActionsType.getUserFinance
  constructor(public payload?){}
}
export class getUserFinanceSuccessActions implements Action {
  readonly type =  userFinanceActionsType.getUserFinanceSuccess
  constructor(public payload:IFinance){}
}
export class UserFinanceIncomeUpdateActions implements Action {
  readonly type =  userFinanceActionsType.updateUserIncome
  constructor(public payload: {
    amount: number
  }) {}
}
export class UserFinanceIncomeUpdateSuccessActions implements Action {
  readonly type =  userFinanceActionsType.updateUserIncomeSuccess
  constructor(public payload: {
    amount: number
  }) {}
}
export class UserFinanceBalanceUpdateActions implements Action {
  readonly type =  userFinanceActionsType.updateUserBalance
  constructor(public payload?) {}
}
export class UserFinanceBalanceUpdateSuccessActions implements Action {
  readonly type =  userFinanceActionsType.updateUserBalanceSuccess
  constructor(public payload: {
    amount: number
  }) {}
}
export class UserFinanceExpensesUpdateActions implements Action {
  readonly type =  userFinanceActionsType.updateUserExpenses
  constructor(public payload?) {}
}
export class UserFinanceExpensesUpdateSuccessActions implements Action {
  readonly type =  userFinanceActionsType.updateUserExpensesSuccess
  constructor(public payload: {
    amount: number
  }) {}
}

export type UserFinanceActions =
  getUserFinanceActions |
  getUserFinanceSuccessActions |
  UserFinanceIncomeUpdateActions |
  UserFinanceIncomeUpdateSuccessActions |
  UserFinanceBalanceUpdateActions |
  UserFinanceBalanceUpdateSuccessActions |
  UserFinanceExpensesUpdateActions |
  UserFinanceExpensesUpdateSuccessActions