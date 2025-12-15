import { Routes } from '@angular/router';
import {Home} from './components/home/home';
import { LoggedinPage } from './components/loggedin-page/loggedin-page';
import { App } from './app';
import { Signup } from './components/signup/signup';
import { Signin } from './components/signin/signin';
import { FlightList } from './components/FLIGHTS/FLIGHTS';
import { authGuard } from './GUARDS/auth.gaurd';
import { adminGuard } from './GUARDS/admin.gaurd';
import { TicketBooking } from './components/Booking_Ticket/ticket-booking';
import { userOrAdminGuard } from './GUARDS/USERADMIN';
import { PassengerRegistration } from './components/passenger-registration/passenger-registration';
export const routes: Routes = [
    {path:'',component:Home},
    {path:'signup',component:Signup},
    {path:'signin',component:Signin},
    {path:'signedin',component:LoggedinPage,canActivate: [userOrAdminGuard]},
    {path:'flights',component:FlightList},
    {path:'book',component:TicketBooking,canActivate: [userOrAdminGuard]},
    {path:'register',component:PassengerRegistration,canActivate: [userOrAdminGuard]}



];
