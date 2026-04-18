import { getStoreOrders } from "@/actions/orders/get-store-orders";
import { OrdersTable } from "@/app/components/protected/orders/OrdersTable";
import { Card, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";

export default async function StoreOrdersPage() {
    const orders = await getStoreOrders();

    return (
        <div className="mx-auto max-w-5xl p-4 sm:p-6 space-y-6">
            <div className="flex items-center gap-3">
                <Package className="h-6 w-6" />
                <h1 className="text-2xl font-bold">Bestellungen</h1>
                {orders.length > 0 && (
                    <span className="text-sm text-muted-foreground">({orders.length})</span>
                )}
            </div>

            {orders.length === 0 ? (
                <Card>
                    <CardContent className="py-16 text-center text-muted-foreground">
                        <Package className="h-10 w-10 mx-auto mb-3 stroke-[1.5]" />
                        <p className="font-medium">Noch keine Bestellungen eingegangen.</p>
                        <p className="text-sm mt-1">Sobald Kunden bestellen, erscheinen die Aufträge hier.</p>
                    </CardContent>
                </Card>
            ) : (
                <OrdersTable orders={orders} />
            )}
        </div>
    );
}
