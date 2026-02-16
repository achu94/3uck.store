"use client";

import type { Store } from "@/types/db";
import { redirect } from "next/navigation";

type StoreDashboardProps = {
    store: Store;
};

export function StoreDashboard({ store }: StoreDashboardProps) {
    if (!store) redirect("/store/create");
    
    console.log("StoreDashboard store:", store);

    return (
        <div className="hero min-h-screen bg-base-200 flex flex-col items-center justify-start">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Store Manager!</h1>
                </div>
            </div>
        </div>
    );
}
