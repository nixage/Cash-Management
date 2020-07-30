import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/home-module/service/user/user.service';

@Component({
  selector: 'app-statistic-home',
  templateUrl: './statistic-home.component.html',
  styleUrls: ['./statistic-home.component.scss']
})
export class StatisticHomeComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserFinance().subscribe( data => console.log('USER INFO',data))
    this.userService.getUserSpends().subscribe( data => console.log('USER SPENDS',data))
    this.userService.getUserSavings().subscribe( data => console.log('USER SAVINGS',data))
  }

}
