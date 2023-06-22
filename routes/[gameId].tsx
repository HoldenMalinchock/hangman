import { Handlers, PageProps } from "$fresh/server.ts";
import { getGame } from "../utils/db.ts";
import { Game } from "../types/Game.ts";

export const handler: Handlers = {
  async GET(_, ctx) {
    const { gameId } = ctx.params;
    const game = await getGame(gameId);
    return ctx.render({ gameId, game });
  },
};

export default function Game(
  { data }: PageProps<{ gameId: string; game: Game }>,
) {
  return (
    <div class="w-full h-screen flex flex-col items-center bg-[#1C1E25] text-[#DADADA] font-mono">
      <div>Game ID: {data.gameId}</div>
      <div>Game Word: {data.game.gameWord}</div>
      <div>Game Status: {data.game.guesses}</div>
    </div>
  );
}
