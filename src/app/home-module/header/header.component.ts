import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// INTEFACE
import { IUserInfo } from 'src/app/interface/user/user.interface';
import { IUserFinanceStore } from '../state/userFinance/userFinance.reducer';

// SERVICE
import { AuthService } from '../../auth-module/service/auth-service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../service/user/user.service';

// NGRX
import { Store, select } from '@ngrx/store';
import { wrapperLockActions } from 'src/app/appState/wrapperLock/wrapperLock.actions';
import { sideBarOpenActions } from 'src/app/appState/openSideBar/sideBar.actions';
import { selectUserInfo } from '../state/userInfo/userInfo.selectors';
import { selectUserFinance } from '../state/userFinance/userFinance.selectors';

// RXJS
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  date: Date = new Date();
  user: IUserInfo;

  userFinanceStore: Observable<IUserFinanceStore> = this.store.pipe(
    select(selectUserFinance)
  );
  userInfoStore: Observable<IUserInfo> = this.store.pipe(
    select(selectUserInfo)
  );
  userExpenses: number = 0;
  userBalance: number = 0;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    public store: Store<IUserFinanceStore>
  ) {}

  ngOnInit(): void {
    this.userInfoStore.subscribe((user: IUserInfo) => {
      this.user = user;
    });
    this.userFinanceStore.subscribe( (data:IUserFinanceStore) => {
      this.userBalance = data.balance
      this.userExpenses = data.expenses
    })
  }

  openSideBar() {
    this.store.dispatch(new wrapperLockActions({ flag: true }));
    this.store.dispatch(new sideBarOpenActions({ flag: true }));
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
