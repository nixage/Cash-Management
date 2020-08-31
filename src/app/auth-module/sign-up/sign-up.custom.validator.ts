import { AbstractControl } from '@angular/forms';


export function validatePassword(control: AbstractControl) {
  const regExpPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}/;
  const regExpPasswordNotUse = /.*[@\*\?]+.*/;
  const value = control.value
  if (!regExpPassword.test(value) || regExpPasswordNotUse.test(value)){
    return { inValidPassword: true };
  }
  return null;
}