import { ChatPanel } from "@/components/chat-panel"

export const metadata = {
  title: "Conen Digital — AI Assistant",
}

export default function Home() {
  return (
    <main className="h-screen w-full">
      <ChatPanel />
    </main>
  )
}
