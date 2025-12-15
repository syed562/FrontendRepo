import { Component, NgModule } from '@angular/core';
import { userDetails } from '../../ENTITIES/userDetails';
import { UserRole } from '../../ROLE/user-role.enum';
import { FormsModule } from "@angular/forms";
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';


@NgModule({
  imports: [
    FormsModule
  ]
})
export class SignupModule {}

@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  templateUrl: './signup.html',
  standalone:true,
  styleUrl: './signup.css',
})
export class Signup {
  constructor(private readonly auth:AuthService,private readonly router:Router){}
  roleSelected:boolean=false;
  selectedRole:string="";
  UserRole = UserRole; 
  userDetails:userDetails={
    username:"",
    email:"",
    password:"",
    roles :[UserRole.ROLE_USER],
  }
  selectRole(roleSelected: UserRole): void {
    this.roleSelected=true;
  this.userDetails.roles = [roleSelected];
  if(this.userDetails.roles.includes(UserRole.ROLE_ADMIN)){
    this.selectedRole="Admin";
  }else{
    this.selectedRole="User";
  }
}
submit(){
  this.auth.signup(this.userDetails).subscribe({
    
      next:()=> {console.log('Signup successful');
        this.router.navigate(['/signin']);

      }

    ,
    
 error:(error)=>{ console.error('Sign up failed:',error.message);
    }
}
  );
}


}
