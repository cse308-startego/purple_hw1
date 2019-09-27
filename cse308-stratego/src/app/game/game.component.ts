import {Component, OnInit} from '@angular/core';
import {Block, Card} from './game-models';

@Component({
  selector: 'game-page',
  templateUrl: 'game.component.html',
  styleUrls: ['game.component.css']

})
export class GameComponent implements OnInit {
  columns: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  rows: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  public gameBoard: Card[][] = [];
  private redArr: Card[] = [];
  private blueArr: Card[] = [];
  public imageMap: Map<number, string> = new Map<number, string>();

  ngOnInit() {
    this.populateImageMap();
    this.initializeCards();
    this.setupGameBoard();
  }

  populateImageMap() {

    const basePath = '../assets/';

    for (let i = 1; i <= 12; i++) {
      let name = ''
      // tslint:disable-next-line:triple-equals
      if (i == 1) {
        name = 'marshal.png';
        // tslint:disable-next-line:triple-equals
      } else if (i == 2) {
        name = 'general.png';
        // tslint:disable-next-line:triple-equals
      } else if (i == 3) {
        name = 'colonel.png';
        // tslint:disable-next-line:triple-equals
      } else if (i == 4) {
        name = 'major.png';
        // tslint:disable-next-line:triple-equals
      } else if (i == 5) {
        name = 'captain.png';
        // tslint:disable-next-line:triple-equals
      } else if (i == 6) {
        name = 'lieutenant.png';
        // tslint:disable-next-line:triple-equals
      } else if (i == 7) {
        name = 'sergeant.png';
        // tslint:disable-next-line:triple-equals
      } else if (i == 8) {
        name = 'miner.png';
        // tslint:disable-next-line:triple-equals
      } else if (i == 9) {
        name = 'scout.png';
        // tslint:disable-next-line:triple-equals
      } else if (i == 10) {
        name = 'spy.png';
        // tslint:disable-next-line:triple-equals
      } else if (i == 11) {
        name = 'bomb.png';
        // tslint:disable-next-line:triple-equals
      } else if (i == 12) {
        name = 'flag.png';
      }

      this.imageMap.set(i, basePath + name);
    }

    console.log(this.imageMap);
  }

  initializeCards() {

    this.initializePlayers("red");
    this.initializePlayers("Blue");
    // const  i = 0;
    // // tslint:disable-next-line:forin triple-equals
    // while (i == this.redArr.length ) {
    //
    // console.log(this.redArr[i] + '\n');
    // // @ts-ignore
    //   i++;
    // }

    console.log(this.blueArr);

  }


  initializePlayers(color: string) {

    for (let i = 1; i <= 12; i++) {
      let card: Card = new Card();

      // Initially every card has a position of 0,0 regradless
      card.x = 0;
      card.y = 0;

      if (i == 1 || i == 2 || i == 10 || i == 12) {
        card.color = color;
        card.value = i;
        card.path = this.imageMap.get(i);
        if (color == "red")
          this.redArr.push(card);
        else
          this.blueArr.push(card);
      } else if (i == 3) {
        this.initializerHelper(2, color, i);
      } else if (i == 4) {
        this.initializerHelper(3, color, i);
      } else if (i == 5 || i == 6 || i == 7) {
        this.initializerHelper(4, color, i);
      } else if (i == 8) {
        this.initializerHelper(5, color, i);
      } else if (i == 9) {
        this.initializerHelper(8, color, i);
      } else if (i == 11) {
        this.initializerHelper(6, color, i);
      }

    }

  }

  initializerHelper(NOC, color: string, val) {

    for (let j = 0; j < NOC; j++) {
      let temp: Card = new Card();
      temp = this.setPos(temp, 0, 0);
      temp.color = color;
      temp.value = val;
      val = Math.floor(Math.random() * 12) + 1
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
      cd.path = "";
      cd.value = 0;
      cd = this.setPos(cd, 0, 0);
      this.gameBoard.push([cd, cd, cd, cd, cd, cd, cd, cd, cd, cd])
    }

    s = 4;
    while (s > 0) {
      this.gameBoard.push(this.blueArr.splice(0, 10));
      s--;
    }
    console.log(this.gameBoard);
  }

  setPos(tcard: Card, x: number, y: number) {
    tcard.x = x;
    tcard.y = y;

    return tcard;
  }

  trClick(row, columns) {
    // console.log(row, columns);
    if (this.gameBoard[row - 1][columns].path == "") {
      console.log("yessss");
      const id: string = String(row - 1) + String(columns);

      // @ts-ignore
      var el = (document.getElementById(id) as HTMLTableRowElement);
      // @ts-ignore
      el.classList.add("options");
      console.log(row, columns);
      this.gameBoard[row-1][columns].path = this.gameBoard[row][columns].path;
      this.gameBoard[row][columns].path = "";
    }
    if (this.gameBoard[row + 1][columns].path == "") {
      console.log("yessss");
    }
    if (this.gameBoard[row][columns - 1].path == "") {
      console.log("yessss");
    }
    if (this.gameBoard[row ][columns + 1].path == "") {
      console.log("yessss");
    }

  }

}
