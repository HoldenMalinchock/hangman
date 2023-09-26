import { Handlers } from "$fresh/server.ts";
import { subscribeGame } from "../../utils/db.ts";

export const handler: Handlers = {
  GET(req) {
    const url = new URL(req.url);
    const gameId = url.searchParams.get("id") || "";

    let cleanup: () => void;

    const body = new ReadableStream({
      start(controller) {
        // controller.enqueue(`retry: 1000\n\n`);
        cleanup = subscribeGame(gameId, (games) => {
          // I am not sure what all this does right now
          const data = JSON.stringify(games);
          controller.enqueue(`data: ${data}\n\n`);
        });
        // controller.enqueue(`data: ${gameId}\n\n`);
      },
      cancel() {
        cleanup();
      },
    });

    return new Response(body.pipeThrough(new TextEncoderStream()), {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
      },
    });
  },
};
