import { createFeatureSelector, createSelector } from '@ngrx/store';
import { userFinanceNode } from './userFinance.reducer';
import { IFinance } from 'src/app/interface/finance/finance.interface';

export const selectUserFinance = createFeatureSelector<IFinance>(userFinanceNode);

export const selectUserBalance = createSelector(
  selectUserFinance,
  (state) => state.balance 
)

export const selectUserIncome = createSelector(
  selectUserFinance,
  (state) => state.income 
)

export const selectUserExpenses = createSelector(
  selectUserFinance,
  (state) => state.expenses 
)
