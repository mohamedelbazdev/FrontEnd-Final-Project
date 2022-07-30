import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
    public _registerUrl = "http://127.0.0.1:8000/api/providers/register";
    public _loginUrl = "http://127.0.0.1:8000/api/auth/login";

  constructor(private http: HttpClient, private router:Router) { }

    loginUser(user:any) {
        return this.http.post<any>(this._loginUrl, user)
    }

    registerUser(user:any) {
      return this.http.post<any>(this._registerUrl, user)
    }

    setToken(token:string) {
        return localStorage.setItem('token', token)
    }

    logoutUser() {
      localStorage.removeItem('token')
      this.router.navigateByUrl('/account/login')
    }

    getToken() {
      return localStorage.getItem('token')
    }

    loggedIn() {
      return !!localStorage.getItem('token')
    }

}
