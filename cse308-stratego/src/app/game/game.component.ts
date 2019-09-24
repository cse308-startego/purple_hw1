import {Component, OnInit} from '@angular/core';
import {Block, Card} from './game-models';

@Component({
  selector: 'game-page',
  templateUrl: 'game.component.html',
  styleUrls: ['game.component.css']

})
export class GameComponent {
  columns: string[] = [];
  rows: number[] = [];

  private gameBoard: Card[][] = [];
  private redArr: Card[] = [];
  private blueArr: Card[] = [];


  ngOnInit() {
    this.initializeCards();
    this.setupGameBoard();

  }

  initializeCards() {

    this.initializePlayers("red");
    this.initializePlayers("Blue");
    console.log(this.redArr);
    console.log(this.blueArr);

  }


  initializePlayers(color: string) {

    for (let i = 1; i <= 12; i++) {
      let card: Card = new Card();
      console.log(i);
      if (i == 1 || i == 2 || i == 10 || i == 12) {
        card.color = color;
        card.value = i;
        card.path = "../assets/"
        if (color == "red")
          this.redArr.push(card);
        else
          this.blueArr.push(card);
      } else if (i == 3) {
        this.initializerHelper(2, color, i)
      } else if (i == 4) {
        this.initializerHelper(3, color, i)
      } else if (i == 5 || i == 6 || i == 7) {
        this.initializerHelper(4, color, i)
      } else if (i == 8) {
        this.initializerHelper(5, color, i)
      } else if (i == 9) {
        this.initializerHelper(8, color, i)
      } else if (i == 11) {
        this.initializerHelper(6, color, i)
      }

    }

  }

  initializerHelper(NOC, color: string, val) {

    for (let j = 0; j < NOC; j++) {
      let temp: Card = new Card();
      temp.color = color;
      temp.value = val;
      if (color == "red")
        this.redArr.push(temp);
      else
        this.blueArr.push(temp);

    }
  }

  setupGameBoard() {
    this.gameBoard.push(this.redArr.splice(0,10));
    this.gameBoard.push(this.redArr.splice(0,10));
    this.gameBoard.push(this.redArr.splice(0,10));
    this.gameBoard.push(this.redArr.splice(0,10));

    for(let i = 0; i < 2; i++) {
      let cd = new Card();
      cd.color="purple";
      cd.value= 0;
      this.gameBoard.push([cd, cd, cd, cd, cd, cd, cd, cd, cd, cd])
    }

    this.gameBoard.push(this.blueArr.splice(0,10));
    this.gameBoard.push(this.blueArr.splice(0,10));
    this.gameBoard.push(this.blueArr.splice(0,10));
    this.gameBoard.push(this.blueArr.splice(0,10));

    console.log(this.gameBoard);
  }

  trClick(row, columns) {
    console.log(row, columns)
  }

}
