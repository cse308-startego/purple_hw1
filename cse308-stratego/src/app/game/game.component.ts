import {Component, OnInit} from '@angular/core';
import {Block, Board, Card} from './game-models';
import {ApiService} from '../service/api.service';

@Component({
  selector: 'game-page',
  templateUrl: 'game.component.html',
  styleUrls: ['game.component.css']

})
export class GameComponent implements OnInit {
  columns: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  rows: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];



  private gameBoard: Card[][] = [];
  private redArr: Card[] = [];
  private blueArr: Card[] = [];
  private imageMap: Map<number, string> = new Map<number,string>();

  constructor(private service: ApiService) {}


  ngOnInit() {
    this.populateImageMap();
    this.initializeCards();
    this.setupGameBoard();
    this.setPositions();
    console.log(this.gameBoard);

    let board = new Board();
    board.board = this.gameBoard;

    this.service.arrayManipulation(board).subscribe((data: string) => {
      console.log(data)
    });


  }

  populateImageMap() {

    let basePath = "../assets/";

    for (let i = 1; i <= 12; i++) {
      let name = "";
      if (i == 1)
        name = "marshal.png";
      else if (i == 2)
        name = "general.png";
      else if (i == 3)
        name = "colonel.png";
      else if (i == 4)
        name = "major.png";
      else if (i == 5)
        name = "captain.png";
      else if (i == 6)
        name = "lieutenant.png";
      else if (i == 7)
        name = "sergeant.png";
      else if (i == 8)
        name = "miner.png";
      else if (i == 9)
        name = "scout.png";
      else if (i == 10)
        name = "spy.png";
      else if (i == 11)
        name = "bomb.png";
      else if (i == 12)
        name = "flag.png";

      this.imageMap.set(i, basePath + name)
    }
    console.log(this.imageMap);
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

      // Initially every card has a position of 0,0 regradless
      card.x = 0;
      card.y = 0;

      console.log(i);
      if (i == 1 || i == 2 || i == 10 || i == 12) {
        card.color = color;
        card.value = i;
        card.path = this.imageMap.get(i);
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
      temp=this.setPos(temp, 0, 0);
      temp.color = color;
      temp.value = val;
      temp.path = this.imageMap.get(val);
      if (color == "red")
        this.redArr.push(temp);
      else
        this.blueArr.push(temp);
    }
  }

  setupGameBoard() {
    let s = 4;
    while (s > 0) {
      this.gameBoard.push(this.redArr.splice(0, 10));
      s--;
    }

    for (let i = 0; i < 2; i++) {
      let cd = new Card();
      cd.color = "purple";
      cd.value = 0;
      cd.path = "";
      cd = this.setPos(cd,0, 0);
      this.gameBoard.push([cd, cd, cd, cd, cd, cd, cd, cd, cd, cd])
    }

    s = 4;
    while (s > 0) {
      this.gameBoard.push(this.blueArr.splice(0, 10));
      s--;
    }
    console.log(this.gameBoard);
  }

  setPositions() {
    for(let i = 0; i < this.gameBoard.length; i++) {
      for(let j = 0; j < this.gameBoard[0].length; j++) {
        this.gameBoard[i][j].x = i;
        this.gameBoard[i][j].y = j;
      }
    }
  }

  setPos(tcard: Card, x: number, y: number) {
    tcard.x = x;
    tcard.y = y;

    return tcard;
  }

  private selectedCard: Card = new Card();

  onSelection() {
  }

  onMove() {
  }

  populatePlayers(){
  }

  trClick(row, column) {
    if(this.gameBoard[row][column].value != 0) {
      this.selectedCard = this.gameBoard[row][column];
      this.gameBoard[row][column] = new Card();
    }
    else {
      this.gameBoard[row][column] = this.selectedCard;
    }
  }


}
