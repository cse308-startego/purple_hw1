export class Card {
  color: string;
  value: number;
  path: string;
  x: number;
  y: number;

}


export class Board {
  board: Card[][];
}

export class Block {
  filled: Card;
}
