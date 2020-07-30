import { Action } from '@ngrx/store';
import { ISpends } from 'src/app/interface/finance/finance.interface';


export enum userSpendsActionsType {
  getUserSpends = '[USER_SPENDS] get',
  getUserSpendsSuccess = '[USER_SPENDS] get success',
  addUserSpends = '[USER_SPENDS] add',
  addUserSpendsSuccess = '[USER_SPENDS] add success',
  updateUserSpends = '[USER_SPENDS] update',
  updateUserSpendsSuccess = '[USER_SPENDS] update success',
  deleteUserSpends = '[USER_SPENDS] delete',
  deleteUserSpendsSuccess = '[USER_SPENDS] delete success',
}

export class getUserSpendsActions implements Action {
  readonly type = userSpendsActionsType.getUserSpends
  constructor(public payload?){}
}
export class getUserSpendsSuccessActions implements Action {
  readonly type = userSpendsActionsType.getUserSpendsSuccess
  constructor(public payload:Array<ISpends>){}
}

export class addUserSpendsActions implements Action {
  readonly type = userSpendsActionsType.addUserSpends
  constructor(public payload?){}
}
export class addUserSpendsSuccessActions implements Action {
  readonly type = userSpendsActionsType.addUserSpendsSuccess
  constructor(public payload:Array<ISpends>){}
}

export class updateUserSpendsActions implements Action {
  readonly type = userSpendsActionsType.updateUserSpends
  constructor(public payload: {
    id: number,
    amount: number
  }){}
}
export class updateUserSpendsSuccessActions implements Action {
  readonly type = userSpendsActionsType.updateUserSpendsSuccess
  constructor(public payload: {
    id: number,
    amount: number
  }){}
}

export class deleteUserSpendsActions implements Action {
  readonly type = userSpendsActionsType.deleteUserSpends
  constructor(public payload: {
    id: number
  }){}
}
export class deleteUserSpendsSuccessActions implements Action {
  readonly type = userSpendsActionsType.deleteUserSpendsSuccess
  constructor(public payload: {
    id: number
  }){}
}

export type userSpendsActions = 
  getUserSpendsActions |
  getUserSpendsSuccessActions |
  addUserSpendsActions |
  addUserSpendsSuccessActions |
  updateUserSpendsActions |
  updateUserSpendsSuccessActions |
  deleteUserSpendsActions |
  deleteUserSpendsSuccessActions