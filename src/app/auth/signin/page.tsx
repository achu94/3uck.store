"use client";

import { SignupForm } from "@/app/components/public/SignupForm";
import Link from "next/link";

export default function SignIn() {
    return (
        <div className="min-h-screen min-w-screen p-6">
            <SignupForm />
            <div className="mt-4 text-center space-y-2">
                <div>
                    <Link 
                        href="/auth/credentials" 
                        className="text-sm text-muted-foreground hover:underline"
                    >
                        Already have an account? Sign in with credentials
                    </Link>
                </div>
                <div>
                    <Link 
                        href="/auth/register" 
                        className="text-sm text-muted-foreground hover:underline"
                    >
                        Or create new account with credentials
                    </Link>
                </div>
            </div>
        </div>
    );
}
