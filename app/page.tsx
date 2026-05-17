export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="max-w-md space-y-3 text-center">
        <h1 className="text-2xl font-medium">Conen Digital — Chatbot</h1>
        <p className="opacity-70">
          This is the chatbot&apos;s host app. The embeddable chat panel lives at{" "}
          <a href="/widget" className="underline">
            /widget
          </a>
          .
        </p>
        <p className="text-sm opacity-50">
          To embed on the Conen Digital site, include{" "}
          <code className="rounded bg-foreground/10 px-1 py-0.5 text-xs">/widget.js</code> as a
          script tag.
        </p>
      </div>
    </main>
  )
}
