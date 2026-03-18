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

export async function deleteProduct(productId: string) {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");

    const supabase = supabaseServer();

    const { data: store } = await supabase
        .from("stores")
        .select("id")
        .eq("user_id", session.user.id)
        .single();

    if (!store) throw new Error("Store not found");

    const { data: product, error: productError } = await supabase
        .from("products")
        .select("id, main_image_url")
        .eq("id", productId)
        .eq("store_id", store.id)
        .single();

    if (productError || !product) {
        throw new Error("Product not found or you do not have permission to delete it.");
    }

    // First, delete associated images from S3
    // This is simplified. In a real app, you would delete all images from product_images table and storage.
    if (product.main_image_url) {
        try {
            await s3.send(
                new DeleteObjectCommand({
                    Bucket: "3uck-item-assets",
                    Key: product.main_image_url,
                }),
            );
        } catch (s3Error) {
            console.error("Failed to delete image from S3", s3Error);
            // Decide if you want to stop the whole process if image deletion fails
        }
    }
    
    // Also delete images from product_images table and S3
    const { data: images } = await supabase
        .from("product_images")
        .select("url")
        .eq("product_id", productId);

    if (images) {
        for (const image of images) {
             try {
                await s3.send(
                    new DeleteObjectCommand({
                        Bucket: "3uck-item-assets",
                        Key: image.url,
                    }),
                );
            } catch (s3Error) {
                console.error("Failed to delete image from S3", s3Error);
            }
        }
    }

    // Delete from product_images table
    await supabase.from("product_images").delete().eq("product_id", productId);


    const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/dashboard/products");

    return { success: true };
}
