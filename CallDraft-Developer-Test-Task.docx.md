**CALLDRAFT**

Developer Test Task

# **Task: Build a Real-Time Voice Agent Prototype**

We are building CallDraft, an AI voice agent that answers phone calls for HVAC businesses. Before we start the full build, we need to see that you can get a real-time voice conversation working.

| ⚡ | This is a simple test task. We are not asking you to build the full product. We just want to see a working voice agent that we can talk to in real time. |
| :---: | :---- |

# **What to Build**

Build a simple web-based interface where we can have a real-time voice conversation with an AI agent. That is it. Nothing else.

## **The interface needs:**

1. A button to start/stop the voice call

2. Real-time two-way voice conversation (we talk, the AI talks back, like a phone call)

3. A live transcript showing what is being said on both sides

4. A visible latency indicator (show the response time in milliseconds)

## **The AI agent should:**

* Introduce itself as Sarah from Anderson Heating & Cooling

* Have a natural, friendly conversation

* Be able to answer basic questions (e.g., What services do you offer? What are your hours?)

* Handle a simple booking request (e.g., I need someone to look at my AC)

| ℹ️ | You do NOT need to actually book anything or connect to a real calendar. Just have the agent go through the motions of collecting info and confirming a time. The conversation itself is what we are testing. |
| :---: | :---- |

# **Technology**

You can use whichever approach you prefer:

| Option | What It Is | Good If You... |
| :---- | :---- | :---- |
| **OpenAI Realtime API** | Speech-to-speech via WebSocket. One connection handles everything. | Want lowest latency and are comfortable with WebSockets |
| **Vapi** | Managed voice AI platform. Handles STT \+ LLM \+ TTS for you. | Want fastest setup with less infrastructure code |
| **Custom Stack** | Deepgram/Whisper \+ GPT-4o \+ ElevenLabs. Wire it yourself. | Want to show full-stack voice engineering skills |

We do not have a preference. Pick whichever you are most comfortable with. We care about the result, not which API you chose.

# **System Prompt to Use**

Give the AI agent this prompt (or something close to it):

| You are Sarah, the virtual receptionist for Anderson Heating & Cooling, an HVAC company in Dallas, TX. Your job is to: \- Greet callers warmly \- Ask what they need help with \- Collect their name, phone number, and address \- Describe the issue \- Offer to book an appointment (suggest tomorrow at 10 AM) \- Confirm the booking and say goodbye Business hours: Mon-Fri 8AM-6PM, Emergency 24/7 Services: AC repair, heating repair, installation, maintenance, duct cleaning Service call fee: $89 Keep responses short and conversational. This is a phone call, not an essay. |
| :---- |

# **What to Deliver**

5. A link to the working prototype (deployed URL we can open and test)

6. The source code (GitHub repo or zip file)

7. A brief README with setup instructions (how to run it locally)

8. A short note (2-3 sentences) on which tech you chose and why

# **What We Are Looking At**

We will test the prototype by having a conversation with the agent. Here is what we care about:

| Criteria | What Good Looks Like | Weight |
| :---- | :---- | :---- |
| **It works** | We open the link, click start, and have a real voice conversation. No errors, no crashes. | **40%** |
| **Latency** | Response feels fast and natural. Under 1.5 seconds is good. Under 800ms is great. | **25%** |
| **Conversation quality** | Agent sounds natural, stays in character, does not ramble. Handles interruptions gracefully. | **20%** |
| **Code quality** | Clean, readable code. Clear README. Easy to run locally. We should be able to understand what you did. | **15%** |

# **What NOT to Build**

Do not over-engineer this. We explicitly do not want:

* User authentication or signup

* A database or any data persistence

* Calendar integration or actual booking logic

* A polished UI design (functional is fine)

* Multiple pages or navigation

* Deployment to a custom domain (a Vercel/Netlify/Railway link is fine)

| ❗ | If you spend more than 4-6 hours on this, you are overbuilding. Keep it simple. |
| :---: | :---- |

# **Timeline**

**Deadline:** 3 days from receiving this task

**Expected effort:** 4-6 hours

If you run into blockers with API keys or access, let us know immediately. Do not wait until the deadline.

# **API Keys**

You will need to use your own API keys for this task. We will reimburse reasonable API costs (typically under $5 for testing).

* OpenAI API key (if using OpenAI Realtime API or GPT-4o)

* Vapi API key (if using Vapi — they have a free tier)

* ElevenLabs / Deepgram keys (if using a custom stack)

Include a .env.example file in your repo showing which keys are needed.

