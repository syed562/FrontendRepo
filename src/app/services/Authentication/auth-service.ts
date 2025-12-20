import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { userDetails } from '../../models/userDetails';
import { user } from '../../models/user';
import { BehaviorSubject, catchError, throwError,of } from 'rxjs';
import { UserRole } from '../../enums/user-role.enum';
import { UserResponse } from '../../models/UserResponse';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly BASE_URL =
    'http://localhost:8765/auth-service/api/auth';

  private readonly me$ = new BehaviorSubject<UserResponse | null>(null);
  private readonly errorSubject = new BehaviorSubject<string | null>(null);
  error$ = this.errorSubject.asObservable();

  constructor(private readonly http: HttpClient) {
    this.loadMe();
    //when site refreshes we can actually have the current user data!
  }

  private loadMe() {
    this.http
      .get<UserResponse>(`${this.BASE_URL}/me`, { withCredentials: true })
      .pipe(catchError(() => of(null)))
      .subscribe(user => this.me$.next(user));
  }

  get currentUser() {
    return this.me$.asObservable(); //we are sending it as observable to avoid mutations like an getter we can think
  }

  signup(user: userDetails) {
    const payload = {
      ...user,
      roles: user.roles.map(role =>
        UserRole[role].replace('ROLE_', '').toLowerCase()
      ),
    };

    return this.http
      .post(`${this.BASE_URL}/signup`, payload, { withCredentials: true })
      .pipe(catchError(error => this.handleError(error)));
  }

  signin(user: user) {
    return this.http
      .post<UserResponse>(
        `${this.BASE_URL}/signin`,
        user,
        { withCredentials: true }
      )
      .pipe(
        tap(res => this.me$.next(res)),
        catchError(error => this.handleError(error))
      );
  }

  signout() {
    return this.http
      .post(
        `${this.BASE_URL}/signout`,
        {},
        { withCredentials: true }
      )
      .pipe(
        tap(() => this.me$.next(null)),
        catchError(error => this.handleError(error))
      );
  }

 private handleError(error: HttpErrorResponse) {
  let message = 'Something went wrong. Please try again.';
  if (error.error instanceof ErrorEvent) {
    message = error.error.message;
  } 
  else {
    if (error.status === 401 || error.status === 403) {
      message = 'Invalid username or password';
    } else if (error.error?.message) {
      message = error.error.message;
    } else {
      message = `Error ${error.status}`;
    }
  }

  this.errorSubject.next(message);
  console.error('Auth error:', error.status, message);

  return throwError(() => error);
}


  clearError() {
    this.errorSubject.next(null);
  }
}
