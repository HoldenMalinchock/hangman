import { Handlers } from "$fresh/server.ts";
import { getGame, submitGuess } from "../../utils/db.ts";

export const handler: Handlers = {
  async POST(req) {
    const url = new URL(req.url);
    const guess = url.searchParams.get("guess");
    const gameId = url.searchParams.get("id") || "";
    if (!gameId) {
      return new Response("Missing id", {
        status: 400,
      });
    }

    if (!guess) {
      return new Response("Missing guess", {
        status: 400,
      });
    }
    const game = await getGame(gameId);
    if (!game) {
      return new Response("Game not found", {
        status: 400,
      });
    }

    if (game.guesses.includes(guess)) {
      return new Response("Already guessed", {
        status: 400,
      });
    }
    const submit = await submitGuess(gameId, guess);

    return new Response(JSON.stringify(guess), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  },
};
