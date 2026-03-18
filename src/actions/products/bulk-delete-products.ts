"use server";

import { auth } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabaseServer";
import { revalidatePath } from "next/cache";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY!,
        secretAccessKey: process.env.S3_SECRET_KEY!,
    },
});

export async function bulkDeleteProducts(productIds: string[]) {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");

    const supabase = supabaseServer();

    const { data: store } = await supabase
        .from("stores")
        .select("id")
        .eq("user_id", session.user.id)
        .single();

    if (!store) throw new Error("Store not found");

    // Get all products to be deleted to also delete their images
    const { data: products, error: productError } = await supabase
        .from("products")
        .select("id, main_image_url")
        .in("id", productIds)
        .eq("store_id", store.id);

    if (productError || !products) {
        throw new Error("Products not found or you do not have permission to delete them.");
    }

    const keysToDelete = products.map(p => p.main_image_url).filter(Boolean) as string[];

    // Also get images from product_images
    const { data: images } = await supabase
        .from("product_images")
        .select("url")
        .in("product_id", productIds);

    if (images) {
        keysToDelete.push(...images.map(i => i.url));
    }

    // Delete objects from S3
    if (keysToDelete.length > 0) {
        for (const key of keysToDelete) {
            try {
                await s3.send(
                    new DeleteObjectCommand({
                        Bucket: "3uck-item-assets",
                        Key: key,
                    }),
                );
            } catch (s3Error) {
                console.error(`Failed to delete ${key} from S3`, s3Error);
                // Continue deleting other images and product from db
            }
        }
    }
    
    // Delete from product_images table
    await supabase.from("product_images").delete().in("product_id", productIds);

    // Delete products from db
    const { error } = await supabase
        .from("products")
        .delete()
        .in("id", productIds);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/dashboard/products");
    
    return { success: true };
}