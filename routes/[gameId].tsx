import { Handlers, PageProps } from "$fresh/server.ts";
import { getGame } from "../utils/db.ts";
import { Game } from "../types/Game.ts";
import Word from "../islands/Word.tsx";
import Keyboard from "../islands/Keyboard.tsx";

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
      <div class="max-w-lg">
        <Keyboard game={data.game} gameId={data.gameId} />
        <Word game={data.game} gameId={data.gameId} />
      </div>
    </div>
  );
}
