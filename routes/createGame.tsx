import { Handlers } from "$fresh/server.ts";
import { createNewGame } from "../utils/db.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const hangmanWord = url.searchParams.get("q") || "";

    if (hangmanWord) {
      // If the user inputs a word we need to first create a game name and store it in deno KV
      const gameId = crypto.randomUUID();
      await createNewGame(gameId, hangmanWord);
      return new Response("", {
        status: 307,
        headers: { Location: `/${gameId}` },
      });
    } else {
      return ctx.render();
    }
  },
};

export default function CreateGame() {
  const hangmanWord = "";
  return (
    <div class="w-full h-screen flex flex-col items-center justify-center font-mono bg-[#1C1E25]">
      <form>
        <input
          type="text"
          name="q"
          value={hangmanWord}
          placeholder="Hangman Name"
          class="rounded-lg p-1 mr-2"
        />
        <button class="m-2" type="submit" disabled={false}>Search</button>
      </form>
    </div>
  );
}
