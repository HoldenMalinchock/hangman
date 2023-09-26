import { Game } from "../types/Game.ts";

const kv = await Deno.openKv();

export async function createNewGame(gameId: string, gameWord: string) {
  const res = await kv.set(["game", gameId], {
    gameWord: gameWord,
    guesses: [],
  });
  return res.ok;
}

export async function getGame(gameId: string): Promise<Game | null> {
  const res = await kv.get<Game>(["game", gameId]);
  return res.value;
}

export async function getGames() {
  const riter = await kv.list({ prefix: ["game"] });
  const games = [];
  for await (const res of riter) games.push(res);
  return games;
}

export async function submitGuess(
  gameId: string,
  guess: string,
) {
  const currentGame = await getGame(gameId);
  const res = await kv.set(["game", gameId], {
    gameWord: currentGame?.gameWord,
    guesses: currentGame?.guesses.concat(guess) || [],
  });
  if (res.ok) {
    const updatedGame = await getGame(gameId);
    const bc1 = new BroadcastChannel(`game/${gameId}`);
    bc1.postMessage({ updatedGame, gameId });
    return res;
  }
}

export function subscribeGame(
  gameId: string,
  cb: (game: Game) => void,
): () => void {
  const bc = new BroadcastChannel(`game/${gameId}`);
  bc.onmessage = (ev) => {
    cb(ev.data);
  };
  return () => {
    bc.close();
  };
}
