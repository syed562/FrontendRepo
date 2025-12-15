import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-loggedin-page',
  standalone: true,
  imports: [],
  templateUrl: './loggedin-page.html',
  styleUrl: './loggedin-page.css',
})
export class LoggedinPage {
constructor(private readonly auth:AuthService,private readonly router:Router){}
signout(){
  this.auth.signout().subscribe({
    next:()=>{
      console.log("signed out");
      this.router.navigate(['/']);

    },
    error:(err)=>{console.log("error while signing out",err.message)}
 } );
}
}
