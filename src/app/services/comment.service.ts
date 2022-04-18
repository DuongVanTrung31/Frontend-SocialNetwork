import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Comment} from "../models/comment";


const API = `${environment.urlApi}`

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  saveComment(pid: number| undefined,comment: Comment):Observable<any> {
    return this.http.post<any>(API + `/comment/${pid}`, comment)
  }

  delComment(commentId: number|undefined):Observable<any> {
    return this.http.delete(API + `/comment/${commentId}`)
  }
}
