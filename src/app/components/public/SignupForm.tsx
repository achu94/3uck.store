"use client";

import * as React from "react";
import { signIn } from "next-auth/react";
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

export function SignupForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [email, setEmail] = React.useState("");
    const [loadingEmail, setLoadingEmail] = React.useState(false);
    const [loadingGoogle, setLoadingGoogle] = React.useState(false);

    async function handleEmailSignIn(e: React.FormEvent) {
        e.preventDefault();
        if (!email) return;

        try {
            setLoadingEmail(true);
            await signIn("email", {
                email,
                callbackUrl: "/dashboard",
            });
        } finally {
            setLoadingEmail(false);
        }
    }

    async function handleGoogleSignIn() {
        try {
            setLoadingGoogle(true);
            await signIn("google", {
                callbackUrl: "/dashboard",
            });
        } finally {
            setLoadingGoogle(false);
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    {/* LEFT: FORM */}
                    <form onSubmit={handleEmailSignIn} className="p-6 md:p-8">
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">
                                    Create your account
                                </h1>
                                <p className="text-muted-foreground text-sm text-balance">
                                    Enter your email below to create your
                                    account
                                </p>
                            </div>

                            {/* EMAIL */}
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@3uck.store"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <FieldDescription>
                                    We&apos;ll send you a secure login link (no
                                    password needed).
                                </FieldDescription>
                            </Field>

                            {/* EMAIL BUTTON */}
                            <Field>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={loadingEmail}
                                >
                                    {loadingEmail
                                        ? "Sending link..."
                                        : "Continue with Email"}
                                </Button>
                            </Field>

                            {/* Separator */}
                            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                Or continue with
                            </FieldSeparator>

                            {/* GOOGLE BUTTON */}
                            <Field>
                                <Button
                                    variant="outline"
                                    type="button"
                                    className="w-full"
                                    onClick={handleGoogleSignIn}
                                    disabled={loadingGoogle}
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

                                    {loadingGoogle
                                        ? "Opening Google..."
                                        : "Continue with Google"}
                                </Button>
                            </Field>

                            {/* Footer small text */}
                            <FieldDescription className="text-center">
                                Already have an account?{" "}
                                <Link
                                    href="/signin"
                                    className="underline underline-offset-4"
                                >
                                    Sign in
                                </Link>
                            </FieldDescription>
                        </FieldGroup>
                    </form>

                    {/* RIGHT: IMAGE PANEL */}
                    <div className="bg-muted relative hidden md:block">
                        <img
                            src="/placeholder.svg"
                            alt="3D Store Preview"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                </CardContent>
            </Card>

            <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our{" "}
                <Link href="/terms" className="underline underline-offset-4">
                    Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline underline-offset-4">
                    Privacy Policy
                </Link>
                .
            </FieldDescription>
        </div>
    );
}
