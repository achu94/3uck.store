import {
    DollarSign,
    Shield,
    Store,
    Zap,
    Mail,
    Construction,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";

export function FeaturesSection() {
    const features = [
        {
            icon: Store,
            title: "Eigener Store",
            description:
                "Wir entwickeln gerade dein Zuhause für 3D-Drucke. Erstelle schon jetzt dein Profil und bereite deine Listings vor.",
        },
        {
            icon: Zap,
            title: "Schnell & Einfach",
            description:
                "Kein unnötiger Ballast. Fokus auf das, was zählt: Deine Modelle und deine Kunden.",
        },
        {
            icon: DollarSign,
            title: "Faire Konditionen",
            description:
                "Keine Einstellgebühren. Wir planen Gebühren, die deutlich unter den Marktplatz-Riesen liegen.",
        },
        {
            icon: Shield,
            title: "Mitgestalten",
            description:
                "Du bist von Anfang an dabei. Sag uns, was du brauchst – wir bauen es direkt ein.",
        },
    ];

    return (
        <section className="container mx-auto px-6 py-16 bg-muted/30 rounded-3xl border border-dashed border-muted-foreground/20">
            <div className="mx-auto max-w-5xl">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-600 text-sm font-medium mb-4 border border-yellow-500/20">
                        <Construction className="w-4 h-4" />
                        In aktiver Entwicklung
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-slate-900">
                        Was kommt bei 3uck?
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Wir programmieren gerade unter Hochdruck am Marktplatz.
                        Du kannst schon jetzt Shops anlegen und Produkte
                        vorbereiten – der Verkauf startet bald!
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {features.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <Card
                                key={feature.title}
                                className="hover:shadow-lg transition-all duration-300 border-none shadow-sm"
                            >
                                <CardHeader className="pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                            <Icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <CardTitle className="text-lg uppercase tracking-tight font-bold">
                                            {feature.title}
                                        </CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <CardDescription className="text-base leading-relaxed">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Feedback & Alpha-Community Banner */}
                <div className="mt-16 p-8 rounded-2xl bg-white border-2 border-primary/20 text-center shadow-md">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                        <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                        Werde Teil der Entwicklung!
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                        Wir lesen jede E-Mail. Sag uns, welches Feature du bei
                        Etsy am meisten hasst und was 3uck.store unbedingt
                        braucht.
                    </p>
                    <a
                        href="mailto:hello@3uck.store"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0"
                    >
                        Feedback an hello@3uck.store
                    </a>
                </div>
            </div>
        </section>
    );
}
