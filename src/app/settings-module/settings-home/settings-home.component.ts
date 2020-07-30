import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/home-module/service/user/user.service';

@Component({
  selector: 'app-settings-home',
  templateUrl: './settings-home.component.html',
  styleUrls: ['./settings-home.component.scss']
})
export class SettingsHomeComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserFinance().subscribe( data => console.log('USER INFO',data))
    this.userService.getUserSpends().subscribe( data => console.log('USER SPENDS',data))
    this.userService.getUserSavings().subscribe( data => console.log('USER SAVINGS',data))
  }

}
