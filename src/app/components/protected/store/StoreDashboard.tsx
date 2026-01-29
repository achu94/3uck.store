import Link from "next/link";

export function StoreDashboard() {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">
                        Willkommen im Dashboard!
                    </h1>
                    <p className="py-6">
                        Erstelle deinen Store, um 3D‑Druck‑Jobs anzubieten und
                        Listings zu verwalten.
                    </p>

                    <button className="btn btn-primary btn-xl">
                        <Link href="/store/create">Store erstellen (2 Min)</Link>
                    </button>

                    <div className="mt-8 opacity-75">
                        <p>
                            👉 Später: Analytics, Listings, Druck‑Jobs,
                            Einnahmen
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
