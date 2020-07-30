import { IFinance } from '../../../interface/finance/finance.interface';
import { UserFinanceActions, userFinanceActionsType } from './userFinance.actions';

export const userFinanceNode = 'userFinance';

const initialState: IFinance = {
  balance: 0,
  expenses: 0,
  income: 0
}

export const userFinanceReducer = (state = initialState, action: UserFinanceActions) => {
  switch(action.type){
    case userFinanceActionsType.getUserFinanceSuccess:
      return{
        ...state,
        ...action.payload
      }
    case userFinanceActionsType.updateUserIncomeSuccess:
      return {
        ...state,
        income: action.payload.amount
      }
    case userFinanceActionsType.updateUserBalanceSuccess:
      return{
        ...state,
        balance: action.payload.amount
      }
    case userFinanceActionsType.updateUserExpensesSuccess:
      return{
        ...state,
        expenses: action.payload.amount
      }
    default:
      return state
  }
}