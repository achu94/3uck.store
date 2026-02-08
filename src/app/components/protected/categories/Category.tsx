import type { GetCategoriesResult } from "@/actions/category/get-category";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "lucide-react";
import { CheckCircle, XCircle } from "lucide-react";

type DashboardCategoriesProps = {
    categories: GetCategoriesResult;
};

export function Categories({ categories }: DashboardCategoriesProps) {
    const getStatusElement = (status: boolean) => {
        return status ? (
            <Badge>
                <CheckCircle className="h-3 w-3" />
                Aktiv
            </Badge>
        ) : (
            <Badge className="">
                <XCircle className="h-3 w-3" />
                Inaktiv
            </Badge>
        );
    };

    return (
        <>  
            <Table>
                <TableCaption>Eine Liste deiner Kategorien</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-25">Name</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-right">created_at</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories?.map((category) => (
                        <TableRow key={category.id}>
                            <TableCell className="font-medium">
                                {category.name}
                            </TableCell>
                            <TableCell>{category.slug}</TableCell>
                            <TableCell>{category.description}</TableCell>
                            <TableCell className="flex justify-center items-center gap-1">
                                {getStatusElement(category.is_active)}
                            </TableCell>
                            <TableCell className="text-right">
                                {category.created_at}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}
