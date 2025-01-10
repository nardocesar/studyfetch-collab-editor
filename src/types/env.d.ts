declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_WEBSOCKET_URL: string;
    NEXT_PUBLIC_OPENAI_API_KEY: string;
    NEXT_PUBLIC_AWS_ACCESS_KEY_ID: string;
    NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY: string;
    NEXT_PUBLIC_AWS_REGION: string;
    NEXT_PUBLIC_S3_BUCKET_NAME: string;
  }
}
