import {Component, OnInit} from '@angular/core';
import {Block, Board, Card} from './game-models';
import {ApiService} from '../service/api.service';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  selector: 'game-page',
  templateUrl: 'game.component.html',
  styleUrls: ['game.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('1s ease-out', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ]))]), {optional: true})
      ])
    ])

  ]

})
export class GameComponent implements OnInit {
  columns: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  rows: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  public scoreRed:number =0;
  public  scoreBlue: number=0;

  private gameBoard: Card[][] = [];
  private redArr: Card[] = [];
  private blueArr: Card[] = [];
  private imageMapred: Map<number, string> = new Map<number, string>();
  private imageMapblue: Map<number, string> = new Map<number, string>();
  private imagelake: Map<number, string> = new Map<number, string>();
  private imageMap: Map<number, string> = new Map<number, string>();
  private selectedCard: Card = this.emptyCard(0, 0);

  public turn : boolean = false; //false = AI true = Player


  constructor(private service: ApiService) {
  }


  ngOnInit() {
    this.populateImageMap();
    this.populateImageMap_red();
    this.populateImagelake();
    this.initializeCards();
    this.setupGameBoard();
    this.setPositions();
    console.log(this.gameBoard);
    this.updateAIBoard();
    console.log(this.AIBoard);




    let board = new Board();
    board.board = this.gameBoard;
    //
    // this.service.arrayManipulation(board).subscribe((data: string) => {
    //   console.log(data)
    // });


  }
  startgame() {this.AIGameplay();}


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

      this.imageMapblue.set(i, basePath + name)
    }
  }

  populateImageMap_red() {

    let basePath = "../assets/";

    for (let i = 1; i <= 12; i++) {
      let name = "";
      if (i == 1)
        name = "redmarshal.png";
      else if (i == 2)
        name = "redgeneral.png";
      else if (i == 3)
        name = "redcolonel.png";
      else if (i == 4)
        name = "redmajor.png";
      else if (i == 5)
        name = "redcaptain.png";
      else if (i == 6)
        name = "redlieutenant.png";
      else if (i == 7)
        name = "redsergeant.png";
      else if (i == 8)
        name = "redminer.png";
      else if (i == 9)
        name = "redscout.png";
      else if (i == 10)
        name = "redspy.png";
      else if (i == 11)
        name = "redbomb.png";
      else if (i == 12)
        name = "redflag.png";

      this.imageMapred.set(i, basePath + name)
    }
  }

  populateImagelake() {

    let basePath = "../assets/";

    for (let i = 1; i <= 4; i++) {
      let name = "";
      if (i == 1)
        name = "1.png";
      else if (i == 2)
        name = "2.png";
      else if (i == 3)
        name = "3.png";
      else if (i == 4)
        name = "4.png";

      this.imagelake.set(i, basePath + name)
    }
  }

  initializeCards() {

    this.initializePlayers("red");
    this.initializePlayers("Blue");

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

        if (color == "red") {
          card.path =  "../assets/emptylaal.png";// this.imageMapred.get(i);
          this.redArr.push(card);
        }else {
          card.path = this.imageMapblue.get(i);
          this.blueArr.push(card);
        }
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
      if (color == "red") {
        temp.path =  "../assets/emptylaal.png"; //this.imageMapred.get(val);
        this.redArr.push(temp);
      } else {
        temp.path = this.imageMapblue.get(val);
        this.blueArr.push(temp);
      }
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

    let lake = new Array<Card>(4);

    for (let k = 1; k < 5; k++) {
      lake[k] = new Card();
      lake[k].color = "empty card, no color.";
      lake[k].value = -4;
      lake[k].path = "../assets/" + k + ".png";
      lake[k] = this.setPos(lake[k], 0, 0);
    }

    for (let i = 0; i < 2; i++) {
      let cd = new Card();
      cd.color = "empty card, no color.";
      cd.value = 0;
      cd.path = "../assets/grass.png";
      cd = this.setPos(cd, 0, 0);
      if (i == 0) {
        // @ts-ignore
        const temp = [cd, cd, lake[1], lake[2], cd, cd, lake[1], lake[2], cd, cd];
        this.gameBoard.push(temp);

      } else {
        // @ts-ignore
        const temp = [cd, cd, lake[3], lake[4], cd, cd, lake[3], lake[4], cd, cd];
        this.gameBoard.push(temp);

      }

    }

    s = 4;
    while (s > 0) {
      this.gameBoard.push(this.blueArr.splice(0, 10));
      s--;
    }
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


  // gamePlay() {
  //   while (1) {
  //     let move: number = 1;
  //     if (move) {
  //       this.updateAIBoard();
  //       this.AIGameplay();
  //     }
  //
  //   }
  // }

  private movablesArr: Card[] = [];
  private inDangerMap: Map<Card, Card[]> = new Map<Card, Card[]>();
  private canKillMap: Map<Card, Card[]> = new Map<Card, Card[]>();
  private randomKillMap: Map<Card, Card[]> = new Map<Card, Card[]>();

  private AIBoard: Card[][] = [];

  AIGameplay() {
    this.checkNeighbors();
  }

  updateAIBoard() {
    this.AIBoard = [];
    for (let i = 0; i < this.gameBoard.length; i++) {
      let arr = [];
      for (let j = 0; j < this.gameBoard[0].length; j++) {
        if (this.gameBoard[i][j].color == 'red') {
          arr.push(this.gameBoard[i][j]);
        } else if(this.gameBoard[i][j].color == 'Blue') {
          if(this.gameBoard[i][j].revealedToAI == true) {
            arr.push(this.gameBoard[i][j]);
          }
          else {
            let crd = this.emptyCard(i, j);
            crd.color = 'Blue';
            crd.value = -1;
            arr.push(crd);
          }
        }
        else if(this.gameBoard[i][j].value == -4) {
          arr.push(this.gameBoard[i][j]);
        }
        else{
          arr.push(this.emptyCard(i, j));
        }
      }
      this.AIBoard.push(arr);
    }
    //console.log(this.AIBoard);
  }

  checkNeighbors() {
    this.movablesArr = [];
    this.inDangerMap = new Map<Card, Card[]>();
    this.canKillMap = new Map<Card, Card[]>();
    this.randomKillMap = new Map<Card, Card[]>();

    let inDangerArr : Card[]= [];
    let canKillArr : Card[]= [];
    let randomKillArr : Card[]= [];

    for (let i = 0; i < this.AIBoard.length; i++) {
      for (let j = 0; j < this.AIBoard[i].length; j++) {
        randomKillArr = [];
        canKillArr = [];
        inDangerArr = [];
        if (this.AIBoard[i][j].color == 'red' && this.AIBoard[i][j].value > 0 && this.AIBoard[i][j].value <=10) {
          let x = 0;
          let y = 0;
          if ((i - 1) >= 0 && this.AIBoard[i - 1][j].value == 0) {
            this.movablesArr.push(this.AIBoard[i][j]);
          } else if ((i + 1) <= 9 && this.AIBoard[i + 1][j].value == 0) {
            this.movablesArr.push(this.AIBoard[i][j]);
          } else if ((j - 1) >= 0 && this.AIBoard[i][j - 1].value == 0) {
            this.movablesArr.push(this.AIBoard[i][j]);
          } else if ((j + 1) <= 9 && this.AIBoard[i][j + 1].value == 0) {
            this.movablesArr.push(this.AIBoard[i][j]);
          }

          if ((i - 1) >= 0 && this.AIBoard[i - 1][j].value == -1) {
            randomKillArr.push(this.AIBoard[i - 1][j]);
          }
          if ((i + 1) <= 9 && this.AIBoard[i + 1][j].value == -1) {
            randomKillArr.push(this.AIBoard[i + 1][j]);
          }
          if ((j - 1) >= 0 && this.AIBoard[i][j - 1].value == -1) {
            randomKillArr.push(this.AIBoard[i][j - 1]);
          }
          if ((j + 1) <= 9 && this.AIBoard[i][j + 1].value == -1) {
            randomKillArr.push(this.AIBoard[i][j + 1]);
          }

          if ((i - 1) >= 0 && this.AIBoard[i - 1][j].value != -1 && this.AIBoard[i - 1][j].value != 0 && this.AIBoard[i - 1][j].color == 'Blue') {
            if(this.AIBoard[i - 1][j].value > this.AIBoard[i][j].value) {
              canKillArr.push(this.AIBoard[i - 1][j]);
            }
            else {
              inDangerArr.push(this.AIBoard[i - 1][j]);
            }
          }
          if ((i + 1) <= 9 && this.AIBoard[i + 1][j].value != -1 && this.AIBoard[i + 1][j].value != 0 && this.AIBoard[i + 1][j].color == 'Blue') {
            if(this.AIBoard[i + 1][j].value > this.AIBoard[i][j].value) {
              canKillArr.push(this.AIBoard[i + 1][j]);
            }
            else {
              inDangerArr.push(this.AIBoard[i + 1][j]);
            }
          }
          if ((j - 1) >= 0 && this.AIBoard[i][j - 1].value != -1 && this.AIBoard[i][j - 1].value != 0 && this.AIBoard[i][j - 1].color == 'Blue') {
            if(this.AIBoard[i][j - 1].value > this.AIBoard[i][j].value) {
              canKillArr.push(this.AIBoard[i][j - 1]);
            }
            else {
              inDangerArr.push(this.AIBoard[i][j - 1]);
            }
          }
          if ((j + 1) <= 9 && this.AIBoard[i][j + 1].value != -1 && this.AIBoard[i][j + 1].value != 0 && this.AIBoard[i][j + 1].color == 'Blue') {
            if(this.AIBoard[i][j + 1].value > this.AIBoard[i][j].value) {
              canKillArr.push(this.AIBoard[i][j + 1]);

            }
            else {
              inDangerArr.push(this.AIBoard[i][j + 1]);
            }
          }
          if(randomKillArr.length > 0)
            this.randomKillMap.set(this.AIBoard[i][j], randomKillArr);
          if(canKillArr.length > 0)
            this.canKillMap.set(this.AIBoard[i][j], canKillArr);
          if(inDangerArr.length > 0)
            this.inDangerMap.set(this.AIBoard[i][j], inDangerArr);
        }
      }
    }
    this.AIMove();
    //console.log("Movable Array",this.movablesArr);
    //console.log("Kill Map",this.canKillMap);
    //console.log("RandomKill map ", this.randomKillMap);
    console.log("Danger Map", this.inDangerMap);
    console.log("Gameboard Array", this.gameBoard);
    console.log("AI Board Array", this.AIBoard);
    return;
  }

  AIMove() {
    if(this.canKillMap.size > 0)
      this.killKnown();
    else if(this.inDangerMap.size > 0)
      this.defendPlayer();
    else if(this.randomKillMap.size > 0) {
      this.killRandom();
    }
    else if(this.movablesArr.length > 0)
      this.moveHighest();
    return;
  }

  killKnown() {
    if(this.canKillMap.size > 0) {
      //KILL
      var value : Card[]= [];
      let bestKill : Card = this.emptyCard(0,0);
      bestKill.value = 10000;

      let selectCard : Card;
      let killedCard : Card;

      let arr : IterableIterator<Card> = this.canKillMap.keys();
      for(let key of arr) {
        value = this.canKillMap.get(key);
        for(let i = 0; i < value.length; i++) {
          if(value[i].value < bestKill.value) {
            selectCard = key;
            killedCard = value[i];
            bestKill = value[i];
          }
        }
      }
      this.AIBoard[selectCard.x][selectCard.y] = this.emptyCard(selectCard.x, selectCard.y);
      this.gameBoard[selectCard.x][selectCard.y] = this.emptyCard(selectCard.x, selectCard.y);
      selectCard.x = killedCard.x;
      selectCard.y = killedCard.y;

      this.AIBoard[killedCard.x][killedCard.y] = selectCard;
      this.gameBoard[killedCard.x][killedCard.y] = selectCard;
    }
    this.turn = true;
    return;
  }

  defendPlayer() {
    if(this.inDangerMap.size > 0) {
      //Move AWAY
      let expensivePlayer : Card = this.emptyCard(0, 0);
      expensivePlayer.value = 10000;
      let arr : IterableIterator<Card> = this.inDangerMap.keys();
      for(let key of arr) {
        if((key.value < expensivePlayer.value && this.isMovable(key)) || (key.value < expensivePlayer.value && this.randomKillMap.has(key))) {
          expensivePlayer = key;
        }
      }
      if(this.isMovable(expensivePlayer)){
        console.log("EXPENSIVE PLAYER", expensivePlayer);
        let move = this.checkAvailablePos(expensivePlayer);
        let x = expensivePlayer.x;
        let y = expensivePlayer.y;
        console.log("x", x);
        console.log("y", y);
        if(move == 0) {
          this.AIBoard[x][y] = this.emptyCard(expensivePlayer.x, expensivePlayer.y);
          this.gameBoard[x][y] = this.emptyCard(expensivePlayer.x, expensivePlayer.y);
          this.AIBoard[x - 1][y] = expensivePlayer;
          this.gameBoard[x - 1][y] = expensivePlayer;
          this.AIBoard[x - 1][y].x = expensivePlayer.x - 1;
          this.AIBoard[x - 1][y].y = expensivePlayer.y;
        }
        else if(move == 1) {
          this.AIBoard[x][y] = this.emptyCard(expensivePlayer.x, expensivePlayer.y);
          this.gameBoard[x][y] = this.emptyCard(expensivePlayer.x, expensivePlayer.y);
          this.AIBoard[x + 1][y] = expensivePlayer;
          this.gameBoard[x + 1][y] = expensivePlayer;
          this.AIBoard[x + 1][y].x = expensivePlayer.x + 1;
          this.AIBoard[x + 1][y].y = expensivePlayer.y;
        }
        else if(move == 2) {
          this.AIBoard[x][y] = this.emptyCard(expensivePlayer.x, expensivePlayer.y);
          this.gameBoard[x][y] = this.emptyCard(expensivePlayer.x, expensivePlayer.y);
          this.AIBoard[x][y - 1] = expensivePlayer;
          this.gameBoard[x][y - 1] = expensivePlayer;
          this.AIBoard[x][y].x = expensivePlayer.x;
          this.AIBoard[x][y - 1].y = expensivePlayer.y - 1;
        }
        else if(move == 3) {
          this.AIBoard[x][y] = this.emptyCard(expensivePlayer.x, expensivePlayer.y);
          this.gameBoard[x][y] = this.emptyCard(expensivePlayer.x, expensivePlayer.y);
          this.AIBoard[x][y + 1] = expensivePlayer;
          this.gameBoard[x][y + 1] = expensivePlayer;
          this.AIBoard[x][y + 1].x = expensivePlayer.x;
          this.AIBoard[x][y + 1].y = expensivePlayer.y + 1;
        }
      }
      else{
        this.killRandom();
      }
    }
    this.turn = true;
    return;
  }



  killRandom() {
    if(this.randomKillMap.size > 0) {
      //KILL RANDOMLY BY HIGHEST RANK PLAYER
      let suicider : Card = this.emptyCard(0, 0);
      let dier : Card;
      let arr : IterableIterator<Card> = this.randomKillMap.keys();
      for(let key of arr) {
        if(key.value > suicider.value && key.value > 0 && key.value <= 10) {
          suicider = key;
        }
      }
      dier = this.randomKillMap.get(suicider)[0];
      this.trClick(suicider.x, suicider.y);
      this.sleep(700);
      this.trClick(dier.x, dier.y)
    }
    return;

  }

  sleep(miliseconds) {
    var currentTime = new Date().getTime();

    while (currentTime + miliseconds >= new Date().getTime()) {
    }
  }

  moveHighest() {
    if(this.movablesArr.length > 0) {
      //JUST MOVE
      let mover : Card = this.emptyCard(0, 0);
      for(let i = 0; i < this.movablesArr.length; i++) {
        if((mover.value < this.movablesArr[i].value) && !(this.movablesArr[i].y < mover.y)) {
          mover = this.movablesArr[i];
        }
      }
      let move = this.moveRandom(mover);

      if(move == 0) {
        this.trClick(mover.x, mover.y);
        this.sleep(700);
        this.trClick(mover.x - 1, mover.y);
      }else if(move == 1) {
        this.trClick(mover.x, mover.y);
        this.sleep(700);
        this.trClick(mover.x + 1, mover.y);
      }else if(move == 2) {
        this.trClick(mover.x, mover.y);
        this.sleep(700);
        this.trClick(mover.x, mover.y - 1);
      }else if(move == 3) {
        this.trClick(mover.x, mover.y);
        this.sleep(700);
        this.trClick(mover.x, mover.y + 1);
      }
    }
    return;
  }

  checkAvailablePos(player: Card) {
    let i: number = player.x;
    let j: number = player.y;


    if ((i - 1) >= 0 && this.AIBoard[i - 1][j].value == 0) {
      return 0;
    }
    else if ((i + 1) <= 9 && this.AIBoard[i + 1][j].value == 0) {
      return 1;
    }
    else if ((j - 1) >= 0 && this.AIBoard[i][j - 1].value == 0) {
      return 2;
    }
    else if ((j + 1) <= 9 && this.AIBoard[i][j + 1].value == 0) {
      return 3;
    }
    else {
      return -1;
    }
  }

  moveRandom(player : Card) {
    let i: number = player.x;
    let j: number = player.y;


    if ((i + 1) <= 9 && this.AIBoard[i + 1][j].value == 0) {
      return 1;
    }
    else if ((j - 1) >= 0 && this.AIBoard[i][j - 1].value == 0) {
      return 2;
    }
    else if ((j + 1) <= 9 && this.AIBoard[i][j + 1].value == 0) {
      return 3;
    }
    else if ((i - 1) >= 0 && this.AIBoard[i - 1][j].value == 0) {
      return 0;
    }
    else {
      return -1;
    }
  }

  isMovable(card : Card) {
    let contains = false;
    for(let i = 0; i < this.movablesArr.length; i++) {
      if(this.movablesArr[i] == card) {
        contains = true;
        break;
      }
    }
    return contains;
  }

  trClick(row, column) {

    // if(this.gameBoard[row][column].color == 'red' && this.selectedCard.value == 0) {
    //   return;
    // }

    // creating the unplayable areas.
    if (row == 4 || row == 5)
      if (column == 2 || column == 3 || column == 6 || column == 7)
        return;


    // this is where the attacks on the other cards happen.
    if (this.gameBoard[row][column].value != 0 && this.selectedCard.value != 0) {
      if(this.validatePosition(row, column) == true) {
        this.validateMove(row, column);
      }
    } else if (this.gameBoard[row][column].value != 0) {         // this is where the control comes just before attacking some card or moving (basically when you select a card).
      //console.log('Inside TrClick, else if part', this.selectedCard, this.gameBoard[row][column]);
      console.log(this.gameBoard[row][column]);
      this.addGreen(row, column);
      this.selectedCard = this.gameBoard[row][column];
      this.gameBoard[row][column] = this.emptyCard(row, column);
    }

    // this else part deals with moving the card to another empty space.
    else {
      //console.log('Inside TrClick, else part', this.selectedCard, this.gameBoard[row][column]);
      if (this.validatePosition(row, column) == true) {
        this.removeGreen(this.selectedCard.x, this.selectedCard.y);
        this.gameBoard[row][column] = this.selectedCard;
        this.gameBoard[row][column] = this.setPos(this.gameBoard[row][column],row,column);
        this.selectedCard = this.emptyCard(0, 0);
        if(this.turn == false) {
          this.turn = true;
        }
        else{
          this.turn = false;
        }
        if(this.turn == false) {
          this.updateAIBoard();
          this.AIGameplay();
        }
      }

    }
  }


  validatePosition(row, col) {
    if ((((row + 1) == this.selectedCard.x || (row - 1) == this.selectedCard.x) && col == this.selectedCard.y)
      || (((col + 1) == this.selectedCard.y || (col - 1) == this.selectedCard.y) && row == this.selectedCard.x)) {
      return true;
    }

    //console.log("Card can only move one block away");
    return false;
  }

  validateMove(row, column) {
    //console.log("in validate move", this.selectedCard, this.gameBoard[row][column]);

    let specialMove = false;
    if (this.selectedCard.color != this.gameBoard[row][column].color) { //if it is a player of different color

      // game end logic.
      this.specialMoves(row, column);

      // if the selected card is a bomb and the current card isnt a miner then current card dies.
      if (this.gameBoard[row][column].value == 11 && this.selectedCard.value != 0) {
        if (this.selectedCard.value != 8) {
          //console.log("inside the non miner if");
          this.removeGreen(this.selectedCard.x, this.selectedCard.y);
          this.selectedCard = this.emptyCard(0, 0);
          if (this.gameBoard[row][column].color == 'Blue') {
            this.gameBoard[row][column].revealedToAI = true;
          }
          if (this.gameBoard[row][column].color == 'red') {
            this.gameBoard[row][column].path = this.imageMapred.get(this.gameBoard[row][column].value);
          }
          if (this.turn == false) {
            this.turn = true;
          } else {
            this.turn = false;
          }
        } else {
          //console.log("inside the non miner else");
          this.removeGreen(this.selectedCard.x, this.selectedCard.y);
          this.gameBoard[row][column] = this.selectedCard;
          this.gameBoard[row][column] = this.setPos(this.gameBoard[row][column], row, column);
          this.selectedCard = this.emptyCard(0, 0);
          if (this.gameBoard[row][column].color == 'Blue') {
            this.gameBoard[row][column].revealedToAI = true;
          }
          if (this.gameBoard[row][column].color == 'red') {
            this.gameBoard[row][column].path = this.imageMapred.get(this.gameBoard[row][column].value);
          }
          if (this.turn == false) {
            this.turn = true;
          } else {
            this.turn = false;
          }
        }
        specialMove = true;
      }

      if (specialMove == false) {
        if (this.selectedCard.value < this.gameBoard[row][column].value) {            // MARSHALL 1 can KILL Scout 9
          //console.log("in validate move, if", this.selectedCard, this.gameBoard[row][column]);
          this.scoreBlue++;                   // MARSHALL 1 can KILL Scout 9
          this.removeGreen(this.selectedCard.x, this.selectedCard.y);
          this.gameBoard[row][column] = this.selectedCard;
          this.gameBoard[row][column] = this.setPos(this.gameBoard[row][column], row, column);
          this.selectedCard = this.emptyCard(0, 0);
          if (this.turn == false) {
            this.turn = true;
          } else {
            this.turn = false;
          }
        } else if (this.selectedCard.value == this.gameBoard[row][column].value) {    // if the card values are equal destroy both.
          //console.log('in validate move, else if', this.selectedCard, this.gameBoard[row][column]);
          this.scoreRed++;
          this.scoreBlue++;
          this.removeGreen(this.selectedCard.x, this.selectedCard.y);
          this.selectedCard = this.emptyCard(0, 0);
          this.gameBoard[row][column] = this.emptyCard(row, column);
          if (this.turn == false) {
            this.turn = true;
          } else {
            this.turn = false;
          }
        } else { //VALUE IS GREATER SO SELECT CARD DIES
          //console.log('in validate move, else', this.selectedCard, this.gameBoard[row][column]);
          if (this.gameBoard[row][column].color == 'Blue') {
            this.gameBoard[row][column].revealedToAI = true;
          }
          if (this.gameBoard[row][column].color == 'red') {
            this.gameBoard[row][column].path = this.imageMapred.get(this.gameBoard[row][column].value);
          }
          this.removeGreen(this.selectedCard.x, this.selectedCard.y);
          this.selectedCard = this.emptyCard(0, 0);
          this.scoreRed++;

          if (this.turn == false) {
            this.turn = true;
          } else {
            this.turn = false;
          }
        }
      }
    }else {
        this.gameBoard[this.selectedCard.x][this.selectedCard.y] = this.selectedCard;
        this.removeGreen(this.selectedCard.x, this.selectedCard.y);
        this.selectedCard = this.emptyCard(0, 0);
      }
    if(this.turn == false) {
      this.updateAIBoard();
      this.AIGameplay();
    }
    }


  specialMoves(row, column){

    // if the opponent captures the opponents flag.
    if (this.gameBoard[row][column].value == 12) {
      this.removeGreen(this.selectedCard.x, this.selectedCard.y);
      this.gameBoard[row][column] = this.selectedCard;
      this.gameBoard[row][column] = this.setPos(this.gameBoard[row][column], row, column);
      this.selectedCard = this.emptyCard(0, 0);
      alert("" + this.gameBoard[row][column].color + ", you won!");
      document.location.reload();
    }

  }

  showOptions(x, y, yes) {

    if (x == 4 || x == 5)
      if (y == 2 || y == 3 || y == 6 || y == 7)
        return;

    console.log(x, y);
    const id: string = String(x) + String(y);
    const el = (document.getElementById(id) as HTMLTableRowElement);
    console.log(x, y);

    if (yes)
      el.classList.add("options");

    else
      el.classList.remove("options")
  }

  showAttackPossibility(x, y, yes) {
    const id: string = String(x) + String(y);
    const el = (document.getElementById(id) as HTMLTableRowElement);
    //console.log(x, y);

    if (yes)
      el.classList.add("attack_possibility");
    else
      el.classList.remove("attack_possibility");
  }

  addGreen(row, column) {
    let x = 0;
    let y = 0;

    if ((row - 1) >= 0 && this.gameBoard[row - 1][column].value == 0) {
      x = row - 1;
      y = column;
      this.showOptions(x, y, 1);
    } else if ((row - 1) >= 0 && this.gameBoard[row - 1][column].color != this.gameBoard[row][column].color && this.gameBoard[row - 1][column].value != -4) {
      x = row - 1;
      y = column;
      this.showAttackPossibility(x, y, 1);
    }

    if ((row + 1) <= 9 && this.gameBoard[row + 1][column].value == 0) {
      x = row + 1;
      y = column;
      this.showOptions(x, y, 1);
    } else if ((row + 1) <= 9 && this.gameBoard[row + 1][column].color != this.gameBoard[row][column].color && this.gameBoard[row + 1][column].value != -4) {
      x = row + 1;
      y = column;
      this.showAttackPossibility(x, y, 1);
    }

    if ((column - 1) >= 0 && this.gameBoard[row][column - 1].value == 0) {
      x = row;
      y = column - 1;
      this.showOptions(x, y, 1);
    } else if ((column - 1) >= 0 && this.gameBoard[row][column - 1].color != this.gameBoard[row][column].color && this.gameBoard[row][column-1].value != -4) {
      x = row;
      y = column - 1;
      this.showAttackPossibility(x, y, 1);
    }

    if ((column + 1) <= 9 && this.gameBoard[row][column + 1].value == 0) {
      x = row;
      y = column + 1;
      this.showOptions(x, y, 1);
    } else if ((column + 1) <= 9 && this.gameBoard[row][column + 1].color != this.gameBoard[row][column].color && this.gameBoard[row][column+1].value != -4) {
      x = row;
      y = column + 1;
      this.showAttackPossibility(x, y, 1);
    }
  }

  removeGreen(row, column) {
    let x = 0;
    let y = 0;

    if ((row - 1) >= 0 && this.gameBoard[row - 1][column].value == 0) {
      x = row - 1;
      y = column;
      this.showOptions(x, y, 0);
    } else if ((row - 1) >= 0 && this.gameBoard[row - 1][column].color != this.gameBoard[row][column].color) {
      x = row - 1;
      y = column;
      this.showAttackPossibility(x, y, 0);
    }

    if ((row + 1) <= 9 && this.gameBoard[row + 1][column].value == 0) {
      x = row + 1;
      y = column;
      this.showOptions(x, y, 0);
    } else if ((row + 1) <= 9 && this.gameBoard[row + 1][column].color != this.gameBoard[row][column].color) {
      x = row + 1;
      y = column;
      this.showAttackPossibility(x, y, 0);
    }

    if ((column - 1) >= 0 && this.gameBoard[row][column - 1].value == 0) {
      x = row;
      y = column - 1;
      this.showOptions(x, y, 0);
    } else if ((column - 1) >= 0 && this.gameBoard[row][column - 1].color != this.gameBoard[row][column].color) {
      x = row;
      y = column - 1;
      this.showAttackPossibility(x, y, 0);
    }

    if ((column + 1) <= 9 && this.gameBoard[row][column + 1].value == 0) {
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
    cd.color = "Blank card";
    cd.value = 0;
    cd.path = "../assets/grass.png";
    cd = this.setPos(cd, row, column);
    return cd;
  }

  hide() {
    let i = 0;
    for (i = 0; i < 10; i++) {
      const id: string = String(0) + String(i);

      const el = (document.getElementById(id) as HTMLTableRowElement);

      el.classList.add("displayNone");
    }
  }

  unhide() {

    let i = 0;
    for (i = 0; i < 10; i++) {
      const id: string = String(0) + String(i);

      const el = (document.getElementById(id) as HTMLTableRowElement);

      el.classList.remove("displayNone");
    }
  }

  setimage() {

    this.gameBoard[4][2].path = this.imagelake.get(1);
    this.gameBoard[4][3].path = this.imagelake.get(2);
    this.gameBoard[5][2].path = this.imagelake.get(3);
    this.gameBoard[5][3].path = this.imagelake.get(4);

  }


}


// private selectedCard: Card = new Card();
//
// trClick(row, column) {
//   if(this.gameBoard[row][column].value != 0) {
//     this.selectedCard = this.gameBoard[row][column];
//     this.gameBoard[row][column] = new Card();
//     this.emptyCard(this.gameBoard[row][column], row, column)
//   }
//   else {
//     this.gameBoard[row][column] = this.selectedCard;
//     this.selectedCard = new Card();
//   }
// }
//

