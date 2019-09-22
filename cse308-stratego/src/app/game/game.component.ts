import {Component, OnInit} from '@angular/core';
import {Block} from './game-models';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'game-page',
  templateUrl: 'game.component.html',
  styleUrls: ['game.component.css']

})
export class GameComponent implements OnInit{

  ngOnInit() {
    this.createTable();
  }

  createTable() {
    var x=9;
    var y=9;
    var chessBoard = document.getElementById("chessBoard");
    console.log(chessBoard);
    for (var i=0; i<y; i++) {
      var row = chessBoard.appendChild(document.createElement("div"));
      for (var j=0; j<x; j++) {
        row.appendChild(document.createElement("span"));
      }
    }
  }



}
