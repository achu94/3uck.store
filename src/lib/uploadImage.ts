import sharp from "sharp";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

const s3 = new S3Client({
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY!,
        secretAccessKey: process.env.S3_SECRET_KEY!,
    },
});

export async function uploadImage({
    file,
    bucket,
    prefix,
    width,
}: {
    file: File;
    bucket: string;
    prefix: string;
    width?: number;
}) {
    const buffer = Buffer.from(await file.arrayBuffer());

    let image = sharp(buffer).rotate();

    if (width) {
        image = image.resize({ width });
    }

    const webpBuffer = await image.webp({ quality: 85 }).toBuffer();

    const key = `${prefix}/${randomUUID()}.webp`;

    await s3.send(
        new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: webpBuffer,
            ContentType: "image/webp",
        }),
    );

    return key;
}
