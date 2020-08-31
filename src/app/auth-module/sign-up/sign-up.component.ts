import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { inOutAnimation } from '../../animations/animations';
import { AuthService } from '../service/auth-service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { validatePassword } from './sign-up.custom.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  animations: [inOutAnimation],

})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(private authService: AuthService, private toastrService: ToastrService, private router:Router, private activatedRoute: ActivatedRoute) { 
    this.signUpForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-ZА-Яа-я]+')]),
      lastName: new FormControl('', [Validators.required,Validators.minLength(2), Validators.pattern('[a-zA-ZА-Яа-я]+')]),
      email: new FormControl('', [Validators.required, Validators.email,]),
      login: new FormControl('', [Validators.required, Validators.minLength(3),Validators.pattern('[a-zA-Z]+')]),
      password: new FormControl('', [Validators.required, Validators.minLength(5),Validators.pattern('[^<>]+'), validatePassword]),
    })
  }

  ngOnInit(): void {
  }

  get f(){
    return this.signUpForm.controls
  }


  register(){
    if (this.signUpForm.invalid){return}

    const user = {
      firstName: this.signUpForm.get('firstName').value,
      lastName: this.signUpForm.get('lastName').value,
      email: this.signUpForm.get('email').value,
      login: this.signUpForm.get('login').value,
      password: this.signUpForm.get('password').value,
    }
    this.authService.registerUser(user).subscribe({
      next: data =>{
        this.toastrService.success(data.msg, 'Success');
        this.signUpForm.reset();
        setTimeout(()=>{
          this.router.navigate(['../sign-in'], { relativeTo: this.activatedRoute })
        },500)
      },
      error: err =>{
        this.toastrService.error(err.msg, "Error")
      }
    })
  }

}


