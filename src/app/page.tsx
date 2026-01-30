export default function Home() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-zinc-950 to-black text-white px-6">
            <div className="max-w-xl w-full text-center border border-zinc-800 rounded-2xl p-8 bg-zinc-950/60 backdrop-blur">
                <div className="text-5xl mb-4">🚧</div>

                <h1 className="text-3xl font-bold tracking-tight">
                    3uck.store ist bald online
                </h1>

                <p className="text-zinc-300 mt-3 leading-relaxed">
                    Wir bauen gerade etwas Frisches für euch. <br />
                    Bitte schau bald wieder vorbei ✨
                </p>

                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-zinc-400">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span>Status: Baustelle</span>
                </div>

                <div className="mt-8 text-xs text-zinc-500">
                    © {new Date().getFullYear()} 3uck.store
                </div>
            </div>
        </main>
    );
}
