import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { userDetails } from '../../ENTITIES/userDetails';
import { user } from '../../ENTITIES/user';
import { BehaviorSubject, catchError, throwError,of } from 'rxjs';
import { UserRole } from '../../enums/user-role.enum';
import { UserResponse } from '../../ENTITIES/UserResponse';
import { tap } from 'rxjs';
import { SignInResponse } from '../../ENTITIES/SignInResponse';
import { Router } from '@angular/router';
import { PasswordExpiredResponse } from '../../ENTITIES/PasswodExpiredResponse';
function isPasswordExpired(
  res: SignInResponse
): res is PasswordExpiredResponse {
  return (
    typeof res === 'object' &&
    res !== null &&
    'forcePasswordChange' in res &&
    res.forcePasswordChange === true
  );
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly BASE_URL =
    'http://localhost:8765/auth-service/api/auth';

  private readonly me$ = new BehaviorSubject<UserResponse | null | undefined>(undefined);
  private readonly errorSubject = new BehaviorSubject<string | null>(null);
  error$ = this.errorSubject.asObservable();
  private readonly passwordExpired$ = new BehaviorSubject<boolean>(false);
passwordExpiredState$ = this.passwordExpired$.asObservable();


  constructor(private readonly http: HttpClient,private readonly router:Router) {
    this.loadMe();
   
  }

  private loadMe() {
    this.http
      .get<UserResponse>(`${this.BASE_URL}/me`, { withCredentials: true })
      .pipe(catchError(() => of(null)))
      .subscribe(user => this.me$.next(user ?? null));
  }

  get currentUser() {
    return this.me$.asObservable(); 
  }
setAuthenticatedUser(user: UserResponse) {
  this.me$.next(user);
}

handleSignInResponse(res: SignInResponse): void {
  if (isPasswordExpired(res)) {
    this.passwordExpired$.next(true);
    return;
  }

  this.me$.next(res);
  this.passwordExpired$.next(false);
  this.router.navigate(['/']);
}
setPasswordExpired(value: boolean) {
  this.passwordExpired$.next(value);
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
    .post<SignInResponse>(
      `${this.BASE_URL}/signin`,
      user,
      {
      withCredentials: true
    }
    )
    .pipe(
     catchError(error => this.handleError(error))
    );
}

changePassword(req: { oldPassword: string; newPassword: string }) {
  return this.http.post(
    `${this.BASE_URL}/change-password`,
    req,
    { withCredentials: true, responseType: 'text' }
  ).pipe(
    tap(() => this.me$.next(null)),
    catchError(err => this.handleError(err))
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
  let message: string;
  
  if (error.error instanceof ErrorEvent) {
    message = error.error.message;
  } else {
   
    message = error.error?.message || error.error || error.statusText || 'An error occurred';
  }

  this.errorSubject.next(message);
  console.error('Auth error:', error.status, message);

  return throwError(() => error);
}


  clearError() {
    this.errorSubject.next(null);
  }
}