export interface Game {
  guesses: string[];
  gameWord: string;
  // solved: boolean; // Could be interesting if we were to implement a view for solved games like a look back at the game
}
