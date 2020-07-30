import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// INTEFACE
import { IUser } from 'src/app/interface/user/user.interface';
import {
  IFinance,
  ISpends,
  ISavings,
} from 'src/app/interface/finance/finance.interface';


// SERVICE
import { AuthService } from '../../auth-module/service/auth-service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../service/user/user.service';

// NGRX
import { Store, select } from '@ngrx/store';
import { selectUserSavings } from '../state/userSaving/userSavings.selectors';

// RXJS
import { Observable } from 'rxjs';
import { selectUserSpends } from '../state/userSpends/userSpends.selectors';
import { sideBarOpenActions } from 'src/app/appState/openSideBar/sideBar.actions';
import { wrapperLockActions } from 'src/app/appState/wrapperLock/wrapperLock.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {  
  date: Date = new Date();
  user: IUser;

  userSavingsStore: Observable<ISavings[]> = this.store.pipe(
    select(selectUserSavings)
  )
  userSpendsStore:Observable<ISpends[]> = this.store.pipe(
    select(selectUserSpends)
  )
  userExpenses: number = 0;
  userBalance: number = 0;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private store: Store<IFinance>,
  ) {
  }

  ngOnInit(): void {
    const user = this.userService.getCurrentUser()
    this.user = user;
    this.userSpendsStore.subscribe( () => {
      this.updateUserExpenses()
    })
    this.userSavingsStore.subscribe( () => {
      this.updateUserBalance()
    })
  }

  updateUserExpenses() {
    this.userExpenses = 0;
    this.userExpenses = this.userService.returnUserAmountSpends()
  }
  updateUserBalance() {
    this.userBalance = 0;
    this.userBalance = this.userService.returnUserAmountSavings()
  }

  openSideBar() {
    this.store.dispatch(new wrapperLockActions({flag:true}))
    this.store.dispatch(new sideBarOpenActions({flag:true}))
  }

  logOut() {
    this.authService.logout().subscribe((data) => {
      this.toastrService.success('Bye Bye', 'Success');
      localStorage.clear();
      setTimeout(() => {
        this.router.navigateByUrl('auth/sign-in');
      }, 1000);
    });
  }
}
