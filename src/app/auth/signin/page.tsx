"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import GoogleButton from "@/components/buttons/GoogleButton";
import { Card, CardContent } from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/actions/auth/login";

export default function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    async function handleCredentialsLogin(e: React.FormEvent) {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            const result = await loginUser({ email, password });

            if (!result.success) {
                setError(result.error || "Login failed");
                return;
            }

            router.push("/dashboard");
            router.refresh();
        } catch (err) {
            setError("Login failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <Card className="w-full max-w-md">
                <CardContent className="p-6">
                    <form onSubmit={handleCredentialsLogin}>
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-2 text-center mb-6">
                                <h1 className="text-2xl font-bold">Anmelden</h1>
                                <p className="text-muted-foreground text-sm">
                                    Mit Credentials oder Google anmelden
                                </p>
                            </div>

                            {error && (
                                <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                                    {error}
                                </div>
                            )}

                            {/* EMAIL */}
                            <Field>
                                <FieldLabel htmlFor="email">E-Mail</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="du@beispiel.de"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Field>

                            {/* PASSWORD */}
                            <Field>
                                <FieldLabel htmlFor="password">
                                    Passwort
                                </FieldLabel>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Dein Passwort"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                            </Field>

                            {/* LOGIN BUTTON */}
                            <Field>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={loading}
                                >
                                    {loading ? "Anmeldung..." : "Anmelden"}
                                </Button>
                            </Field>

                            {/* Separator */}
                            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                Oder weiter mit
                            </FieldSeparator>

                            {/* GOOGLE BUTTON */}
                            <Field>
                                <GoogleButton />
                            </Field>

                            {/* Footer */}
                            <FieldDescription className="text-center">
                                Noch kein Konto?{" "}
                                <Link
                                    href="/auth/signup"
                                    className="underline underline-offset-4"
                                >
                                    Registrieren
                                </Link>
                            </FieldDescription>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
