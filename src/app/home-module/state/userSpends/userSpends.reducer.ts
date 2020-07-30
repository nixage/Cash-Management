import { ISpends } from 'src/app/interface/finance/finance.interface';
import { userSpendsActions, userSpendsActionsType } from './userSpends.actions';


export const userSpendsNode = 'userSpends';

export interface IUserSpendsStore {
  spends: Array<ISpends>
}

const initialState: IUserSpendsStore = {
  spends: [
    {
      id: 0,
      name: '',
      img: '',
      amount: 0,
      savingId: 0,
    }
  ]
}

export const userSpendsReducer = (state: IUserSpendsStore = initialState, action: userSpendsActions) => {
  switch(action.type){
    case userSpendsActionsType.getUserSpendsSuccess:
      return{
        ...state,
        spends: [...action.payload]
      }
    case userSpendsActionsType.addUserSpendsSuccess:
      return{
        ...state,
        spends: [...state.spends, action.payload]
      }
    case userSpendsActionsType.updateUserSpendsSuccess: 
      return{
        ...state,
        spends: state.spends.map( val => val.id === action.payload.id ? {
          ...val,
          amount: action.payload.amount
        }: val)
      }
    case userSpendsActionsType.deleteUserSpendsSuccess:
      return{
        ...state,
        spends: [...state.spends.filter( val => val.id !== action.payload.id)]
      }
    default:
      return state
  }
}