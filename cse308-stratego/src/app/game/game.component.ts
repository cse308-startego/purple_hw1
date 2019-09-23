import {Component, OnInit} from '@angular/core';
import {Block, Card} from './game-models';

@Component({
  selector: 'game-page',
  templateUrl: 'game.component.html',
  styleUrls: ['game.component.css']

})
export class GameComponent{
  columns:string[]=[];
  rows:number[]=[];

  private gameBoard :Card[][];

  ngOnInit() {
    let gridSize = 10;
    for (let i=0; i<gridSize;i++){
      this.columns.push(String.fromCharCode(65+i));
    }
    for (let i=0; i<gridSize;i++){
      this.rows.push(i);
    }
    this.initializeCards();

  }

  initializeCards() {

  }

  trClick(row,columns){
    console.log(row,columns)
  }

}
