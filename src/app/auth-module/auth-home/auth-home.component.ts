import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from '../../animations/animations';

@Component({
  selector: 'app-auth-home',
  templateUrl: './auth-home.component.html',
  styleUrls: ['./auth-home.component.scss'],
  animations: [fadeAnimation]
})
export class AuthHomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
