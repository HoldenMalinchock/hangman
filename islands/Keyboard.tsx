import { alphabet } from "../utils/alphabet.ts";
import { Game } from "../types/Game.ts";
import { Handlers } from "$fresh/server.ts";
const submitGuessLetter = async (
  letter: string,
  gameId: string,
) => {
  await fetch(`/api/guess?guess=${letter}&id=${gameId}`, {
    method: "POST",
  });
};

const KeyboardButtons = (gameId: string) => {
  return (
    <ul>
      {alphabet.map((letter) => (
        <button
          key={letter}
          onClick={() => submitGuessLetter(letter, gameId)}
          class="bg-[#DADADA] text-[#1C1E25] rounded-md p-4 m-2"
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
  return (
    <div>
      {KeyboardButtons(props.gameId)}
    </div>
  );
}
