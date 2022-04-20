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

  getTimeLine(uid: number):Observable<any> {
    return this.http.get<any>(API + `/post/${uid}`)
  }

  deletePost(postId:number|undefined):Observable<any> {
    return this.http.delete(API + `/post/${postId}`)
  }

  listPostTarget(uid:number, targetId:number):Observable<any> {
    return this.http.get(API + `/post/listStatus/${uid}/${targetId}`)
  }

  search(uid:number, search:string): Observable<any> {
    return this.http.get(API + `/post/search?uid=${uid}&search=${search}`)
  }
}
