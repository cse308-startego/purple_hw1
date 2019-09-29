export class Card {
  get path(): string {
    return this._path;
  }

  set path(value: string) {
    this._path = value;
  }
  color: string;
  value: number;
  private _path: string;
  x: number;
  y: number;

}


export class Board {
  board: Card[][];
}

export class Block {
  filled: Card;
}
