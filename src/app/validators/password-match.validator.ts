import { AbstractControl, ValidationErrors } from '@angular/forms'

export const PasswordMatch = (control: AbstractControl): ValidationErrors | null => {

  const password = control.get('password')?.value;
  const confirm = control.get('confirmPassword')?.value;


  if (password != confirm && password && confirm) { return { 'noMatch': true } }

  return null


}