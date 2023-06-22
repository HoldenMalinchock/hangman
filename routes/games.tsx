import { Handlers, PageProps } from "$fresh/server.ts";
import { getGames } from "../utils/db.ts";
import { Game } from "../types/Game.ts";

export const handler: Handlers = {
  async GET(_, ctx) {
    const games = await getGames();
    return ctx.render({ games });
  },
};

export default function Games(
  { data }: PageProps<{ games: any }>,
) {
  const t = "c52f32e5-2ca2-41e6-8f09-91a41fadb542";
  return (
    <div class="w-full h-screen flex flex-col items-center bg-[#1C1E25] text-[#DADADA] font-mono">
      <div>
        Games:
        {data.games.map((gameItem: any) => <div>{gameItem.value.gameWord}
        </div>)}
      </div>
    </div>
  );
}
