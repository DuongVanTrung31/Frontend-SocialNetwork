import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../models/post";



const API = `${environment.urlApi}`

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  savePost(id: number, post: any): Observable<any> {
    return this.http.post<any>(API + `/post/${id}`, post);
  }

  getNewFeeds(uid: number): Observable<any> {
    return this.http.get<any>(API + `/post/newFeeds/${uid}`)
  }
}
