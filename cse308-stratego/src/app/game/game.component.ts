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
  private imageMap: Map<number, string> = new Map<number, string>();
  private selectedCard: Card = this.emptyCard(0, 0);


  constructor(private service: ApiService) {
  }


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
      temp = this.setPos(temp, 0, 0);
      temp.color = color;
      temp.value = val;
      temp.path = this.imageMap.get(val);
      if (color == "red")
        this.redArr.push(temp);
      else
        this.blueArr.push(temp);
    }
    // this.shuffleElements(this.redArr);
    this.shuffle(this.redArr);
    this.shuffle(this.blueArr);
    // this.shuffleElements(this.blueArr);
  }

  setupGameBoard() {
    let s = 4;
    let random = Math.floor((Math.random() * 11) + 1);
    while (s > 0) {
      this.gameBoard.push(this.redArr.splice(0, 10));
      s--;
    }

    for (let i = 0; i < 2; i++) {
      let cd = new Card();
      cd.color = "purple";
      cd.value = 0;
      cd.path = "";
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

  setPositions() {
    for (let i = 0; i < this.gameBoard.length; i++) {
      for (let j = 0; j < this.gameBoard[0].length; j++) {
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



  trClick(row, column) {

    console.log("Inside TrClick", this.selectedCard, this.gameBoard[row][column]);

    if (this.gameBoard[row][column].value != 0 && this.selectedCard.value != 0) {
      this.validateMove(row, column);
    } else if (this.gameBoard[row][column].value != 0) {
      this.addGreen(row, column);
      this.selectedCard = this.gameBoard[row][column];
      this.gameBoard[row][column] = this.emptyCard(row, column)
    } else {
      this.removeGreen(this.selectedCard.x, this.selectedCard.y);
      this.gameBoard[row][column] = this.selectedCard;
      this.gameBoard[row][column].x = row;
      this.gameBoard[row][column].y = column;
      this.selectedCard = this.emptyCard(0, 0);

    }

  }

  // validatePosition(row, col){
  //
  //   this.selectedCard
  //
  // }

  validateMove(row, column) {

    let selectedCard = this.selectedCard;

    let cardInHand = this.gameBoard[row][column];
    console.log("in validate move", this.selectedCard, cardInHand);


    // if the position selected is not in one of the four positions then the move is considered to be invalid.
    if((selectedCard.x != row-1 ||  selectedCard.x != row+1) && (selectedCard.y != column+1 || selectedCard.y != column-1))
      return;

    // flag and the bomb isn't moved.
    if(selectedCard.value == 11 || selectedCard.value == 12)
      return;




    if (selectedCard.color != otherCard.color) {

      if (selectedCard.value < otherCard.value && otherCard.value != 11) { // cannot attack if the the other card is a bomb.
        otherCard = selectedCard;
        this.redArr.push(selectedCard);
        this.selectedCard = this.emptyCard(0, 0);
        this.showAttackPossibility(row, column, 0);
      }


      if (true) {
      }
      if (true) {
      }
      if (true) {
      }
      if (true) {
      }
      if (true) {
      }
      if (true) {
      }
      if (true) {
      }


    } else {
      this.gameBoard[this.selectedCard.x][this.selectedCard.y] = this.selectedCard;
      this.removeGreen(this.selectedCard.x, this.selectedCard.y);
      this.selectedCard = this.emptyCard(0, 0);
    }
  }

  showOptions(x, y, yes) {
    const id: string = String(x) + String(y);
    const el = (document.getElementById(id) as HTMLTableRowElement);
    console.log(x, y)

    if (yes)
      el.classList.add("options");

    else
      el.classList.remove("options")
  }

  showAttackPossibility(x, y, yes) {
    const id: string = String(x) + String(y);
    const el = (document.getElementById(id) as HTMLTableRowElement);
    console.log(x, y);

    if (yes)
      el.classList.add("attack_possibility");
    else
      el.classList.remove("attack_possibility");
  }

  addGreen(row, column) {
    let x = 0;
    let y = 0;

    if ((row - 1) >= 0 && this.gameBoard[row - 1][column].path == "") {
      x = row - 1;
      y = column;
      this.showOptions(x, y, 1);
    } else if (this.gameBoard[row - 1][column].color != this.gameBoard[row][column].color) {
      x = row - 1;
      y = column;
      this.showAttackPossibility(x, y, 1);
    }

    if ((row + 1) <= 9 && this.gameBoard[row + 1][column].path == "") {
      x = row + 1;
      y = column;
      this.showOptions(x, y, 1);
    } else if ((row + 1) <= 9 && this.gameBoard[row + 1][column].color != this.gameBoard[row][column].color) {
      x = row + 1;
      y = column;
      this.showAttackPossibility(x, y, 1);
    }

    if ((column - 1) >= 0 && this.gameBoard[row][column - 1].path == "") {
      x = row;
      y = column - 1;
      this.showOptions(x, y, 1);
    } else if ((column - 1) >= 0 && this.gameBoard[row][column - 1].color != this.gameBoard[row][column].color) {
      x = row;
      y = column - 1;
      this.showAttackPossibility(x, y, 1);
    }

    if ((column + 1) <= 9 && this.gameBoard[row][column + 1].path == "") {
      x = row;
      y = column + 1;
      this.showOptions(x, y, 1);
    } else if ((column + 1) <= 9 && this.gameBoard[row][column + 1].color != this.gameBoard[row][column].color) {
      x = row;
      y = column + 1;
      this.showAttackPossibility(x, y, 1);
    }
  }

  removeGreen(row, column) {
    let x = 0;
    let y = 0;

    if ((row - 1) >= 0 && this.gameBoard[row - 1][column].path == "") {
      x = row - 1;
      y = column;
      this.showOptions(x, y, 0);
    } else if ((row - 1) >= 0 && this.gameBoard[row - 1][column].color != this.gameBoard[row][column].color) {
      x = row - 1;
      y = column;
      this.showAttackPossibility(x, y, 0);
    }

    if ((row + 1) <= 9 && this.gameBoard[row + 1][column].path == "") {
      x = row + 1;
      y = column;
      this.showOptions(x, y, 0);
    }else if ((row + 1) <= 9 && this.gameBoard[row + 1][column].color != this.gameBoard[row][column].color) {
      x = row + 1;
      y = column;
      this.showAttackPossibility(x, y, 0);
    }

    if ((column - 1) >= 0 && this.gameBoard[row][column - 1].path == "") {
      x = row;
      y = column - 1;
      this.showOptions(x, y, 0);
    } else if ((column - 1) >= 0 && this.gameBoard[row][column - 1].color != this.gameBoard[row][column].color) {
      x = row;
      y = column - 1;
      this.showAttackPossibility(x, y, 0);
    }

    if ((column + 1) <= 9 && this.gameBoard[row][column + 1].path == "") {
      x = row;
      y = column + 1;
      this.showOptions(x, y, 0);
      this.showAttackPossibility(x, y, 0);
    } else if ((column + 1) <= 9 && this.gameBoard[row][column + 1].color != this.gameBoard[row][column].color) {
      x = row;
      y = column + 1;
      this.showAttackPossibility(x, y, 0);
    }
  }

  shuffle(array: Card[]) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  emptyCard(row, column) {
    let cd = new Card();
    cd.color = "Blank Baba bakchod";
    cd.value = 0;
    cd.path = "";
    cd = this.setPos(cd, row, column);
    return cd;
  }

}


