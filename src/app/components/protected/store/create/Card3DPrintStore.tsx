"use client";

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
                <CardTitle>3D-Druck-Service</CardTitle>
                <CardDescription>
                    Verwalte Druckaufträge, Materialien und deine
                    Produktionswarteschlange.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <p>
                    Behalte eingehende Bestellungen im Blick, setze
                    Druckprioritäten und überwache die Auslastung deiner aktiven
                    Drucker.
                </p>
            </CardContent>

            <CardFooter>
                <Button
                    onClick={() => setStoreType("print")}
                    variant="outline"
                    size="sm"
                    className="w-full"
                >
                    Print-Store eröffnen
                </Button>
            </CardFooter>
        </Card>
    );
}
