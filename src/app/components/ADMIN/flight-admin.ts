import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FlightAdminService } from '../../services/FlightAdmin/flight-admin-service';
import { Flight } from '../../ENTITIES/Flight';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-flight-admin',
  imports: [ReactiveFormsModule, AsyncPipe, CommonModule],
  standalone: true,
  templateUrl: './flight-admin.html',
  styleUrl: './flight-admin.css',
})
export class FlightAdmin implements OnInit {
  minDate!: string;

  flights$!: Observable<Flight[]>;
  constructor(private readonly flightAdmin: FlightAdminService) {}
  private refresh$ = new BehaviorSubject<void>(undefined);
  ngOnInit() {
    this.minDate = new Date().toISOString().split('T')[0];
     this.flights$ = this.refresh$.pipe(
    switchMap(() => this.flightAdmin.getAllFlights())
  );
  }

  flight: Flight = {
    airline: '',
    origin: '',
    destination: '',
    price: 0,
    departureTime: '',
    arrivalTime: '',
    totalSeats:0,
    availableSeats:0
  };
  form = new FormGroup({
    airline: new FormControl('',  [Validators.required, Validators.pattern('^[A-Za-z ]+$')]),
    origin: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]),
    destination: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]),
    price: new FormControl(0, [Validators.required,Validators.pattern('^[0-9]+$')]),
    departureDate: new FormControl('', Validators.required),
    departureTime: new FormControl('', Validators.required),
    arrivalTime: new FormControl('', Validators.required),
    arrivalDate: new FormControl('', Validators.required),
    totalSeats:new FormControl(0,Validators.required)
  });

  register() {
   const newFlight: Flight = {
    airline: this.form.value.airline!,
    origin: this.form.value.origin!,
    destination: this.form.value.destination!,
    price: this.form.value.price!,
    departureTime:
      this.form.value.departureDate! + 'T' + this.form.value.departureTime! + ':00',
    arrivalTime:
      this.form.value.arrivalDate! + 'T' + this.form.value.arrivalTime! + ':00',
totalSeats: this.form.value.totalSeats ?? 0 };
    this.flightAdmin.flightAdd(newFlight).subscribe(
      {
        next:()=> {console.log("flight registered");

           this.refresh$.next();
          
          
        },
        error:()=>console.log("error in registering flight")
      }
    );
    this.form.reset({
      departureDate: this.minDate,
      arrivalDate: this.minDate,
    });
  }
  DeleteById(id: number | undefined) {
    if (id === undefined) {
      console.error('Flight id is undefined');
      return;
    }
    

    this.flightAdmin.deleteFlightById(id).subscribe({
      next: () => {
        console.log(id, 'flight got deleted');
          this.refresh$.next(); 
      },
      error: () => {
        console.log('error in deleting the flights');
      },
    });
  }
}