import { UserLogin } from './../../shared/models/UserLogin.model';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/User.model';
import { HttpClient } from '@angular/common/http';

const backendUrl = environment.backendUrl;

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private http: HttpClient) {}

  RegisterUser(UserObject: any) {

    return this.http.post<{UserObject: User, message: string, success: boolean}>(`${backendUrl}users/register`, UserObject);

  }

  LoginUser(UserObject: UserLogin) {

// tslint:disable-next-line: max-line-length
    return this.http.post<{UserObject: User, id: string, token: string, message: string, success: boolean, }>(`${backendUrl}users/login`, UserObject);
  }

  UpdateLoggedIn(id: string, action: boolean) {

    const Action = {action};
    return this.http.put<{success: boolean}>(`${backendUrl}users/${id}`, Action);
  }

  GetConnectedUser(id: string) {
    return this.http.get<{UserObject: User, success: boolean}>(`${backendUrl}users/${id}`);
  }

  UpdateUser(UserObject: any, id: string) {

    return this.http.post<{UserObject: User, message: string}>(`${backendUrl}users/${id}`, UserObject);
  }

  UpdateUserCollectionImages(UserImages: any, id: string) {

    return this.http.post<{Images: any, message: string, success: boolean}>(`${backendUrl}users/images/${id}`, UserImages);
  }


}
