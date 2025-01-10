import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  NoSuchKey,
  ListObjectsV2Command,
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

export interface DocumentMetadata {
  id: string;
  updatedAt: string;
}

export const listDocuments = async (): Promise<DocumentMetadata[]> => {
  try {
    const response = await s3Client.send(
      new ListObjectsV2Command({
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
        Prefix: "documents/",
      })
    );

    const documents = await Promise.all(
      (response.Contents || []).map(async (object) => {
        if (!object.Key) return null;

        try {
          const docResponse = await s3Client.send(
            new GetObjectCommand({
              Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
              Key: object.Key,
            })
          );

          const content = await docResponse.Body?.transformToString();
          const data = content ? JSON.parse(content) : null;

          return {
            id: object.Key.replace("documents/", "").replace(".json", ""),
            updatedAt: data?.updatedAt || object.LastModified?.toISOString(),
          };
        } catch (error) {
          console.error("Error loading document metadata:", error);
          return null;
        }
      })
    );

    return documents
      .filter((doc): doc is DocumentMetadata => doc !== null)
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
  } catch (error) {
    console.error("Error listing documents:", error);
    return [];
  }
};
