import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ISavingsOptions, ISavings } from 'src/app/interface/finance/finance.interface';
import { inOutAnimation } from 'src/app/animations/animations';

import { UserService } from 'src/app/service/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { BodyLockDirective } from '../../directive/bodyLock/body-lock.directive';

@Component({
  selector: 'app-add-savings',
  templateUrl: './add-savings.component.html',
  styleUrls: ['./add-savings.component.scss'],
  animations: [inOutAnimation],
})
export class AddSavingsComponent implements OnInit {

  optionsSavings: Array<ISavingsOptions> ;

  formAdd: FormGroup;

  constructor(private activateRoute: ActivatedRoute, private userService: UserService, private router: Router, private toastrService:ToastrService,
              private bodyLockDirective: BodyLockDirective) {

    this.formAdd = new FormGroup({
      options: new FormControl('',Validators.required),
      amount: new FormControl('',[Validators.required, Validators.pattern('[0-9]+')])
    })

  }


  ngOnInit(): void {
    this.userService.getSavings().subscribe( (data:Array<ISavingsOptions>): void => {
      this.optionsSavings = data;
    })
    this.bodyLockDirective.bodyLock()
  }

  get f(){
    return this.formAdd.controls
  }

  addSavings(): void{
    if (this.formAdd.invalid){return}
    const savings: ISavings = {
      name: this.formAdd.get('options').value.toLowerCase().replace(/\s+/,''),
      img: this.formAdd.get('options').value + '.png'.toLowerCase().replace(/\s+/,''),
      amount: +this.formAdd.get('amount').value
    }
    this.userService.addUserSavings(savings).subscribe( data => {
      this.toastrService.success(savings.name + ' add', 'Success')
      this.formAdd.reset()
      this.closePopUp()
    }, err => this.closeWithError(err))
    
  }

  closePopUp(): void{
    this.router.navigate([{ outlets: { popUpAdd: null } }], {relativeTo: this.activateRoute.parent});
  }

  closeWithError(err){
    this.toastrService.error(err.error.msg, 'Error');
    this.closePopUp()
  }

}
