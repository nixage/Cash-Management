import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';

import { map, switchMap,  } from 'rxjs/operators';
import { UserService } from '../../service/user/user.service';
import { userInfoActionsType, getUserInfoSuccessActions, userInfoActions, updateUserInfoSuccess } from './userInfo.actions';
import { IUserInfo } from 'src/app/interface/user/user.interface';
import { Observable,  } from 'rxjs';
import { selectUserInfo } from './userInfo.selectors';
import { select, Store } from '@ngrx/store';


@Injectable()
export class userInfoEffects {
    userInfoStore: Observable<IUserInfo> = this.store.pipe(
    select(selectUserInfo)
  )
  constructor(
    private actions$: Actions,
    private userService: UserService,
    public store: Store
  ) {
  }

  @Effect()
  getUserInfo() {
    return this.actions$.pipe(
      ofType(userInfoActionsType.getUserInfo),
      switchMap( () => {
        return this.userService.getUserInfo().pipe(
          map( (user:IUserInfo) => {
            if(user){
              return new getUserInfoSuccessActions(user)
            }
          })
        )
      })
    )
  }

  @Effect()
  updateUserInfo() {
    return this.actions$.pipe(
      ofType(userInfoActionsType.updateUserInfo),
      switchMap( (action: userInfoActions) => {
        return this.userService.updateUserInfo(action.payload).pipe(
          map( () => {
            return new updateUserInfoSuccess(action.payload)
          })
        )
      })
    )
  }
}
