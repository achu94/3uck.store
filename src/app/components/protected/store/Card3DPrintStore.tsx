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

export function Card3DPrintStore() {
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
                <Link href="/store/create?type=print" className="mx-auto">
                    <Button variant="outline" size="sm" className="w-full">
                        Open Print Store
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
