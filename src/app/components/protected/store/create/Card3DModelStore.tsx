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
                <CardTitle>3D Model Store</CardTitle>
                <CardDescription>
                    Sell digital models, licenses and downloads.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <p>
                    Upload new assets, manage pricing, and track downloads &
                    revenue from your marketplace.
                </p>
            </CardContent>

            <CardFooter>
                <Button
                    onClick={() => setStoreType("model")}
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
