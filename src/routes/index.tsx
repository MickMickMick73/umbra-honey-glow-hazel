import { createFileRoute } from "@tanstack/react-router";
import { Game } from "@/game/Game";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main className="h-dvh overflow-hidden bg-bg">
      <Game />
    </main>
  );
}
