import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubject = new BehaviorSubject<User | null>(null)
  user$ = this.userSubject.asObservable()

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: {email: string, password: string}): Observable<any> {
    return this.http.post("http://localhost:5000/api/v1/auth/login", {
      email: credentials.email,
      password: credentials.password,
    }, {withCredentials: true}).pipe(
      catchError(this.handleError),
      tap(() => {
        this.fetchUser()
      })
    )
  }

  logout() {
    this.http.post("http://localhost:5000/api/v1/auth/logout", {}, {
      withCredentials: true
    }).subscribe(() => {
      this.userSubject.next(null)
    })
  }

  fetchUser() {
    this.http.get<{user: User}>('http://localhost:5000/api/v1/auth/me', {
      withCredentials: true
    }).subscribe({
      next: ({user}) => {
        this.userSubject.next(user)
      }
    })
  }

  handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.error("An error occurred: ", error.error.message)
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error)
    }
    return throwError(() => {
      new Error("Login failed. Please try again.")
    })
  }

  refreshSession(): Observable<any> {
    return this.http.post('http://localhost:5000/api/v1/auth/refresh', {}, { withCredentials: true });
  }
}
