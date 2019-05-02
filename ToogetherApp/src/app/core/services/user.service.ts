import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CollectionImages } from '../../shared/models/collection-images.model';
import { LoggedInData } from '../../shared/models/login-user.model';
import { environment } from './../../../environments/environment';
import { UserLogin } from './../../shared/models/UserLogin.model';
import { ResultData } from '../../shared/models/data.model';


const backendUrl = environment.backendUrl;

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private http: HttpClient) {}

  registerUser(userData: any) {
    return this.http.post<{message: ResultData}>(`${backendUrl}users/register`, userData);
  }
  updateUser(userData: FormData, id: string) {
    console.log(userData);
    return this.http.post<{message: ResultData}>(`${backendUrl}users/${id}`, userData);
  }
  login(userDetails: UserLogin) {
    return this.http.post<{message: LoggedInData}>(`${backendUrl}users/login`, userDetails);
  }
  updateStatusLogged(id: string, action: boolean) {
    const Action = {action};
    return this.http.put<{success: boolean}>(`${backendUrl}users/${id}`, Action);
  }
  getCurrentUser(id: string) {
    return this.http.get<{message: any}>(`${backendUrl}users/${id}`);
  }
  getImagesViaPaginator(postsPerPage: number, currentPage: number, id: string) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    return this.http.get<{message: CollectionImages}>(`${backendUrl}users/images/${id}` + queryParams);
  }
  updateImageCollection(UserImages: any, id: string) {
    return this.http.post<{userData: CollectionImages}>(`${backendUrl}users/images/${id}`, UserImages);
  }


}
