## **StudyFetch Software Engineer Technical Assignment**

### **Project Overview**

Create a real-time collaborative document editor with an integrated AI assistant. Users should be able to edit documents simultaneously and ask the AI questions about selected text.

This task is created to resemble an actual implementation you would have on the job :)

### **Time Estimate**

4-6 hours

### **Technical Stack**

- Next.js 14+ (App Router)
- TipTap with Hocuspocus or YJS for collaboration
- AWS S3 for document storage
- Vercel AI sdk for llm outputs (you can use any llm)
- Tailwind CSS for styling
- WebSocket server for collaboration

### **Core Features**

1. **Collaborative Editor**
   - TipTap editor with real-time collaboration
   - Uses Hocuspocus/YJS through WebSocket server
   - Multiple users can edit simultaneously
   - Simple name-based login (no auth required)
   - Save documents to S3
   - Ability to refresh page and have same doc etc.
   - Share the url to collaborate with other people
2. **AI Integration**
   - Split-screen layout with editor and AI chat
   - "Ask AI" button appears when text is selected
   - AI automatically receives selected text context
   - Simple chat interface for follow-up questions
   - Uses useChat and the AI SDK for easy LLM access

###

### **Deliverables**

1. GitHub repository with:
   - Complete source code for frontend / backend
   - Setup instructions
   - `.env.example` file
2. Deployed public demo to access remotely

### **Helpful Resources**

- Hocuspocus: [https://tiptap.dev/docs/hocuspocus/introduction](https://tiptap.dev/docs/hocuspocus/introduction)
- YJS Documentation: [https://docs.yjs.dev/](https://docs.yjs.dev/)
- For the LLM, a lot of providers have a free tier that would work with this project and are compatible with npm:ai, google gemini is one, openai (varies by country).
- Vercel AI SDK Documentation: [https://sdk.vercel.ai/docs/introduction](https://sdk.vercel.ai/docs/introduction)

### **Notes**

- No authentication required \- just use a simple name input
- No need for document metadata or complex permissions
- Focus on getting the real-time collaboration working smoothly and document saving working
- Keep the AI integration simple \- just questions and answers about selected text
- Use free tiers for all services
- Document any setup needed for local development
- For styling, make it presentable, something you would want to use (devs do all of our own styling at studyfetch), but don't spend too much time.
- Remember we’re going to use and look at this to judge your skillset\!
