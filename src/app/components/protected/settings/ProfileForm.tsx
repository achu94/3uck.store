"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { updateProfile } from "@/actions/auth/update-profile";

type ProfileFormProps = {
    initialName: string;
    email: string;
};

export function ProfileForm({ initialName, email }: ProfileFormProps) {
    const [name, setName] = useState(initialName);
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});

        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
            const result = await updateProfile(formData);

            if (!result.success) {
                if (result.errors) setErrors(result.errors);
                toast.error(result.error || "Fehler beim Speichern");
                return;
            }

            toast.success("Profil aktualisiert");
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="email">E-Mail</Label>
                <Input id="email" value={email} disabled className="bg-muted" />
                <p className="text-xs text-muted-foreground">E-Mail kann nicht geändert werden.</p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="name" className={errors.name ? "text-destructive" : ""}>
                    Anzeigename
                </Label>
                <Input
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Dein Name"
                    className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                    <p className="text-xs text-destructive">{errors.name[0]}</p>
                )}
            </div>

            <Button type="submit" disabled={isPending}>
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Speichern"}
            </Button>
        </form>
    );
}
