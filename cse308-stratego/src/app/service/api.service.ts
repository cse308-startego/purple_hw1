import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from "rxjs/index";
import {Board, Card} from '../game/game-models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8080/stratego/';
  baseUrl2: string = 'http://localhost:8080/';

  login(email, password){
    return this.http.get(this.baseUrl + "login?email="+email+"&password="+password, {responseType: 'text'}); //paper padh rohit ka question mark
  }

  signUp(){
    return this.http.get(this.baseUrl2 + "signUp", {responseType: 'text'});
  }

  arrayManipulation(gameBoard: Board) {
    let json = JSON.stringify(gameBoard);
    return this.http.post(this.baseUrl + "array", json,{responseType: 'text'});
  }


}
