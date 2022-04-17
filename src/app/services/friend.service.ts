import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

const API = `${environment.urlApi}`

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(private http:HttpClient) { }


}
