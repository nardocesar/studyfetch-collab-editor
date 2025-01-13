# Collaborative Document Editor

A real-time collaborative document editor with integrated AI assistance, built with Next.js 14, TipTap, and YJS.

## Prerequisites

- Node.js 18+
- npm or yarn
- AWS Account with S3 bucket
- OpenAI API key (or another LLM provider)

## Environment Setup

Create a `.env` file in the root directory based on the `.env.example` file.

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
