import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss']
})
export class CalcComponent implements OnInit {

  formUpdate: FormGroup;
  calcButtons: string[] = ['7','8','9','4','5','6','1','2','3','0'];
  calcOperate: string[] = ['+','-','/','*']
  patterInput: RegExp  = new RegExp('[0-9]+$');

  @Output() emitValue = new EventEmitter<string>();

  constructor() {
    this.initForm()
   }

  ngOnInit(): void {
  }

  get f() {
    return this.formUpdate.controls;
  }

  initForm(): void {
    this.formUpdate = new FormGroup({
      income: new FormControl('', {
        validators: [Validators.required, Validators.pattern(this.patterInput), Validators.minLength(1)],
        updateOn: 'change',
      }),
    })
  }

  addNum(num:string) {
    const value:string = this.formUpdate.get('income').value + num
    this.updateInputIncome(value)
    return false
  }

  addOperate(operat:string){
    const value:string = this.formUpdate.get('income').value + operat
    const operation = new RegExp('[*\/+-]{2}')
    if(operation.test(value)){
      return
    }
    this.updateInputIncome(value)
  }

  removeLast(): void{
    const value:string = this.formUpdate.get('income').value.toString()
    this.updateInputIncome(value.slice(0,-1))
  }

  updateInputIncome(value: string): void {
    this.formUpdate.setValue({income:value})
    this.formUpdate.touched ? '' : this.formUpdate.markAsTouched()
  }

  updateValue(): void{
    const value:string = eval(this.formUpdate.get('income').value).toString()
    console.log(typeof value)
    this.emitValue.emit(value ? value: '0')
  }

}
