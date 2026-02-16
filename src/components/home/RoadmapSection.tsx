import { Calendar, CheckCircle, Rocket } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function RoadMapSection() {
    const roadmap = [
        {
            phase: "Q1",
            title: "Foundation",
            period: "Jan - Mär",
            status: "in-progress",
            description: "Stores, Listings, Dashboards & Settings",
            items: [
                "Store CRUD (erstellen, editieren, löschen)",
                "Category CRUD",
                "Item (Listing) CRUD",
                "Store Dashboard",
                "User Settings (Profile, Email, etc.)",
                "Public Store Page",
                "Mobile Responsive Design",
            ],
        },
        {
            phase: "Q2",
            title: "Payment & Orders",
            period: "Apr - Jun",
            status: "planned",
            description: "Stripe, Orders, History & Notifications",
            items: [
                "Payment Integration (Stripe)",
                "Order System",
                "Order History",
                "Checkout Flow",
                "Order Notifications",
                "Payment Tests",
            ],
        },
        {
            phase: "Q3",
            title: "STL Sales & Revenue",
            period: "Jul - Sep",
            status: "planned",
            description: "STL Uploads, Sales & Revenue Share",
            items: [
                "STL File Upload",
                "STL Sales Feature",
                "Revenue Share System",
                "Share Settings (Prozentual)",
                "Commission Tracking",
            ],
        },
        {
            phase: "Q4",
            title: "Marketplace",
            period: "Okt - Dez",
            status: "planned",
            description: "Discovery, Search, Directory & Reviews",
            items: [
                "Featured Store Products",
                "Discovery Page",
                "Search & Filters",
                "Store Directory",
                "Reviews & Ratings",
            ],
        },
    ];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "completed":
                return <CheckCircle className="w-5 h-5 text-green-600" />;
            case "in-progress":
                return (
                    <Rocket className="w-5 h-5 text-yellow-600 animate-pulse" />
                );
            case "planned":
                return <Calendar className="w-5 h-5 text-gray-600" />;
            default:
                return <CheckCircle className="w-5 h-5" />;
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case "completed":
                return "Erledigt";
            case "in-progress":
                return "In Arbeit";
            case "planned":
                return "Geplant";
            default:
                return status;
        }
    };

    return (
        <section id="roadmap" className="container mx-auto py-16">
            <div className="mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <Calendar className="w-6 h-6" />
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                            Roadmap 2025
                        </h2>
                    </div>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Unser Plan für die Zukunft von 3uck.store.
                    </p>
                </div>

                <div className="space-y-6">
                    {roadmap.map((quarter) => (
                        <Card
                            key={quarter.phase}
                            className="hover:shadow-lg transition-shadow"
                        >
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${
                                                quarter.status === "completed"
                                                    ? "bg-green-600"
                                                    : quarter.status ===
                                                        "in-progress"
                                                      ? "bg-yellow-600"
                                                      : "bg-gray-400"
                                            }`}
                                        >
                                            {quarter.phase}
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl">
                                                {quarter.title}
                                            </CardTitle>
                                            <p className="text-sm text-muted-foreground">
                                                {quarter.period}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {getStatusIcon(quarter.status)}
                                        <span className="text-sm font-medium">
                                            {getStatusText(quarter.status)}
                                        </span>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base mb-4">
                                    {quarter.description}
                                </CardDescription>
                                <ul className="space-y-2">
                                    {quarter.items.map((item) => (
                                        <li
                                            key={item}
                                            className="flex items-start gap-2 text-sm"
                                        >
                                            <CheckCircle className="w-4 h-4 mt-0.5 text-green-600 shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
