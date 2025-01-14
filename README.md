# Collaborative Document Editor

A real-time collaborative document editor with integrated AI assistance, built with Next.js 14, TipTap, and YJS.

## Prerequisites

- Node.js 18+
- npm or yarn
- AWS Account with S3 bucket
- OpenAI API key (or another LLM provider)

## Environment Setup

Create a `.env` file in the root directory with the following envs:

```
NEXT_PUBLIC_AWS_ACCESS_KEY_ID=AKIAWCYYABYXLRC4WF5F
NEXT_PUBLIC_AWS_REGION=us-east-1
NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY=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
NEXT_PUBLIC_OPENAI_API_KEY=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
NEXT_PUBLIC_S3_BUCKET_NAME=collab-doc-editor
NEXT_PUBLIC_WEBSOCKET_URL=ws://127.0.0.1:1234
```

## Installation

1. Clone the repository
2. Run `yarn install`
3. Run `yarn dev`

## Project Structure

- `/src/components/Editor`: Editor components and controls
- `/src/contexts`: Context providers for collaboration
- `/src/lib`: Utility functions and S3 client
- `/src/hooks`: Custom React hooks
- `/src/app`: Next.js app router pages

## Features

- Real-time collaborative editing
- Document persistence in S3
- Rich text formatting
- User presence indicators
- Simple name-based authentication
- Auto-saving
- Document sharing via URL

## Development Notes

- The WebSocket server must be running for collaboration features to work
- Documents are automatically saved to S3 when changes are made
- User sessions are maintained through localStorage
- The editor supports multiple concurrent users
- Changes are synchronized in real-time across all connected clients

## Building for Production

```bash
npm run build
npm start
```

Note: For production deployment, ensure you have a WebSocket server running and accessible through the `NEXT_PUBLIC_WEBSOCKET_URL` environment variable.
