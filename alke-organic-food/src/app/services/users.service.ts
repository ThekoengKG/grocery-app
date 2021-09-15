import { UserServerResponse } from './../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  server_url = 'http://localhost:3000/api';

  constructor(private _http: HttpClient) { }


  //get all users
  getAllUsers(): Observable<UserServerResponse> {
    return this._http.get<UserServerResponse>(this.server_url + '/users/');
  }


  //Create User
  createUser(data:any):Observable<any>{
    return this._http.post(this.server_url + '/users/addUser', data);
  }


  //Delete
  deleteUser(id:number):Observable<User>{
    return this._http.delete<User>(this.server_url + '/users/delete/' + id);
  }


}
