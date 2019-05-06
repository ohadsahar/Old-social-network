import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Post } from '../../shared/models/post-data.model';

const backendUrl = environment.postUrl;

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {}

  register(postData: FormData) {
    return this.http.post<{ post: Post }>(`${backendUrl}register`, postData);
  }

  get() {
    return this.http.get<{message: Post}>(`${backendUrl}`);
  }
}
