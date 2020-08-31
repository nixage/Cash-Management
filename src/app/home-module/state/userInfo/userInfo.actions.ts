import { Action } from '@ngrx/store';
import { IUserInfo } from 'src/app/interface/user/user.interface';


export enum userInfoActionsType {
  getUserInfo = '[USER_INFO] get',
  getUserInfoSuccess = '[USER_INFO] get success',
  updateUserInfo = '[USER_INFO] update',
  updateUserInfoSuccess = '[USER_INFO] update success'
}

export class getUserInfoActions implements Action {
  readonly type = userInfoActionsType.getUserInfo;
  constructor (public payload?){}
}

export class getUserInfoSuccessActions implements Action {
  readonly type = userInfoActionsType.getUserInfoSuccess;
  constructor (public payload: IUserInfo){}
}

export class updateUserInfo implements Action {
  readonly type = userInfoActionsType.updateUserInfo;
  constructor (public payload:IUserInfo){}
}

export class updateUserInfoSuccess implements Action {
  readonly type = userInfoActionsType.updateUserInfoSuccess;
  constructor (public payload: IUserInfo){}
}

export type userInfoActions = 
getUserInfoActions | 
getUserInfoSuccessActions |
updateUserInfo |
updateUserInfoSuccess