import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, forkJoin } from 'rxjs';
import { IFinance, ISavings, ISpends, ISavingsOptions, ISpendsOptions } from 'src/app/interface/finance/finance.interface';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth-service/auth.service';
import { IUser } from 'src/app/interface/user/user.interface';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userFinanceSubject = new Subject<IFinance>();
  userFinaceData: IFinance;
  userSavingsSubject = new Subject<ISavings[]>();
  userSavingsArray: ISavings[] = [];
  userSpendSubject = new Subject<ISpends[]>();
  userSpendArray: ISpends[] = [];

  baseHomeUrl = 'http://localhost:3001/home/user/';
  baseFinanceUrl = 'http://localhost:3001/finance/';


  constructor(private http: HttpClient, private authService: AuthService) { 
  }

// FINANCE USER METHOD =====================================================
  getUserFinance():Observable<IFinance>{
    const user = JSON.parse(localStorage.getItem('current-user'));
    return this.http.get<IFinance>(this.baseHomeUrl + user.id + '/finance').pipe(
      map( (data: IFinance) => {
        this.userFinanceSubject.next(data);
        this.userFinaceData = data
        return data
      })
    )
  }
  updateUserFinance(): Observable<any>{
    return forkJoin(
      this.updateUserExpenses(),
      this.updateUserBalance(),
    )
  }
  updateUserBalance(){
    const user = this.getCurrentUser();
    let expenses: number = this.getUserAmountExpenses();
    let balance:number = this.userFinaceData.income - expenses;
    this.userFinaceData.balance = balance;
    return this.http.post(this.baseHomeUrl + user.id + '/update/balance', {balance})
  }
  updateUserExpenses(){
    const user = this.getCurrentUser();
    let expenses:number = this.getUserAmountExpenses();
    this.userFinaceData.expenses = expenses
    return this.http.post(this.baseHomeUrl + user.id + '/update/expenses', {expenses})
  }
  getUserAmountExpenses(){
    let expenses:number = 0;
    this.userSpendArray.forEach( val => {
      expenses += val.amount;
    })
    return expenses
  }
  updateUserIncome(){
    const user = this.getCurrentUser();
    const income = this.userFinaceData.income;
    return this.http.post(this.baseHomeUrl + user.id + '/update/income', {income})
  }
// FINANCE USER METHOD =====================================================


// SAVINGS USER METHOD =====================================================

  getUserSavings():Observable<Array<ISavings>>{
    const user = this.getCurrentUser()
    return this.http.get<ISavings[]>(this.baseHomeUrl + user.id + '/savings').pipe(
      map( (data: Array<ISavings>) => {
        data.forEach((val:ISavings) => {
          this.userSavingsArray.push(val)
        });
        this.userSavingsSubject.next(new Array(...this.userSavingsArray));
        return data
      })
    )
  }
  // =====
  addUserSavings(savings: ISavings): Observable<any>{
    const user = this.getCurrentUser()
    return this.http.post(this.baseHomeUrl + user.id + '/add/savings', savings).pipe(
      map( data => {
        if(data){
          savings.id = data['insertId'];
          this.userSavingsArray.push(savings);
          this.userSavingsSubject.next(new Array(...this.userSavingsArray));
        }
        return data
      })
    )
  }
  // =====
  getUserSavingsById(id): Observable<ISpends>{
    const user = this.getCurrentUser()
    return this.http.get<ISpends>(this.baseHomeUrl + user.id  + '/savings/' + id)
  }
  // =====
  getSavings(): Observable<Array<ISavingsOptions>>{
    return this.http.get<Array<ISavingsOptions>>(this.baseFinanceUrl + 'savings')
  }
    // =====
  updateUserSavings(id:number, amount:number): Observable<any>{
    const user = this.getCurrentUser()
    return this.http.post<ISavings>(this.baseHomeUrl + user.id + '/update/savings', {id, amount}).pipe(
      map( data => {
        if(data){
          const userSaving = this.userSavingsArray.find(val => val.id === id);
          userSaving.amount = amount;
          this.userSavingsSubject.next(new Array(...this.userSavingsArray));
        }
        return data
      })
    )
  }
  deleteUserSavings(id: number): Observable<any>{
    const user = this.getCurrentUser()
    return this.http.delete(this.baseHomeUrl + user.id + '/delete/savings/' + id).pipe(
      map( data => {
        this.userSavingsArray = this.userSavingsArray.filter(val => val.id !== id)
        this.userSavingsSubject.next(new Array(...this.userSavingsArray))
        return data
      })
    )
  }


// SAVINGS USER METHOD =====================================================


  
// SPENDS USER METHOD =====================================================

  getUserSpends():Observable<ISpends[]>{
    const user = this.getCurrentUser()
    return this.http.get<ISpends[]>(this.baseHomeUrl + user.id + '/spends').pipe(
      map( (data:Array<ISpends>) => {
        data.forEach((val:ISpends) => {
          this.userSpendArray.push(val)
        });
        this.userSpendSubject.next(new Array(...this.userSpendArray));
        return data
      })
    )
  }
  // =====
  addUserSpends(spends: ISpends): Observable<any>{
    const user = this.getCurrentUser()
    return this.http.post(this.baseHomeUrl + user.id + '/add/spends', spends).pipe(
      map( data => {
        if(data){
          spends.id = data['insertId']
          this.userSpendArray.push(spends);
          this.userSpendSubject.next(new Array(...this.userSpendArray));
        }
        return data
      })
    )
  }
  // =====
  getUserSpendsById(id): Observable<ISpends>{
    const user = this.getCurrentUser()
    return this.http.get<ISpends>(this.baseHomeUrl + user.id  + '/spends/' + id)
  }
  // =====
  getSpends(): Observable<Array<ISpendsOptions>>{
    return this.http.get<Array<ISpendsOptions>>(this.baseFinanceUrl + 'spends')
  }
  // =====
  updateUserSpends(id:number, amount:number): Observable<any>{
    const user = this.getCurrentUser()
    return this.http.post<ISavings>(this.baseHomeUrl + user.id + '/update/spends', {id, amount}).pipe(
      map( data => {
        if (data){
          const userSpend = this.userSpendArray.find(val => val.id === id);
          userSpend.amount = amount
          this.userSpendSubject.next(new Array(...this.userSpendArray));
        }
        return data
      })
    )
  }
  deleteUserSpends(id: number): Observable<any>{
    const user = this.getCurrentUser()
    return this.http.delete(this.baseHomeUrl + user.id + '/delete/spends/' + id).pipe(
      map( data => {
        this.userSpendArray = this.userSpendArray.filter(val => val.id !== id);
        this.userSpendSubject.next(this.userSpendArray)
        return data
      })
    )
  }

// SAVINGS USER METHOD =====================================================
  getCurrentUser(): IUser{
    let user = this.authService.currentUser;
    if(!user){
      user = JSON.parse(localStorage.getItem('current-user'))
    }
    return user
  }

}
