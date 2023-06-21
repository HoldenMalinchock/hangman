import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET(req, ctx) {
    const url = new URL(req.url);
    const hangmanWord = url.searchParams.get("q") || "";

    if (hangmanWord) {
      // WE might need to do our logic here for the game system, so we need to create a game ID store it and then path to that game
      // Should it be a form?
      return new Response("", {
        status: 307,
        headers: { Location: `/${hangmanWord}` },
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
