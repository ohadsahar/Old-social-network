import { Injectable } from '@angular/core';
import { UserLogin } from '../../shared/models/UserLogin.model';
import { AuthData } from '../../shared/models/login-user.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResultData } from '../../shared/models/data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

const authUrl = environment.authUrl;

@Injectable({providedIn: 'root'})

export class AuthService {

  private token: string;
  private expiryDate: Date;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private isLogged: boolean;
  constructor(private http: HttpClient, private router: Router) {
    this.isLogged = false;
  }

  login(userDetails: UserLogin) {
      this.http.post<{message: AuthData}>(`${authUrl}login`, userDetails).subscribe(response => {
      const token = response.message.token;
      this.token = token;
      if (token) {
      this.isLogged = true;
      const expiryTokenTime = response.message.expiresIn;
      this.setAuthTimer(expiryTokenTime);
      this.tokenTimer = setTimeout(() => {
         this.logout();
      }, expiryTokenTime * 1000);
      const now = new Date();
      this.expiryDate = new Date(now.getTime() + expiryTokenTime * 1000);
      this.saveAuthData(this.token, this.expiryDate);
      this.authStatusListener.next(true);
      this.router.navigate([`/wall/${response.message.id}`]);
    }
    });
  }
  registerUser(userData: any) {
    return this.http.post<{message: ResultData}>(`${authUrl}register`, userData);
  }
  updateStatusLogged(id: string, action: boolean) {
    const Action = {action};
    return this.http.put<{success: boolean}>(`${authUrl}${id}`, Action);
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  autoAuthUser() {
    const authInformation = this.getAuthData();
    const now = new Date();
    if (authInformation) {
    const expiresIn = authInformation.expiryDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isLogged = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }
  }
  private saveAuthData(token: string, expirateionDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiryDate', expirateionDate.toISOString());
  }
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token || !expiryDate) {
      return;
    }
    return {token, expiryDate: new Date(expiryDate)};
  }
  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
  }
  logout() {
    this.token = null;
    this.isLogged = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
  }
  getIsLogged() {
    return this.isLogged;
  }
}
