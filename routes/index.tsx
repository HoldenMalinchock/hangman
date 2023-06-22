export default function Home() {
  return (
    <div class="w-full h-screen flex flex-col items-center justify-center  bg-[#1C1E25] font-mono">
      <a
        href="/createGame"
        type="button"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create A Hangman game
      </a>
    </div>
  );
}
