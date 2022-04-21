import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RegisterDto} from "../models/dto/register-dto";
import {ChangePasswordForm} from "../models/dto/change-password-form";



const API = `${environment.urlApi}`

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(registerDto: RegisterDto): Observable<any> {
    return this.http.post<any>(API + "/auth/signup", registerDto);
  }

  getUserInfo(uid: number):Observable<any> {
    return this.http.get<any>(API + `/userInfo/${uid}`);
  }

  changePassword(uid: number,changePasswordForm:ChangePasswordForm): Observable<any> {
    return this.http.put<any>(API + `/changePassword/${uid}`,changePasswordForm)
  }

  getRequestToMe(uid:number): Observable<any> {
    return this.http.get<any>(API + `/requestToMe/${uid}`)
  }

  getFriends(uid:number): Observable<any> {
    return this.http.get<any>(API + `/listMyFriends/${uid}`)
  }

  getRequestFromMe(uid:number):Observable<any> {
    return this.http.get<any>(API + `/requestFromMe/${uid}`)
  }

  updateInfo(uid : number, user : any) :Observable<any> {
    return this.http.put<any>(API + `/updateInfo/${uid}` , user)
  }

  updateImg(uid: number, avatar: any):Observable<any> {
    return this.http.put(API + `/updateImg/${uid}`,avatar)
  }
}
