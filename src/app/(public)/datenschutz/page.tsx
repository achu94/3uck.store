export const metadata = {
    title: "Datenschutzerklärung – 3uck.store",
};

export default function DatenschutzPage() {
    return (
        <main className="container mx-auto py-16 max-w-3xl space-y-8">
            <h1 className="text-3xl font-bold">Datenschutzerklärung</h1>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">1. Verantwortlicher</h2>
                <p>
                    Verantwortlich für die Datenverarbeitung auf dieser Website:
                </p>
                <p>
                    3uck.store <br />
                    E-Mail: hello@3uck.store
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">2. Hosting</h2>
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
                <h2 className="text-xl font-semibold">
                    3. Anmeldung / Kontaktformular
                </h2>
                <p>
                    Wenn du dich über unser Formular anmeldest, speichern wir
                    die von dir angegebenen Daten (Name, E-Mail-Adresse und ggf.
                    Nachricht), um dich über den Start von 3uck.store zu
                    informieren oder deine Anfrage zu bearbeiten.
                </p>
                <p>
                    Die Daten werden nicht an Dritte weitergegeben und nur so
                    lange gespeichert, wie es für diesen Zweck erforderlich ist.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">
                    4. Datenverarbeitung mit Supabase
                </h2>
                <p>
                    Zur Speicherung von Daten verwenden wir Supabase. Die
                    Verarbeitung erfolgt ausschließlich zur Bereitstellung der
                    Funktionen dieser Website.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">
                    5. Webanalyse mit Umami
                </h2>
                <p>
                    Diese Website verwendet Umami Analytics, ein
                    datenschutzfreundliches Webanalyse-Tool.
                </p>
                <p>
                    Umami arbeitet ohne Cookies und erhebt keine
                    personenbezogenen Daten. Die Nutzung erfolgt ausschließlich
                    zur anonymen Auswertung der Besucherzahlen und zur
                    Verbesserung der Website.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">6. Deine Rechte</h2>
                <p>Du hast jederzeit das Recht auf:</p>
                <ul className="list-disc ml-6">
                    <li>Auskunft über gespeicherte Daten</li>
                    <li>Berichtigung oder Löschung</li>
                    <li>Einschränkung der Verarbeitung</li>
                </ul>
                <p>Dazu genügt eine formlose E-Mail an hello@3uck.store.</p>
            </section>
        </main>
    );
}
