import Link from "next/link";

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
                <Link href="/store/create?type=model" className="mx-auto">
                    <Button variant="outline" size="sm" className="w-full">
                        Open Model Store
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
