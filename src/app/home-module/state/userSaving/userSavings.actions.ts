import { Action } from '@ngrx/store';
import { ISavings } from 'src/app/interface/finance/finance.interface';


export enum userSavingsActionsType {
  getUserSavings = '[USER_SAVINGS] get',
  getUserSavingsSuccess = '[USER_SAVINGS] get success',
  addUserSavings = '[USER_SAVINGS] add',
  addUserSavingsSuccess = '[USER_SAVINGS] add success',
  updateUserSavings = '[USER_SAVINGS] update',
  updateUserSavingsSuccess = '[USER_SAVINGS] update success',
  deletUserSavings = '[USER_SAVINGS] delete',
  deletUserSavingsSuccess = '[USER_SAVINGS] delete success',
}

export class getUserSavingsActions implements Action {
  readonly type = userSavingsActionsType.getUserSavings
  constructor(public payload?){}
}
export class getUserSavingsSuccessActions implements Action {
  readonly type = userSavingsActionsType.getUserSavingsSuccess
  constructor(public payload:Array<ISavings>){}
}

export class addUserSavingsActions implements Action {
  readonly type = userSavingsActionsType.addUserSavings
  constructor(public payload:ISavings){}
}
export class addUserSavingsSuccessActions implements Action {
  readonly type = userSavingsActionsType.addUserSavingsSuccess
  constructor(public payload:ISavings){}
}

export class updateUserSavingsActions implements Action {
  readonly type = userSavingsActionsType.updateUserSavings
  constructor(public payload:{
    id: number,
    amount: number
  }){}
}
export class updateUserSavingsSuccessActions implements Action {
  readonly type = userSavingsActionsType.updateUserSavingsSuccess
  constructor(public payload:{
    id: number,
    amount: number
  }){}
}

export class deleteUserSavingsActions implements Action {
  readonly type = userSavingsActionsType.deletUserSavings
  constructor(public payload: {id:number}){}
}
export class deleteUserSavingsSuccessActions implements Action {
  readonly type = userSavingsActionsType.deletUserSavingsSuccess
  constructor(public payload: {id:number}){}
}


export type userSavingsActions = 
  getUserSavingsActions |
  getUserSavingsSuccessActions |
  addUserSavingsActions |
  addUserSavingsSuccessActions |
  updateUserSavingsActions |
  updateUserSavingsSuccessActions |
  deleteUserSavingsActions |
  deleteUserSavingsSuccessActions