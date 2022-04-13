import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RegisterDto} from "../models/dto/register-dto";

const API = `${environment.urlApi}`

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(registerDto: RegisterDto): Observable<any> {
    return this.http.post<any>(API + "/auth/signup", registerDto);
  }
}
