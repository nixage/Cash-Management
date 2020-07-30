import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/home-module/service/user/user.service';

@Component({
  selector: 'app-history-home',
  templateUrl: './history-home.component.html',
  styleUrls: ['./history-home.component.scss']
})
export class HistoryHomeComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserFinance().subscribe( data => console.log('USER INFO',data))
    this.userService.getUserSpends().subscribe( data => console.log('USER SPENDS',data))
    this.userService.getUserSavings().subscribe( data => console.log('USER SAVINGS',data))
  }

}
