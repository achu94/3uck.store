"use client";

import { useState } from "react";
import type { StoreOrder } from "@/actions/orders/get-store-orders";
import { updateOrderStatus, type OrderStatus } from "@/actions/orders/update-order-status";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

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
    delivered: "outline",
    cancelled: "destructive",
};

export function OrdersTable({ orders }: { orders: StoreOrder[] }) {
    const [updating, setUpdating] = useState<string | null>(null);
    const [localOrders, setLocalOrders] = useState(orders);

    async function handleStatusChange(orderId: string, status: OrderStatus) {
        setUpdating(orderId);
        const result = await updateOrderStatus(orderId, status);
        setUpdating(null);

        if (result.success) {
            setLocalOrders((prev) =>
                prev.map((o) => (o.id === orderId ? { ...o, status } : o)),
            );
            toast.success("Status aktualisiert");
        } else {
            toast.error(result.error ?? "Fehler beim Aktualisieren");
        }
    }

    return (
        <div className="space-y-4">
            {localOrders.map((order) => (
                <Card key={order.id}>
                    <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-3 flex-wrap">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={order.customer?.image ?? undefined} />
                                    <AvatarFallback>
                                        {(order.customer?.name?.[0] ?? "?").toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium text-sm">
                                        {order.customer?.name ?? "Anonym"}
                                    </p>
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
                            </div>

                            <div className="flex items-center gap-2">
                                <Badge variant={STATUS_VARIANTS[order.status] ?? "secondary"}>
                                    {STATUS_LABELS[order.status] ?? order.status}
                                </Badge>
                            </div>
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
                        <div className="flex items-center justify-between gap-3 flex-wrap">
                            <span className="font-semibold">
                                Gesamt:{" "}
                                {new Intl.NumberFormat("de-DE", {
                                    style: "currency",
                                    currency: "EUR",
                                }).format(order.total_price)}
                            </span>
                            <Select
                                value={order.status}
                                onValueChange={(v) => handleStatusChange(order.id, v as OrderStatus)}
                                disabled={updating === order.id}
                            >
                                <SelectTrigger className="w-44">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(STATUS_LABELS).map(([value, label]) => (
                                        <SelectItem key={value} value={value}>
                                            {label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
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
    );
}
