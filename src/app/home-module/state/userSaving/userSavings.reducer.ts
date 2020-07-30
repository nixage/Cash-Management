import { ISavings } from 'src/app/interface/finance/finance.interface';
import { userSavingsActions, userSavingsActionsType } from './userSavings.actions';


export const userSavingsNode = 'userSavings';

export interface IUserSavingsStore {
  savings: Array<ISavings>
}

const initialState:IUserSavingsStore = {
  savings: [
   {
     id: 0,
     name: '',
     img: '',
     amount: 0
   }
  ]
}

export const userSavingsReducer = (state:IUserSavingsStore = initialState, action:userSavingsActions) => {
  switch(action.type) {
    case userSavingsActionsType.getUserSavingsSuccess:
      return{
        ...state,
        savings: [...action.payload]
      }
    case userSavingsActionsType.addUserSavingsSuccess:
      return{
        ...state,
        savings: [...state.savings, action.payload]
      }
    case userSavingsActionsType.updateUserSavingsSuccess:
      return {
        ...state,
        savings: state.savings.map( val => val.id === action.payload.id ? {
          ...val,
          amount: action.payload.amount
        }: val)
      }
    case userSavingsActionsType.deletUserSavingsSuccess:
      return{
        ...state,
        savings: [...state.savings.filter(val => val.id !== action.payload.id)]
      }
    default:
      return state
  }
}