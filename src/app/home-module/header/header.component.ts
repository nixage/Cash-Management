import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user/user.service';
import { IFinance, ISpends, ISavings } from 'src/app/interface/finance/finance.interface';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interface/user/user.interface';
import { AuthService } from 'src/app/service/auth-service/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  date: Date = new Date();
  user: IUser;
  userFinance: IFinance;
  userExpenses: number = 0;
  userBalance: number = 0;
  constructor(private userService: UserService,  private authService: AuthService, private toastrService: ToastrService, private router: Router) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('current-user'));
    this.user = user;
    this.userService.userFinanceSubject.subscribe( (data: IFinance) => {
      this.userFinance = data;
      this.userExpenses = data.expenses;
      this.userBalance = data.balance;
    })
    this.userService.userSpendSubject.subscribe( data => {
      this.updateUserExpenses(data)
    })
    this.userService.userSavingsSubject.subscribe( data => {
      this.updateUserBalance(data)
    })
  }

  updateUserExpenses(spends: ISpends[]){
    this.userExpenses = 0;
    this.userExpenses = spends.reduce( (acc, cur) => {
      acc += cur.amount
      return acc
    },0)
  }
  updateUserBalance(data: ISavings[]){
    this.userBalance = 0;
    this.userBalance = data.reduce( (acc, cur) => {
      acc += cur.amount
      return acc
    },0)
  }

  logOut(){
    this.authService.logout().subscribe(data => {
      this.toastrService.success('Bye Bye', 'Success')
      localStorage.clear();
      setTimeout(()=>{
        this.router.navigateByUrl('auth/sign-in')
      }, 1000)
    })
  }

}
