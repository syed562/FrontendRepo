import { Component, OnInit } from '@angular/core';
import { PassengerService } from '../../services/PassengerService/passenger-service';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/Authentication/auth-service';
import { of, switchMap, take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-passenger-registration',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './passenger-registration.html',
  styleUrl: './passenger-registration.css',
})
export class PassengerRegistration implements OnInit {
  flightId!:number;
isPassengerRegistered = false;
  checking = true;
  constructor(
    private readonly passengerService: PassengerService,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly route:  ActivatedRoute
  ) {}
  ngOnInit() {
    this.flightId=Number(this.route.snapshot.queryParamMap.get('flightId'));
    this.authService.currentUser.pipe(
      take(1),
      switchMap(user => {
        if (!user?.email) {
          return of(null);
        }
        return this.passengerService.getPassengerIdByEmail(user.email);
      })
    ).subscribe({
      next: (passengerId) => {
        if (passengerId) {
          this.isPassengerRegistered = true;
          this.passengerService.getPassengerByUserId(passengerId).subscribe({next: (passenger)=>{
            console.log(passenger);
            this.form.get('name')?.setValue(passenger.name);
            this.form.get('city')?.setValue(passenger.city);
            this.form.get('phoneNumber')?.setValue(passenger.phoneNum);
            this.form.get('houseNo')?.setValue(passenger.houseNo);
            this.form.get('state')?.setValue(passenger.state);
          },
          error:()=>{
            console.log("cannot bind data from model to ui");
          }
        }
          )

        }

        this.checking = false;
      },
      error: () => {
        this.isPassengerRegistered = false;
        this.checking = false;
      }
    });
  }

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    houseNo: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('',  [Validators.required]),
  });

  register() {
    if (this.form.invalid) return;

    this.authService.currentUser.pipe(take(1)).subscribe(user => {
      if (!user?.email) {
        console.error('User not logged in');
        return;
      }

      const profile = {
        name: this.form.value.name!,
        phoneNum: this.form.value.phoneNumber!,
        email: user.email,
        houseNo: this.form.value.houseNo!,
        city: this.form.value.city!,
        state: this.form.value.state!,
      };

      console.log('Register payload:', profile);
const backendPayload = {
  ...profile,
  phoneNumber: profile.phoneNum
};

delete (backendPayload as any).phoneNum;
      this.passengerService.registerPassenger(backendPayload).subscribe({
        next: (id) => {
          console.log('Passenger registered with id:', id);
           this.router.navigate(['/book'], {
          queryParams: {flightId: this.flightId} 
        });
        },
        error: (err) => {
          console.error('Registration failed', err);
        }
      });
    });
  }
}
