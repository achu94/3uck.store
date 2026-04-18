import { getMyOrders } from "@/actions/orders/get-my-orders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Package, ShoppingBag } from "lucide-react";

const STATUS_LABELS: Record<string, string> = {
    pending: "Ausstehend",
    confirmed: "Bestätigt",
    shipped: "Versendet",
    delivered: "Geliefert",
    cancelled: "Storniert",
};

const STATUS_VARIANTS: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    pending: "secondary",
    confirmed: "default",
    shipped: "default",
    delivered: "default",
    cancelled: "destructive",
};

export default async function MyOrdersPage() {
    const orders = await getMyOrders();

    return (
        <div className="mx-auto max-w-4xl p-4 sm:p-6 space-y-6">
            <div className="flex items-center gap-3">
                <ShoppingBag className="h-6 w-6" />
                <h1 className="text-2xl font-bold">Meine Bestellungen</h1>
            </div>

            {orders.length === 0 ? (
                <Card>
                    <CardContent className="py-16 text-center text-muted-foreground">
                        <Package className="h-10 w-10 mx-auto mb-3 stroke-[1.5]" />
                        <p className="font-medium">Noch keine Bestellungen.</p>
                        <p className="text-sm mt-1">
                            Besuche einen{" "}
                            <Link href="/" className="underline underline-offset-4">
                                Store
                            </Link>{" "}
                            und gib deine erste Bestellung auf.
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <Card key={order.id}>
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between gap-3 flex-wrap">
                                    <div className="space-y-1">
                                        <CardTitle className="text-base">
                                            {order.store?.name ?? "Unbekannter Store"}
                                        </CardTitle>
                                        <p className="text-xs text-muted-foreground">
                                            {new Date(order.created_at).toLocaleDateString("de-DE", {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </p>
                                    </div>
                                    <Badge variant={STATUS_VARIANTS[order.status] ?? "secondary"}>
                                        {STATUS_LABELS[order.status] ?? order.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Separator />
                                <div className="space-y-2">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="flex justify-between text-sm">
                                            <span>
                                                {item.title}{" "}
                                                {item.quantity > 1 && (
                                                    <span className="text-muted-foreground">×{item.quantity}</span>
                                                )}
                                            </span>
                                            <span className="font-medium">
                                                {new Intl.NumberFormat("de-DE", {
                                                    style: "currency",
                                                    currency: "EUR",
                                                }).format(item.price * item.quantity)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <Separator />
                                <div className="flex justify-between font-semibold">
                                    <span>Gesamt</span>
                                    <span>
                                        {new Intl.NumberFormat("de-DE", {
                                            style: "currency",
                                            currency: "EUR",
                                        }).format(order.total_price)}
                                    </span>
                                </div>
                                {order.notes && (
                                    <p className="text-xs text-muted-foreground border-t pt-2">
                                        Notiz: {order.notes}
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
