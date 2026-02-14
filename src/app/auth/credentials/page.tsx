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
import { loginUser } from "@/actions/auth/login";

export default function CredentialsLogin() {
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
                                <h1 className="text-2xl font-bold">
                                    Login
                                </h1>
                                <p className="text-muted-foreground text-sm">
                                    Enter your credentials
                                </p>
                            </div>

                            {error && (
                                <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                                    {error}
                                </div>
                            )}

                            {/* EMAIL */}
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Field>

                            {/* PASSWORD */}
                            <Field>
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                                    {loading ? "Signing in..." : "Sign In"}
                                </Button>
                            </Field>

                            {/* Separator */}
                            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                Or
                            </FieldSeparator>

                            {/* GOOGLE BUTTON */}
                            <Field>
                                <Button
                                    variant="outline"
                                    type="button"
                                    className="w-full"
                                    onClick={() => {
                                        window.location.href = "/auth/signin";
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        className="mr-2 h-4 w-4"
                                    >
                                        <path
                                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    Continue with Google
                                </Button>
                            </Field>

                            {/* Footer */}
                            <FieldDescription className="text-center">
                                Don't have an account?{" "}
                                <Link
                                    href="/auth/signin"
                                    className="underline underline-offset-4"
                                >
                                    Sign up
                                </Link>
                            </FieldDescription>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}