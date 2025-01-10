import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  NoSuchKey,
} from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});

export const saveToS3 = async (documentId: string, content: unknown) => {
  try {
    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
        Key: `documents/${documentId}.json`,
        Body: JSON.stringify({
          content,
          updatedAt: new Date().toISOString(),
        }),
        ContentType: "application/json",
      })
    );
    return true;
  } catch (error) {
    console.error("Error saving to S3:", error);
    return false;
  }
};

export const loadFromS3 = async (documentId: string) => {
  try {
    const response = await s3Client.send(
      new GetObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
        Key: `documents/${documentId}.json`,
      })
    );

    const content = await response.Body?.transformToString();
    return content ? JSON.parse(content) : null;
  } catch (error) {
    if (error instanceof NoSuchKey) {
      return null;
    }
    console.error("Error loading from S3:", error);
    return null;
  }
};
