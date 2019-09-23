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

// 1 Marshall 2 General 3 Colonel 4 Major 5 Captain 6 Lieutenant 7 Seargant 8 Miner 9Scout 10 Spy 11 Bomb 12 Flag
// [1         ,1,       2,          3,     4,           4,          4,        5,      8,      1,      6,      1]
