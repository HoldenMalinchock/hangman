import { alphabet } from "../utils/alphabet.ts";
import { Game } from "../types/Game.ts";
import { Handlers } from "$fresh/server.ts";
import { useEffect, useState } from "preact/hooks";
import { GUESS_LIMIT } from "../utils/constants.ts";

const submitGuessLetter = async (
  letter: string,
  gameId: string,
) => {
  await fetch(`/api/guess?guess=${letter}&id=${gameId}`, {
    method: "POST",
  });
};

const KeyboardButtons = (game: Game, gameId: string) => {
  // Get the number of wrong guesses
  // If the number of wrong guesses is 6, then disable all buttons
  const wrongGuesses = game.guesses.filter((letter) => {
    return !game.gameWord.toLowerCase().includes(letter.toLowerCase());
  }).length;

  return (
    <ul>
      {alphabet.map((letter) => (
        <button
          key={letter}
          onClick={() => submitGuessLetter(letter, gameId)}
          class="bg-[#DADADA] text-[#1C1E25] rounded-md p-4 m-2 disabled:opacity-50"
          disabled={game.guesses.includes(letter) ||
            wrongGuesses >= GUESS_LIMIT}
        >
          {letter}
        </button>
      ))}
    </ul>
  );
};

export const handler: Handlers = {
  GET(_, ctx) {
    return ctx.render();
  },
};

// We are going to need props of what keys we are going to need to disable
export default function Keyboard(props: { game: Game; gameId: string }) {
  const [game, setGame] = useState(props.game);
  useEffect(() => {
    const eventSource = new EventSource(
      `/api/alert?id=${props.gameId}`,
    );
    eventSource.onmessage = (e) => {
      const updatedGame = JSON.parse(e.data).updatedGame;
      setGame(updatedGame);
    };
    return () => eventSource.close();
  }, [props.game]);
  return (
    <div>
      {KeyboardButtons(game, props.gameId)}
    </div>
  );
}
