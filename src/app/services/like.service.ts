import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

const API = `${environment.urlApi}`

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http: HttpClient) { }

  likePost(postId:number| undefined, userId:number):Observable<any> {
    return this.http.get<any>(API + `/likePost/${postId}/${userId}`)
  }

  likeComment(commentId:number | undefined, userId:number):Observable<any>{
    return this.http.get<any>(API + `/like-comment/${commentId}/${userId}`)
  }
}
