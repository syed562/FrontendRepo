import { AbstractControl, ValidationErrors } from "@angular/forms";

export function passwordValidator(control:AbstractControl):ValidationErrors|null{
const value:string=control.value || '';
if(!value) return null;
if(value.length<6){
return {minLength:true};
}
if(value.includes(' ')){
    return {noSpaces:true};
}
return null;
}