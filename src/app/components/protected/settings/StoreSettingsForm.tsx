"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { updateStoreSettings } from "@/actions/store/update-store-settings";
import type { Store } from "@/types/db";

type StoreSettingsFormProps = {
    store: Store;
};

export function StoreSettingsForm({ store }: StoreSettingsFormProps) {
    const [description, setDescription] = useState(store.description ?? "");
    const [contactEmail, setContactEmail] = useState(store.contact_email ?? "");
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});

        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
            const result = await updateStoreSettings(formData);

            if (!result.success) {
                if (result.errors) setErrors(result.errors);
                toast.error(result.error || "Fehler beim Speichern");
                return;
            }

            toast.success("Store-Einstellungen gespeichert");
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label>Store-Name</Label>
                <Input value={store.name} disabled className="bg-muted" />
                <p className="text-xs text-muted-foreground">Store-Name kann nach Erstellung nicht geändert werden.</p>
            </div>

            <div className="space-y-2">
                <Label>Store-URL</Label>
                <Input value={`3uck.store/${store.slug}`} disabled className="bg-muted font-mono text-sm" />
            </div>

            <div className="space-y-2">
                <Label
                    htmlFor="description"
                    className={errors.description ? "text-destructive" : ""}
                >
                    Beschreibung
                </Label>
                <Textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Kurze Beschreibung deines Stores…"
                    rows={4}
                    className={errors.description ? "border-destructive" : ""}
                />
                {errors.description && (
                    <p className="text-xs text-destructive">{errors.description[0]}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label
                    htmlFor="contact_email"
                    className={errors.contact_email ? "text-destructive" : ""}
                >
                    Kontakt-E-Mail
                </Label>
                <Input
                    id="contact_email"
                    name="contact_email"
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="kontakt@beispiel.de"
                    className={errors.contact_email ? "border-destructive" : ""}
                />
                {errors.contact_email && (
                    <p className="text-xs text-destructive">{errors.contact_email[0]}</p>
                )}
            </div>

            <Button type="submit" disabled={isPending}>
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Speichern"}
            </Button>
        </form>
    );
}
