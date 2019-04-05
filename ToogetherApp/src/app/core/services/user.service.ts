import { ResultUser } from './../../shared/models/Result-user';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/User.model';
import { HttpClient } from '@angular/common/http';



const backendUrl = environment.backendUrl;

console.log(backendUrl);
@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private http: HttpClient) {}


  RegisterUser(UserObject: User) {

    return this.http.post<{UserObject: User, message: string, success: boolean}>(`${backendUrl}users`, UserObject);

  }


}
