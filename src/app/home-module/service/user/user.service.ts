import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {
  IFinance,
  ISavings,
  ISpends,
  ISavingsOptions,
  ISpendsOptions,
} from 'src/app/interface/finance/finance.interface';
import { IUser } from 'src/app/interface/user/user.interface';

import { AuthService } from '../../../auth-module/service/auth-service/auth.service';

import { Store, select } from '@ngrx/store';
import { selectUserSavings } from '../../state/userSaving/userSavings.selectors';
import { selectUserSpends } from '../../state/userSpends/userSpends.selectors';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userSpendsArray: ISpends[] = [];
  userSpendsOptions: ISpendsOptions[] = []
  userSpendStore: Observable<ISpends[]> = this.store.pipe(
    select(selectUserSpends)
  );
  userSavingsArray: ISavings[] = [];
  userSavingsOptions: ISavingsOptions[] = []
  userSavingStore: Observable<ISavings[]> = this.store.pipe(
    select(selectUserSavings)
  );

  baseHomeUrl = 'http://localhost:3001/home/user/';
  baseFinanceUrl = 'http://localhost:3001/finance/';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private store: Store
  ) {
    this.userSavingStore.subscribe((data: ISavings[]) => {
      this.userSavingsArray = data;
    });
    this.userSpendStore.subscribe( (data:ISpends[]) => {
      this.userSpendsArray = data
    })
  }

  // FINANCE USER METHOD =====================================================
  getUserFinance(): Observable<IFinance> {
    const user = this.getCurrentUser();
    return this.http.get<IFinance>(this.baseHomeUrl + user.id + '/finance');
  }
  updateUserBalance(): Observable<any> {
    const user = this.getCurrentUser();
    const sumOfSavings: number = this.returnUserAmountSavings();
    const balance: number = sumOfSavings;
    return this.http.post(this.baseHomeUrl + user.id + '/update/balance', {
      balance,
    });
  }
  updateUserExpenses(): Observable<any> {
    const user = this.getCurrentUser();
    let expenses: number = this.returnUserAmountSpends();
    return this.http.post(this.baseHomeUrl + user.id + '/update/expenses', {
      expenses,
    });
  }
  returnUserAmountSavings(): number {
    return this.userSavingsArray.reduce((acc, cur) => {
      acc += cur.amount;
      return acc;
    }, 0);
  }
  returnUserAmountSpends(): number {
    return this.userSpendsArray.reduce((acc, cur) => {
      acc += cur.amount;
      return acc;
    }, 0);
  }
  updateUserIncome(income: number): Observable<any> {
    const user = this.getCurrentUser();
    return this.http.post(this.baseHomeUrl + user.id + '/update/income', {
      income,
    });
  }
  // FINANCE USER METHOD =====================================================

  // SAVINGS USER METHOD =====================================================

  getUserSavings(): Observable<Array<ISavings>> {
    const user = this.getCurrentUser();
    return this.http.get<ISavings[]>(this.baseHomeUrl + user.id + '/savings');
  }
  // =====
  addUserSavings(savings: ISavings): Observable<any> {
    const user = this.getCurrentUser();
    return this.http.post(this.baseHomeUrl + user.id + '/add/savings', savings);
  }
  // =====
  getUserSavingsById(id): Observable<ISavings> {
    const user = this.getCurrentUser();
    return this.http.get<ISavings>(
      this.baseHomeUrl + user.id + '/savings/' + id
    );
  }
  // =====
  getSavings(): Observable<Array<ISavingsOptions>> {
    return this.http.get<Array<ISavingsOptions>>(
      this.baseFinanceUrl + 'savings'
    ).pipe(
      tap( (data:ISavingsOptions[]) => {
        if(this.userSavingsOptions === data) {
          debugger
          return this.userSavingsOptions
        }
        return data
      })
    );
  }
  // =====
  updateUserSavings(id: number, amount: number): Observable<any> {
    const user = this.getCurrentUser();
    return this.http.post<ISavings>(
      this.baseHomeUrl + user.id + '/update/savings',
      { id, amount }
    );
  }
  deleteUserSavings(id: number): Observable<any> {
    const user = this.getCurrentUser();
    return this.http.delete(
      this.baseHomeUrl + user.id + '/delete/savings/' + id
    );
  }

  // SAVINGS USER METHOD =====================================================

  // SPENDS USER METHOD =====================================================

  getUserSpends(): Observable<ISpends[]> {
    const user = this.getCurrentUser();
    return this.http.get<ISpends[]>(this.baseHomeUrl + user.id + '/spends');
  }
  // =====
  addUserSpends(spends: ISpends): Observable<any> {
    const user = this.getCurrentUser();
    return this.http.post(this.baseHomeUrl + user.id + '/add/spends', spends);
  }
  // =====
  getUserSpendsById(id): Observable<ISpends> {
    const user = this.getCurrentUser();
    return this.http.get<ISpends>(this.baseHomeUrl + user.id + '/spends/' + id);
  }
  // =====
  getSpends(): Observable<Array<ISpendsOptions>> {
    return this.http.get<Array<ISpendsOptions>>(this.baseFinanceUrl + 'spends').pipe(
      tap( (data:ISpendsOptions[]) => {
        if(this.userSpendsOptions === data){
          debugger
          return this.userSpendsOptions
        }
        return data
      })
    );
  }
  // =====
  updateUserSpends(id: number, amount: number): Observable<any> {
    const user = this.getCurrentUser();
    return this.http.post<ISavings>(
      this.baseHomeUrl + user.id + '/update/spends',
      {
        id,
        amount,
      }
    );
  }
  deleteUserSpends(id: number): Observable<any> {
    const user = this.getCurrentUser();
    return this.http.delete(
      this.baseHomeUrl + user.id + '/delete/spends/' + id
    );
  }

  // SPENDS USER METHOD =====================================================

  getCurrentUser(): IUser {
    let user = this.authService.currentUser;
    if (!user) {
      user = JSON.parse(localStorage.getItem('current-user'));
    }
    return user;
  }
}
