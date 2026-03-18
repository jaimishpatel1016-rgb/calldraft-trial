# CallDraft — AI Voice Agent Prototype

Real-time voice agent prototype for **Anderson Heating & Cooling**. Talk to Sarah, your virtual receptionist, powered by [Vapi AI](https://vapi.ai).

## Tech Choice

I chose **Vapi** because it provides the fastest path to a working voice agent with minimal infrastructure code. Vapi handles STT + LLM + TTS as a managed service, so we get a real-time voice conversation running from a single browser SDK (`@vapi-ai/web`) — no server-side WebSocket management, no audio pipeline wiring, and no separate API routes needed. This lets us focus entirely on the call experience and UI.

## Features

- 🎙️ **Real-time voice conversation** — two-way audio with Sarah, the AI receptionist
- 📝 **Live transcript** — see both sides of the conversation as it happens
- ⚡ **Latency indicator** — visible response time in milliseconds
- 🎚️ **Volume visualizer** — real-time audio level feedback
- 🔇 **Mute control** — toggle your microphone during a call
- 🌙 **Dark mode** — press `d` to toggle

## Setup

### Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)
- A [Vapi](https://dashboard.vapi.ai) account (free tier available)

### Installation

```bash
# Clone the repo
git clone <repo-url>
cd calldraft-trial

# Install dependencies
pnpm install

# Copy the env file and add your Vapi public key
cp .env.example .env.local
# Edit .env.local and set NEXT_PUBLIC_VAPI_PUBLIC_KEY=your_key_here

# Start the dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) and click **Start Call** to begin a conversation.

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_VAPI_PUBLIC_KEY` | Yes | Your Vapi public key from [dashboard.vapi.ai](https://dashboard.vapi.ai) |

## Stack

- **Framework:** Next.js 16 (App Router)
- **Voice AI:** Vapi Web SDK (`@vapi-ai/web`)
- **Styling:** Tailwind CSS 4 + shadcn/ui
- **Language:** TypeScript
