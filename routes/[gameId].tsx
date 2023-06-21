import { Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(_, ctx) {
    const { gameId } = ctx.params;
    return ctx.render({ gameId });
  },
};

export default function Game({ data }: PageProps<{ gameId: string }>) {
  return (
    <div class="w-full h-screen flex flex-col items-center bg-[#1C1E25] text-[#DADADA] font-mono">
      {data.gameId}
    </div>
  );
}
