import { Component, OnInit } from '@angular/core';
import { ISavings, ISpends, IFinance } from 'src/app/interface/finance/finance.interface';
import { Router, ActivatedRoute} from '@angular/router';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  userFinance: IFinance;
  userSavings: ISavings[] = [];
  userSpends: ISpends[] = [];

  constructor(private router: Router, private userService: UserService, private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.userService.userFinanceSubject.subscribe( (data:IFinance) => {
      this.userFinance = data
    })
    this.userService.userSavingsSubject.subscribe( (data:Array<ISavings>) => {
      this.userSavings = [];
      this.userSavings = data
    })
    this.userService.userSpendSubject.subscribe( (data:Array<ISpends>) => {
      this.userSpends = []
      this.userSpends = data
    })
  }

  addSavings(){
    this.router.navigate([{ outlets: { popUpAdd: 'addSavings' } }], {relativeTo: this.activatedRoute});
  }
  updateSavings(savings: ISavings){
    this.router.navigate([{ outlets: { popUpUpdate: 'updateSavings' } }], { queryParams: {id: savings.id,  prop: 'savings'}, relativeTo: this.activatedRoute})
  }

  addSpends(){
    this.router.navigate([{ outlets: { popUpAdd: 'addSpends' } }], { relativeTo: this.activatedRoute})
  }
  updateSpends(spends: ISpends){
    this.router.navigate([{ outlets: { popUpUpdate: 'updateSpends' } }], {queryParams: {id: spends.id,  prop: 'spends'}, relativeTo: this.activatedRoute})
  }


  updateIncome(){
    this.router.navigate([{ outlets: { popUpUpdate: 'updateIncome' } }], { relativeTo: this.activatedRoute})
  }


}
