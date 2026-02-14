"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/actions/auth/register";
import GoogleButton from "@/components/buttons/GoogleButton";

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [success, setSuccess] = React.useState(false);

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");
            setSuccess(false);

            const result = await registerUser({ email, password, name });

            if (!result.success) {
                setError(result.error || "Registration failed");
                return;
            }

            setSuccess(true);

            // Auto login after successful registration
            setTimeout(() => {
                router.push("/dashboard");
            }, 2000);
        } catch (err) {
            setError("Registration failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <Card className="w-full max-w-md">
                <CardContent className="p-6">
                    <form onSubmit={handleRegister}>
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-2 text-center mb-6">
                                <h1 className="text-2xl font-bold">
                                    Konto erstellen
                                </h1>
                                <p className="text-muted-foreground text-sm">
                                    Mit Credentials oder Google registrieren
                                </p>
                            </div>

                            {error && (
                                <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="bg-green-500/15 text-green-600 text-sm p-3 rounded-md">
                                    Konto erfolgreich erstellt! Weiterleitung
                                    zum Dashboard...
                                </div>
                            )}

                            {/* NAME */}
                            <Field>
                                <FieldLabel htmlFor="name">Name</FieldLabel>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Dein Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </Field>

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
                                <FieldDescription>
                                    Muss mindestens 6 Zeichen lang sein
                                </FieldDescription>
                            </Field>

                            {/* REGISTER BUTTON */}
                            <Field>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={loading || success}
                                >
                                    {loading
                                        ? "Erstelle Konto..."
                                        : "Konto erstellen"}
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
                                Bereits ein Konto?{" "}
                                <Link
                                    href="/auth/signin"
                                    className="underline underline-offset-4"
                                >
                                    Anmelden
                                </Link>
                            </FieldDescription>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
