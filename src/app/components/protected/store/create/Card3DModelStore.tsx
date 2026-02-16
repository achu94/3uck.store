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

export function Card3DModelStore() {
    const setStoreType = useSetAtom(storeTypeAtom);

    return (
        <Card className="mx-auto w-full max-w-sm">
            <CardHeader>
                <CardTitle>3D-Modell-Store</CardTitle>
                <CardDescription>
                    Verkaufe digitale 3D-Modelle, Lizenzen und Downloads.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <p>
                    Lade neue Modelle hoch, verwalte Preise und behalte
                    Downloads sowie deine Einnahmen im Blick.
                </p>
            </CardContent>

            <CardFooter>
                <Button
                    onClick={() => setStoreType("model")}
                    variant="outline"
                    size="sm"
                    className="w-full"
                >
                    Modell-Store eröffnen
                </Button>
            </CardFooter>
        </Card>
    );
}
