import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResultUser } from 'src/app/shared/models/Result-user';
import { CollectionImages } from '../../shared/models/collection-images.model';
import { LoggedInData } from '../../shared/models/login-user.model';
import { environment } from './../../../environments/environment';
import { UserLogin } from './../../shared/models/UserLogin.model';

const backendUrl = environment.backendUrl;

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private http: HttpClient) {}

  RegisterUser(UserObject: any) {
    return this.http.post<{userData: ResultUser}>(`${backendUrl}users/register`, UserObject);
  }
  LoginUser(UserObject: UserLogin) {
    return this.http.post<{userData: LoggedInData}>(`${backendUrl}users/login`, UserObject);
  }
  GetConnectedUser(id: string) {
    return this.http.get<{userData: any}>(`${backendUrl}users/${id}`);
  }

  GetImagesViaPaginator(postsPerPage: number, currentPage: number, id: string)
  {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    return this.http.get<{userData: any}>(`${backendUrl}users/images/${id}` +queryParams);

  }
  UpdateLoggedIn(id: string, action: boolean) {
    const Action = {action};
    return this.http.put<{success: boolean}>(`${backendUrl}users/${id}`, Action);
  }
  UpdateUser(UserObject: any, id: string) {

    return this.http.post<{userData: ResultUser}>(`${backendUrl}users/${id}`, UserObject);
  }
  UpdateUserCollectionImages(UserImages: any, id: string) {

    return this.http.post<{userData: CollectionImages}>(`${backendUrl}users/images/${id}`, UserImages);
  }


}
