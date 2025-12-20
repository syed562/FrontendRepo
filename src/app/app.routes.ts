import { Routes } from '@angular/router';
import {Home} from './components/home/home';
import { App } from './app';
import { Signup } from './components/signup/signup';
import { Signin } from './components/signin/signin';
import { FlightList } from './components/flight-list/flight-list';
import { authGuard } from './gaurds/auth.gaurd';
import { adminGuard } from './gaurds/admin.gaurd';
import { TicketBooking } from './components/ticket-booking/ticket-booking';
import { userOrAdminGuard } from './gaurds/userOrAdminGuard';
import { PassengerRegistration } from './components/passenger-registration/passenger-registration';
import { TicketList } from './components/ticket-list/ticket-list';
import { FlightAdmin } from './components/flight-admin/flight-admin';
export const routes: Routes = [
    {path:'',component:Home},
    {path:'signup',component:Signup},
    {path:'signin',component:Signin},
    {path:'flights',component:FlightList},
    {path:'book',component:TicketBooking,canActivate: [userOrAdminGuard]},
    {path:'register',component:PassengerRegistration,canActivate: [userOrAdminGuard]},
    {path:'tickets',component:TicketList,canActivate:[userOrAdminGuard]},
    {path:'addFlights',component:FlightAdmin,canActivate:[adminGuard]}



];
