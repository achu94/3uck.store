import { DollarSign, Shield, Store, Zap } from "lucide-react";
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
                "Professioneller Shop für deine 3D-Druck-Modelle und Prints",
        },
        {
            icon: Zap,
            title: "Schnell & Einfach",
            description:
                "Keine technischen Kenntnisse nötig – in 2 Minuten live",
        },
        {
            icon: DollarSign,
            title: "100% Einnahmen",
            description:
                "Du behältst alle deine Einnahmen – ohne versteckte Gebühren",
        },
        {
            icon: Shield,
            title: "Freemium Modell",
            description: "Starte kostenlos, upgraden wenn du wächst",
        },
    ];

    return (
        <section className="container mx-auto px-6 py-16 bg-muted/30">
            <div className="mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                        Was kommt?
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Stores, Listings, Dashboards und mehr – alles in einer
                        Plattform.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {features.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <Card
                                key={feature.title}
                                className="hover:shadow-lg transition-shadow"
                            >
                                <CardHeader className="pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                            <Icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                            {feature.title}
                                        </CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <CardDescription className="text-base">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
