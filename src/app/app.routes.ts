import { Routes } from '@angular/router';
import {Home} from './components/home/home';
import { App } from './app';
import { Signup } from './components/signup/signup';
import { Signin } from './components/signin/signin';
import { FlightList } from './components/FLIGHTS/flight-list';
import { authGuard } from './gaurds/auth.gaurd';
import { adminGuard } from './gaurds/admin.gaurd';
import { TicketBooking } from './components/Booking/ticket-booking';
import { userOrAdminGuard } from './gaurds/userOrAdminGuard';
import { PassengerRegistration } from './components/PASS_REG/passenger-registration';
import { TicketList } from './components/ticket-list/ticket-list';
import { FlightAdmin } from './components/ADMIN/flight-admin';
import { ChangePassword } from './components/PASS_CHANGE/change-password';
export const routes: Routes = [
    {path:'',component:Home},
    {path:'signup',component:Signup},
    {path:'signin',component:Signin},
    {path:'flights',component:FlightList},
    {path:'book',component:TicketBooking,canActivate: [userOrAdminGuard]},
    {path:'register',component:PassengerRegistration,canActivate: [userOrAdminGuard]},
    {path:'tickets',component:TicketList,canActivate:[userOrAdminGuard]},
    {path:'addFlights',component:FlightAdmin,canActivate:[adminGuard]},
       {path:'change-password',component:ChangePassword}



];
