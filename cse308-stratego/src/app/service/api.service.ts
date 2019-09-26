import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {Card} from '../game/game-models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8080/stratego/';

  login(){
    return this.http.get(this.baseUrl + "login", {responseType: 'text'});
  }

  arrayManipulation(gameBoard: Card[][]) {
    return this.http.get(this.baseUrl + "array?arr=" + gameBoard, {responseType: 'text'});
  }


}
