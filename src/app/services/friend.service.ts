import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

const API = `${environment.urlApi}`

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(private http:HttpClient) { }

  addFriend(ownId:number,targetId:number):Observable<any> {
    return this.http.post<any>(API + `/relationShip/${ownId}/${targetId}`,{})
  }

  acceptFriend(ownId:number,targetId:number):Observable<any> {
    return this.http.put<any>(API + `/relationShip/${ownId}/${targetId}`,{})
  }

  unFriend(ownId:number,targetId:number):Observable<any> {
    return this.http.delete<any>(API + `/relationShip/${ownId}/${targetId}`)
  }

  blockFriend(ownId:number,targetId:number):Observable<any> {
    return this.http.put<any>(API + `/relationShip/block/${ownId}/${targetId}`,{})
  }

  mutualFriends(ownId:number,targetId:number):Observable<any> {
    return this.http.get<any>(API + `/relationShip/MutualFriends/${ownId}/${targetId}`)
  }

  checkRelationship(ownId:number,targetId:number):Observable<any>{
    return this.http.get<any>(API + `/relationShip/checkRelationship/${ownId}/${targetId}`)
  }
}
