"use client";

import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import { GetProductsResult } from "@/actions/products/get-products";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { deleteProduct } from "@/actions/products/delete-product";
import { useState } from "react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { bulkDeleteProducts } from "@/actions/products/bulk-delete-products";
import { bulkUpdateStatus } from "@/actions/products/bulk-update-status";
import { useSidebar } from "@/components/ui/sidebar";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type ProductListProps = {
    products: GetProductsResult;
};

type DialogState = {
    isOpen: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
};

export function ProductList({ products }: ProductListProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
    const [isBulkDeleting, setIsBulkDeleting] = useState(false);
    const [isBulkUpdating, setIsBulkUpdating] = useState(false);
    const { state: sidebarState, isMobile } = useSidebar();
    const [dialogState, setDialogState] = useState<DialogState>({
        isOpen: false,
        title: "",
        description: "",
        onConfirm: () => {},
    });

    const handleDelete = async (productId: string) => {
        setDialogState({
            isOpen: true,
            title: "Are you sure you want to delete this product?",
            description: "This action cannot be undone.",
            onConfirm: async () => {
                setIsDeleting(true);
                try {
                    await deleteProduct(productId);
                    toast.success("Product deleted successfully.");
                } catch {
                    toast.error("Failed to delete product.");
                } finally {
                    setIsDeleting(false);
                    setDialogState({ isOpen: false, title: "", description: "", onConfirm: () => {} });
                }
            }
        });
    };
    
    const handleBulkDelete = async () => {
        setDialogState({
            isOpen: true,
            title: `Are you sure you want to delete ${selectedProductIds.length} products?`,
            description: "This action cannot be undone.",
            onConfirm: async () => {
                setIsBulkDeleting(true);
                try {
                    await bulkDeleteProducts(selectedProductIds);
                    toast.success("Products deleted successfully.");
                    setSelectedProductIds([]);
                } catch {
                    toast.error("Failed to delete products.");
                } finally {
                    setIsBulkDeleting(false);
                    setDialogState({ isOpen: false, title: "", description: "", onConfirm: () => {} });
                }
            }
        });
    };
    
    const handleBulkUpdateStatus = async (status: "draft" | "published") => {
        setDialogState({
            isOpen: true,
            title: `Are you sure you want to set ${selectedProductIds.length} products to ${status}?`,
            description: "This will update the status of the selected products.",
            onConfirm: async () => {
                setIsBulkUpdating(true);
                try {
                    await bulkUpdateStatus(selectedProductIds, status);
                    toast.success(`Products updated to ${status}.`);
                    setSelectedProductIds([]);
                } catch {
                    toast.error("Failed to update products.");
                } finally {
                    setIsBulkUpdating(false);
                    setDialogState({ isOpen: false, title: "", description: "", onConfirm: () => {} });
                }
            }
        });
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedProductIds(products?.map((p) => p.id!) || []);
        } else {
            setSelectedProductIds([]);
        }
    };

    const handleSelect = (productId: string, checked: boolean) => {
        if (checked) {
            setSelectedProductIds((prev) => [...prev, productId]);
        } else {
            setSelectedProductIds((prev) => prev.filter((id) => id !== productId));
        }
    };

    if (!products || products.length === 0) {
        return <p>No products found.</p>;
    }

    const bulkActionBarStyle: React.CSSProperties = {
        position: 'fixed',
        bottom: '1rem',
        left: isMobile ? '1rem' : (sidebarState === 'expanded' ? 'calc(var(--sidebar-width) + 1rem)' : 'calc(var(--sidebar-width-icon) + 1rem)'),
        right: '1rem',
        transition: 'left 0.2s ease-linear',
        zIndex: 10,
    };

    return (
        <div className="pb-20">
            <AlertDialog open={dialogState.isOpen} onOpenChange={(isOpen) => setDialogState(prev => ({...prev, isOpen}))}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{dialogState.title}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {dialogState.description}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDialogState({ isOpen: false, title: "", description: "", onConfirm: () => {} })}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={dialogState.onConfirm}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {selectedProductIds.length > 0 && (
                <div style={bulkActionBarStyle} className="bg-background border shadow-lg p-2 rounded-md flex items-center gap-4">
                    <p className="text-sm font-medium">{selectedProductIds.length} selected</p>
                    <Button variant="destructive" size="sm" onClick={handleBulkDelete} disabled={isBulkDeleting}>
                        {isBulkDeleting ? "Deleting..." : "Delete Selected"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleBulkUpdateStatus("draft")} disabled={isBulkUpdating}>
                        Set status to Draft
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleBulkUpdateStatus("published")} disabled={isBulkUpdating}>
                        Set status to Published
                    </Button>
                </div>
            )}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <Checkbox
                                onCheckedChange={handleSelectAll}
                                checked={selectedProductIds.length === products.length && products.length > 0}
                            />
                        </TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>
                                <Checkbox
                                    onCheckedChange={(checked) => handleSelect(product.id!, !!checked)}
                                    checked={selectedProductIds.includes(product.id!)}
                                />
                            </TableCell>
                            <TableCell>
                                <Image
                                    src={product.main_image_url ? `${process.env.NEXT_PUBLIC_ITEMS_ASSET_URL}/${product.main_image_url}` : "/images/placeholder.png"}
                                    alt={product.title ?? ""}
                                    width={50}
                                    height={50}
                                    unoptimized
                                    className="rounded-md object-cover"
                                />
                            </TableCell>
                            <TableCell>{product.title}</TableCell>
                            <TableCell>
                                {new Intl.NumberFormat("de-DE", {
                                    style: "currency",
                                    currency: "EUR",
                                }).format(product.price ?? 0)}
                            </TableCell>
                            <TableCell>
                                <Badge>{product.status}</Badge>
                            </TableCell>
                            <TableCell className="flex gap-2">
                                <Button asChild variant="outline" size="sm">
                                    <Link href={`/dashboard/products/${product.id}`}>
                                        Edit
                                    </Link>
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDelete(product.id!)}
                                    disabled={isDeleting}
                                >
                                    {isDeleting ? "Deleting..." : "Delete"}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
