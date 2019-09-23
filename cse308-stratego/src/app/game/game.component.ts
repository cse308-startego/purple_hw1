import {Component, OnInit} from '@angular/core';
import {Block} from './game-models';

@Component({
  selector: 'game-page',
  templateUrl: 'game.component.html',
  styleUrls: ['game.component.css']

})
export class GameComponent{
  columns:string[]=[];
  rows:number[]=[];
  ngOnInit() {
    let gridSize = 10;
    for (let i=0; i<gridSize;i++){
      this.columns.push(String.fromCharCode(65+i));
    }
    for (let i=0; i<gridSize;i++){
      this.rows.push(i);
    }
  }

  trClick(row,columns){
    console.log(row,columns)
  }

}
