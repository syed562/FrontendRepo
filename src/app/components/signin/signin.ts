import { Component } from '@angular/core';
import { user } from '../../models/user';
import { AuthService } from '../../services/auth-service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  imports: [FormsModule],
  standalone:true,
  templateUrl: './signin.html',
  styleUrls: ['./signin.css'],
})
export class Signin {
  signed:boolean=false;
 constructor(private readonly auth:AuthService,private readonly router:Router){}
  user:user={
    username:"",
    password:""
  }
  submit(){

  this.auth.signin(this.user).subscribe({
next:()=>{console.log('Signin succesful');
  this.signed=true;
  this.router.navigate(['/']);
},
error:(err)=>{
  console.error('Sign in failed:',err.message);
  this.router.navigate(['/signup'])

}
  }
  );
}
}



