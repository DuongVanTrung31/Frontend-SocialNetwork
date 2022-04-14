import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, map, Observable} from "rxjs";
import {UserToken} from "../models/dto/user-token";




const API = `${environment.urlApi}/auth/`


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<UserToken>;
  public currentUser: Observable<UserToken>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserToken>(JSON.parse(<any>localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable()
  }

  public get currentUserValue():UserToken {
    return this.currentUserSubject.value
  }

  login(username: string, password: string) {
    return this.http.post<any>(API + "login",{username, password})
      .pipe(
        map(user => {
          localStorage.setItem('currentUser',JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user
        })
      )
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('ID');
    localStorage.removeItem('USERNAME');
    localStorage.removeItem('ROLE');
    localStorage.removeItem('ACCESS_TOKEN');
    // @ts-ignore
    this.currentUserSubject.next(null);
  }
}

