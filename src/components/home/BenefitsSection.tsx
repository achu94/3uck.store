import { Shield, Store, Users } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export function BenefitsSection() {
    const benefits = [
        {
            icon: Users,
            title: "Für 3D-Designer",
            description: "Erstelle deine STL-Modelle und verkaufe sie weltweit",
        },
        {
            icon: Store,
            title: "Für 3D-Drucker",
            description: "Biete Druckaufträge an und verkaufe deine Services",
        },
        {
            icon: Shield,
            title: "Sicherheit & Kontrolle",
            description: "Deine Daten, dein Store – volle Kontrolle",
        },
    ];

    return (
        <section className="container mx-auto py-16">
            <div className="mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                        Für wen?
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        3D-Designer, 3D-Drucker und Kunden – alle profitieren.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {benefits.map((benefit) => {
                        const Icon = benefit.icon;
                        return (
                            <Card
                                key={benefit.title}
                                className="text-center hover:shadow-lg transition-shadow"
                            >
                                <CardContent className="pt-6">
                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                        <Icon className="w-8 h-8 text-primary" />
                                    </div>
                                    <h3 className="font-bold text-xl mb-2">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {benefit.description}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
