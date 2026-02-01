"use client";

import Link from "next/link";

import { useSetAtom } from "jotai";
import { storeTypeAtom } from "@/atoms/store";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function Card3DPrintStore() {
    const setStoreType = useSetAtom(storeTypeAtom);

    return (
        <Card className="mx-auto w-full max-w-sm">
            <CardHeader>
                <CardTitle>3D Print Service</CardTitle>
                <CardDescription>
                    Manage print jobs, materials and production queue.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <p>
                    Track incoming orders, set print priorities and monitor your
                    active printer workload.
                </p>
            </CardContent>

            <CardFooter>
                <Button
                    onClick={() => setStoreType("print")}
                    variant="outline"
                    size="sm"
                    className="w-full"
                >
                    Open Print Store
                </Button>
            </CardFooter>
        </Card>
    );
}
