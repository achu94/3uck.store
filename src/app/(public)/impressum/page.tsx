export const metadata = {
    title: "Impressum – 3uck.store",
};

export default function ImpressumPage() {
    return (
        <main className="container mx-auto py-16 max-w-3xl space-y-8">
            <h1 className="text-3xl font-bold">Impressum</h1>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">Angaben gemäß § 5 TMG</h2>

                <p>
                    Aygyun Yakub
                    <br />
                    Immenweg 37
                    <br />
                    21629 Neu Wulmstorf
                    <br />
                    Deutschland
                </p>

                <p>E-Mail: hello@3uck.store</p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">Haftung für Inhalte</h2>
                <p>
                    Die Inhalte unserer Seiten wurden mit größter Sorgfalt
                    erstellt. Für die Richtigkeit, Vollständigkeit und
                    Aktualität der Inhalte können wir jedoch keine Gewähr
                    übernehmen.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-semibold">Haftung für Links</h2>
                <p>
                    Unsere Website enthält Links zu externen Websites Dritter,
                    auf deren Inhalte wir keinen Einfluss haben. Deshalb können
                    wir für diese fremden Inhalte auch keine Gewähr übernehmen.
                </p>
            </section>
        </main>
    );
}
