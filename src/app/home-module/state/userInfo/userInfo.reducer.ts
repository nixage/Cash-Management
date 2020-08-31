import { IUserInfo } from 'src/app/interface/user/user.interface';
import { userSavingsActions, userSavingsActionsType } from '../userSaving/userSavings.actions';
import { userInfoActions, userInfoActionsType } from './userInfo.actions';


export const userInfoNode = 'userInfo';

export interface IUserInfoStore {
  user: IUserInfo
}

const initialState: IUserInfoStore = {
  user: {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    balance: 0,
    lastVisit: '',
  }
}

export const userInfoReducer = (state: IUserInfoStore = initialState, action:userInfoActions) => {
  switch (action.type) {
    case userInfoActionsType.getUserInfoSuccess:
      return {
        ...state,
        user: action.payload
      }
    case userInfoActionsType.updateUserInfoSuccess:
      return{
        ...state,
        user: action.payload
      }
    default:
      return state
  }
}