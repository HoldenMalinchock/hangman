import { Game } from "../types/Game.ts";
import { useEffect } from "preact/hooks";

const word = (game: Game) => {
  const capGuess = game.guesses.map((letter) => letter.toUpperCase());
  return (
    <ul>
      {game.gameWord.split("").map((letter) => (
        <div class="bg-[#DADADA] text-[#1C1E25] rounded-md m-2 inline-flex p-2">
          {letter in capGuess ? letter.toUpperCase() : "_"}
        </div>
      ))}
    </ul>
  );
};

export default function Word(props: { game: Game; gameId: string }) {
  useEffect(() => {
    const eventSource = new EventSource(
      `/api/alert?id=${props.gameId}`,
    );
    eventSource.onmessage = (e) => {
      const newGame = JSON.parse(e.data) as Game;
      console.log("New Game", props.game);
      console.log("I GOT A MESSAGE IN MY USE EFFECT IN WORD");
    };
    return () => eventSource.close();
  }, [props.game]);

  return (
    <div>
      {word(props.game)}
    </div>
  );
}
