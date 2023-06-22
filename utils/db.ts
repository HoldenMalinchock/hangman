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
