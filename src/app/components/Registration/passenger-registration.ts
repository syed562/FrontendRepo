import { Component } from '@angular/core';
import { PassengerService } from '../../services/passenger-service';
import { Profile } from '../../ENTITIES/Profile';
import { Router } from '@angular/router';
@Component({
  selector: 'app-passenger-registration',
  imports: [],
  templateUrl: './passenger-registration.html',
  styleUrl: './passenger-registration.css',
})
export class PassengerRegistration {
  profile:Profile={
    name:"",
    phoneNumber:"",
    email:"",
    houseNo:"",
    city:"",
    state:""
  }
  constructor(private readonly passengerService:PassengerService,private readonly router:Router){}
register() {
  this.passengerService.registerPassenger(this.profile).subscribe({
    next: (id) => {
      console.log('Passenger registered with id:', id);
      this.router.navigate(['/'])
    },
    error: (err) => {
      console.error('Registration failed', err);
    }
  });
}

}
