export class Card {
  color: string;
  value: number;
}

export class Board {
  blocks: Block[];
}

export class Block {
  filled: Card;
}
