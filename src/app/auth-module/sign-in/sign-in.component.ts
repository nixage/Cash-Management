import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { inOutAnimation } from '../../animations/animations';

import { AuthService } from '../service/auth-service/auth.service';

import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  animations: [inOutAnimation],
})
export class SignInComponent implements OnInit {

  submitted: boolean = false;
  msg:string = '';
  signInForm: FormGroup;

  constructor(private authService: AuthService, private route: Router, private toastrService: ToastrService) { 
    this.signInForm = new FormGroup({
      login: new FormControl('', [Validators.required,Validators.minLength(3), Validators.pattern('[a-zA-Z]+')]),
      password: new FormControl('', [Validators.required,Validators.minLength(3),Validators.pattern('[^<>]+')]),
    })
  }

  ngOnInit(): void {
  }

  get f(){
    return this.signInForm.controls
  }


  login(){
    if (this.signInForm.invalid){return}
    const user = {
      login: this.signInForm.get('login').value,
      password: this.signInForm.get('password').value,
    }
    this.authService.login(user).subscribe({
      next: data =>{
        this.signInForm.reset();
        this.route.navigateByUrl('/home');
      },
      error: err =>{
        if (err.status === 500){
          this.toastrService.error(err.msg, 'Server error')
          return
        }
        this.submitted = true;
        this.msg = err.msg;
        this.signInForm.invalid;
        this.signInForm.get('login').setErrors(Validators.required)
        this.signInForm.get('password').setErrors(Validators.required)
      }
    })
  }

}
