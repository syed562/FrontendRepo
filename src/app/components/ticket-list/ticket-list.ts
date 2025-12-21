import { Component, Input, OnChanges, OnInit,OnDestroy, Output } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, switchMap, take } from 'rxjs';
import { Ticket } from '../../models/Ticket';
import { TicketService } from '../../services/TicketService/ticket-service';
import { AuthService } from '../../services/Authentication/auth-service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { SimpleChanges } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FlightService } from '../../services/FlightService/flight-service';
@Component({
  selector: 'app-ticket-list',
  standalone: true,
  templateUrl: './ticket-list.html',
  styleUrl: './ticket-list.css',
  imports:[ AsyncPipe, DatePipe]
})
export class TicketList implements OnInit, OnChanges, OnDestroy {

  selectedTicket!: Ticket;

  @Input() tickets: Ticket[] | null = null;
  @Output() ticketCancelled = new EventEmitter<void>();

  tickets$!: Observable<Ticket[]>;
  private refresh$ = new BehaviorSubject<void>(undefined);

  constructor(
    private readonly ticketService: TicketService,
    private readonly authService: AuthService
  ) {}

  ngOnInit() {
    if (!this.tickets) {
      this.tickets$ = this.authService.currentUser.pipe(
        take(1),
        switchMap(user => {
          if (!user?.email) {
            throw new Error('User not logged in');
          }
          return this.refresh$.pipe(
            switchMap(() =>
              this.ticketService.getTicketsByEmail(user.email)
            )
          );
        })
      );
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tickets'] && this.tickets) {
      this.tickets$ = of(this.tickets);
    }
  }

  openCancelModal(ticket: Ticket) {
    this.selectedTicket = ticket;
  }

  confirmCancel() {
    this.cancel(this.selectedTicket);
  }

  isCancelDisabled(ticket: Ticket): boolean {
    const departure = new Date(ticket.departureTime).getTime();
    const now = Date.now();
    return (departure - now) / (1000 * 60 * 60) < 24;
  }

  cancel(ticket: Ticket) {
    if (!ticket?.id || !ticket.departureTime) return;

    const departure = new Date(ticket.departureTime).getTime();
    const now = Date.now();
    const diffInHours = (departure - now) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      alert('Ticket cannot be cancelled within 24 hours of departure');
      return;
    }

    this.ticketService.cancelTicket(ticket.id).subscribe({
      next: () => {
        this.refresh$.next();
        this.ticketCancelled.emit();
      }
    });
  }

  ngOnDestroy() {
    console.log('TicketList component destroyed');
  }
}