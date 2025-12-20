import { AbstractControl, ValidationErrors } from '@angular/forms';

export function usernameValidator(
  control: AbstractControl
): ValidationErrors | null {

  const value: string = control.value || '';

  if (!value) return null;

  
  if (!/^[a-zA-Z]/.test(value)) {
    return { mustStartWithLetter: true };
  }

  if (value.includes(' ')) {
    return { noSpaces: true };
  }

  if (!/^[A-Za-z][\w]*$/.test(value)) {
  return { invalidChars: true };
}
if (value.length < 5) {
    return { minLength: true };
  }


  return null; //this is valid
}
