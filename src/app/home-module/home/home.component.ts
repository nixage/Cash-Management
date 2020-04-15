import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUserFinance()

  }

  getUserFinance(){
    this.userService.getUserFinance().toPromise();
    this.userService.getUserSavings().toPromise();
    this.userService.getUserSpends().toPromise();
  }


}
