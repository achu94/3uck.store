import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabaseServer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "@/app/components/protected/settings/ProfileForm";
import { StoreSettingsForm } from "@/app/components/protected/settings/StoreSettingsForm";
import type { Store } from "@/types/db";

export const metadata = { title: "Einstellungen – 3uck.store" };

export default async function SettingsPage() {
    const session = await auth();
    if (!session?.user?.id) redirect("/auth/signin");

    const supabase = supabaseServer();

    const [{ data: user }, { data: store }] = await Promise.all([
        supabase
            .from("users")
            .select("id, name, email")
            .eq("id", session.user.id)
            .single(),
        supabase
            .from("stores")
            .select("*")
            .eq("user_id", session.user.id)
            .single(),
    ]);

    return (
        <div className="mx-auto w-full max-w-3xl space-y-8 py-4">
            <div>
                <h1 className="text-3xl font-bold">Einstellungen</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Verwalte dein Profil und deinen Store.
                </p>
            </div>

            <Separator />

            <Card>
                <CardHeader>
                    <CardTitle>Profil</CardTitle>
                </CardHeader>
                <CardContent>
                    <ProfileForm
                        initialName={user?.name ?? ""}
                        email={user?.email ?? session.user.email ?? ""}
                    />
                </CardContent>
            </Card>

            {store && (
                <Card>
                    <CardHeader>
                        <CardTitle>Store-Einstellungen</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <StoreSettingsForm store={store as Store} />
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
