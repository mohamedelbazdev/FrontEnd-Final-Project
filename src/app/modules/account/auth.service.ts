
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from 'express';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://127.0.0.1:8000/api/providers/register";
  private _loginUrl = "http://127.0.0.1:8000/api/auth/login";

  constructor(private http: HttpClient,
              private _router: Router) { }

  registerUser(user:any) {
    return this.http.post<any>(this._registerUrl, user)
  }

  loginUser(user:any) {
    return this.http.post<any>(this._loginUrl, user)
  }

  logoutUser() {
    localStorage.removeItem('token')
    // this._router.navigate(['/account'])
  }

  getToken() {
    return localStorage.getItem('token')
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }
}
