import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { searchReq } from '../../ENTITIES/searchRequest';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Flight } from '../../ENTITIES/Flight';
import { FlightService } from '../../services/FlightService/flight-service';
import { FlightList } from '../FLIGHTS/flight-list';
import { originDestinationDifferent } from '../../validatorFunctions/originDestinationDifferent';
import { searchingStateService } from '../../services/SavingStates/searchingStateService';
@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, CommonModule, FlightList],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  flights$?: Observable<Flight[]>;
  minDate!: string;
  constructor(private readonly flightService: FlightService,private readonly searchState: searchingStateService ) {}

  ngOnInit() {
     this.minDate=new Date().toISOString().split('T')[0];
  const request = this.searchState.get();
console.log("while getting it",this.searchState.get());
  if (request?.departureDateTime) {
    const dateOnly = request.departureDateTime.split('T')[0];

    this.form.patchValue({
      origin: request.origin,
      destination: request.destination,
      departureDate: dateOnly 
    });
  }
}

  req: searchReq = {
    origin: '',
    destination: '',
    departureDateTime: '',
  };
  form = new FormGroup(
    {
      origin: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]),
      destination: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]),
      departureDate: new FormControl('', [Validators.required]),
    },
    { validators: originDestinationDifferent }
  );
  onSubmit() {
    const date = this.form.value.departureDate;
    this.req = {
      origin: this.form.value.origin!.trim().toLowerCase(),
      destination: this.form.value.destination!.trim().toLowerCase(),
      departureDateTime: date + 'T00:00:00',
    };
  
    console.log(this.req);
    this.searchState.save(this.req);
    console.log("while saving",this.searchState.get());
    
    this.flights$ = this.flightService.getFlightByOriginAndDestination(this.req);
  }
}