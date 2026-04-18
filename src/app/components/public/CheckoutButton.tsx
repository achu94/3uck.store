"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createOrder } from "@/actions/orders/create-order";
import { toast } from "sonner";
import { ShoppingCart, Loader2 } from "lucide-react";

type Props = {
    storeId: number;
    storeSlug: string;
    product: {
        id: string;
        title: string;
        price: number;
    };
    isLoggedIn: boolean;
};

export function CheckoutButton({ storeId, storeSlug, product, isLoggedIn }: Props) {
    const router = useRouter();
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(false);
    const [showNotes, setShowNotes] = useState(false);

    if (!isLoggedIn) {
        return (
            <Button
                className="w-full"
                size="lg"
                variant="outline"
                onClick={() => router.push("/auth/signin")}
            >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Anmelden zum Bestellen
            </Button>
        );
    }

    async function handleOrder() {
        setLoading(true);
        const result = await createOrder(
            storeId,
            storeSlug,
            [{ productId: product.id, title: product.title, price: product.price, quantity: 1 }],
            notes || undefined,
        );
        setLoading(false);

        if (result.success) {
            toast.success("Bestellung erfolgreich aufgegeben!");
            router.push("/dashboard/my-orders");
        } else {
            toast.error(result.error ?? "Fehler beim Bestellen");
        }
    }

    return (
        <div className="space-y-3">
            {showNotes && (
                <div className="space-y-1.5">
                    <Label htmlFor="notes">Anmerkungen zur Bestellung</Label>
                    <Textarea
                        id="notes"
                        placeholder="z.B. Wunschfarbe, Lieferhinweise..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                    />
                </div>
            )}
            <div className="flex gap-2">
                <Button
                    className="flex-1"
                    size="lg"
                    onClick={handleOrder}
                    disabled={loading}
                >
                    {loading ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                        <ShoppingCart className="h-4 w-4 mr-2" />
                    )}
                    {loading ? "Wird bestellt..." : "Jetzt bestellen"}
                </Button>
                <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setShowNotes((v) => !v)}
                    disabled={loading}
                >
                    {showNotes ? "–" : "Notiz"}
                </Button>
            </div>
        </div>
    );
}
