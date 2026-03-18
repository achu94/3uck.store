export const metadata = {
    title: "Datenschutzerklärung – 3uck.store",
};

export default function DatenschutzPage() {
    return (
        <main className="container mx-auto py-16 max-w-3xl space-y-8">
            <h1 className="text-3xl font-bold text-slate-900">
                Datenschutzerklärung
            </h1>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-slate-800">
                    1. Verantwortlicher
                </h2>
                <p>
                    Verantwortlich für die Datenverarbeitung auf dieser Website:
                </p>
                <p className="bg-slate-50 p-3 rounded-md border border-slate-200">
                    3uck.store <br />
                    E-Mail: hello@3uck.store
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-slate-800">
                    2. Hosting
                </h2>
                <p>
                    Diese Website wird auf Servern der Hetzner Online GmbH,
                    Industriestr. 25, 91710 Gunzenhausen, Deutschland betrieben.
                </p>
                <p>
                    Beim Aufruf der Website können automatisch technische Daten
                    (z. B. IP-Adresse, Browser, Uhrzeit) in Server-Logfiles
                    gespeichert werden. Diese Daten dienen ausschließlich der
                    technischen Bereitstellung und Sicherheit der Website.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-slate-800">
                    3. Anmeldung & Google-Login
                </h2>
                <p>
                    Du hast die Möglichkeit, dich über unseren Dienst
                    anzumelden. Dabei speichern wir deinen Namen und deine
                    E-Mail-Adresse.
                </p>
                <p>
                    <strong>Google-Login (OAuth):</strong> Wir nutzen den Dienst
                    Google OAuth der Google Ireland Limited. Wenn du dich mit
                    Google anmeldest, erhalten wir Zugriff auf die in deinem
                    Google-Konto hinterlegten Basisdaten (E-Mail, Name,
                    Profilbild). Diese Daten werden ausschließlich zur
                    Erstellung und Identifizierung deines Kontos genutzt.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-slate-800">
                    4. Datenverarbeitung mit Supabase
                </h2>
                <p>
                    Zur Speicherung und Verwaltung deiner Nutzerdaten verwenden
                    wir Supabase. Die Verarbeitung erfolgt ausschließlich zur
                    Bereitstellung der Funktionen dieser Website (z. B.
                    Shop-Verwaltung).
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-slate-800">
                    5. Webanalyse mit Umami
                </h2>
                <p>
                    Diese Website verwendet Umami Analytics, ein
                    datenschutzfreundliches Webanalyse-Tool.
                </p>
                <p>
                    Umami arbeitet <strong>ohne Cookies</strong> und erhebt
                    keine personenbezogenen Daten. Die Nutzung erfolgt
                    ausschließlich zur anonymen Auswertung der Besucherzahlen
                    und zur Verbesserung der Website.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold text-slate-800">
                    6. Deine Rechte
                </h2>
                <p>Du hast jederzeit das Recht auf:</p>
                <ul className="list-disc ml-6 space-y-1">
                    <li>Auskunft über gespeicherte Daten</li>
                    <li>Berichtigung oder Löschung</li>
                    <li>Einschränkung der Verarbeitung</li>
                </ul>
                <p>Dazu genügt eine formlose E-Mail an hello@3uck.store.</p>
            </section>
        </main>
    );
}
