import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CollectionImages } from '../../shared/models/collection-images.model';
import { environment } from './../../../environments/environment';
import { ResultData } from '../../shared/models/data.model';

const backendUrl = environment.backendUrl;
@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private http: HttpClient) {}

  updateUser(userData: FormData, id: string) {
    return this.http.post<{message: ResultData}>(`${backendUrl}users/${id}`, userData);
  }
  getCurrentUser(id: string) {
    return this.http.get<{message: any}>(`${backendUrl}${id}`);
  }
  getImagesViaPaginator(postsPerPage: number, currentPage: number, id: string) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    return this.http.get<{message: CollectionImages}>(`${backendUrl}images/${id}` + queryParams);
  }
  updateImageCollection(UserImages: any, id: string) {
    return this.http.post<{userData: CollectionImages}>(`${backendUrl}images/${id}`, UserImages);
  }
}
