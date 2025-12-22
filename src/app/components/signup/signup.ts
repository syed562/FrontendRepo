import { Component } from '@angular/core';
import { userDetails } from '../../ENTITIES/userDetails';
import { UserRole } from '../../enums/user-role.enum';
import { AuthService } from '../../services/Authentication/auth-service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { usernameValidator } from '../../validatorFunctions/usernameValidator';
import { passwordValidator } from '../../validatorFunctions/passwordValidator';
import { Observable, Subject } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,AsyncPipe,RouterModule],
  templateUrl: './signup.html',
  standalone:true,
  styleUrl: './signup.css',
})
export class Signup {
  error$!: Observable<string | null>;
  signedin:string="";
  constructor(private readonly auth:AuthService,private readonly router:Router){}
  ngOnInit(): void {
    this.auth.clearError();
    this.error$ = this.auth.error$;
  }
  isroleSelected:boolean=false;
  selectedRole:string="";
  UserRole = UserRole; 
  userDetails:userDetails={
    username:"",
    email:"",
    password:"",
    roles :[UserRole.ROLE_USER],
  }
form=new FormGroup(
{
  email:new FormControl('',[Validators.required,Validators.email]),
  username:new FormControl('',[Validators.required,usernameValidator]),
  password: new FormControl('',[Validators.required,passwordValidator])


}
);

  selectRole(roleSelected: UserRole): void {
    this.isroleSelected=true;
  this.userDetails.roles = [roleSelected];
  if(this.userDetails.roles.includes(UserRole.ROLE_ADMIN)){
    this.selectedRole="Admin";
  }else{
    this.selectedRole="User";
  }
}
submit() {
  this.userDetails.username = this.form.value.username!;
  this.userDetails.email = this.form.value.email!;
  this.userDetails.password = this.form.value.password!;

  this.auth.signup(this.userDetails).subscribe({
    next: () => {
      console.log('Signup successful');
      this.signedin="sucess";
       this.auth.clearError();
      this.router.navigate(['/signin'],{
         queryParams: { signedin: 'success' }
      }
      );
    }
  });
}

}