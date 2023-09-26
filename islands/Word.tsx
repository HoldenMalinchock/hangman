import { Game } from "../types/Game.ts";
import { useEffect, useState } from "preact/hooks";

const word = (game: Game) => {
  const capGuess = game.guesses.map((letter) => letter.toUpperCase());
  return (
    <ul>
      {game.gameWord.split("").map((letter) => (
        <div class="bg-[#DADADA] text-[#1C1E25] rounded-md m-2 inline-flex p-2">
          {capGuess.includes(letter.toUpperCase()) ? letter.toUpperCase() : "_"}
        </div>
      ))}
    </ul>
  );
};

export default function Word(props: { game: Game; gameId: string }) {
  const [game, setGame] = useState(props.game);
  useEffect(() => {
    const eventSource = new EventSource(
      `/api/alert?id=${props.gameId}`,
    );
    eventSource.onmessage = (e) => {
      const updatedGame = JSON.parse(e.data.updatedGame);
      setGame(updatedGame);
    };
    return () => eventSource.close();
  }, [props.game]);

  return (
    <div>
      {word(game)}
    </div>
  );
}
