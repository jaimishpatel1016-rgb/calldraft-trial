

**CALLDRAFT**

AI Voice Agent for HVAC Businesses

**Product Requirements Document**

Version 1.0 — MVP Specification

March 2026

**CONFIDENTIAL**

For internal development use only

# **Table of Contents**

1\. Product Overview

2\. Target Market & Business Goals

3\. User Personas

4\. Information Architecture

5\. User Flows

6\. Feature Specifications

7\. Data Models

8\. API & Integration Requirements

9\. Voice Agent Technical Specs

10\. Pricing & Plans

11\. Design System

12\. Screen Inventory

13\. Non-Functional Requirements

14\. MVP Scope & Phasing

# **1\. Product Overview**

## **1.1 What is CallDraft?**

CallDraft is an AI-powered voice agent that answers phone calls for HVAC businesses. When a customer calls the business phone number, the AI agent picks up, handles the conversation naturally, books appointments directly into Google Calendar, detects emergencies, and provides the business owner with a full call log, transcripts, and actionable insights.

## **1.2 Problem Statement**

HVAC businesses miss 30-60% of inbound calls because the owner is on a job site, driving, or handling another call. Each missed call is a potential $200-$1,500 job lost. Hiring a full-time receptionist costs $35,000-$50,000/year and still only covers business hours. Existing answering services are generic, expensive, and cannot book appointments or answer business-specific questions.

## **1.3 Solution**

CallDraft replaces the need for a receptionist by providing a 24/7 AI voice agent that:

* Answers every inbound call instantly, day or night

* Has natural, human-like conversations with callers

* Detects emergencies (no AC, gas smell, no heat) and prioritizes them

* Books appointments directly into Google Calendar

* Answers business-specific questions from an owner-managed Knowledge Base

* Sends SMS/email alerts for new bookings and emergencies

* Provides full call transcripts with AI summaries

* Surfaces leads that didn't convert and suggests follow-up actions

## **1.4 Key Differentiators**

* **HVAC-specific:** Not a generic AI agent. Pre-configured with HVAC industry knowledge, emergency detection, and service business workflows.

* **Books appointments:** Directly integrates with Google Calendar. No middleware, no manual data entry.

* **Knowledge Base:** Owner uploads pricing sheets, service docs, FAQs. The agent learns from them and answers questions accurately.

* **Actionable insights:** Surfaces warm leads, knowledge gaps, and conversion data. Not just a call answering tool.

# **2\. Target Market & Business Goals**

## **2.1 Target Customer**

Independent HVAC businesses with 1-10 technicians in the US market. Owner-operated shops where the owner personally handles (or misses) most inbound calls. Typically $500K-$5M annual revenue.

## **2.2 Business Goals (MVP)**

| Metric | Target | Timeline |
| :---- | :---- | :---- |
| Paying customers | 40 | 6 months post-launch |
| Target MRR | $10,000 | 40 customers at $249/mo average |
| Churn rate | \< 5% monthly | Ongoing |
| NPS | \> 50 | After 3 months of use |

## **2.3 Revenue Model**

Subscription SaaS with 4 tiers plus usage-based add-ons. See Section 10 for complete pricing.

# **3\. User Personas**

## **3.1 Primary: Mike the HVAC Owner**

**Age:** 35-55

**Tech comfort:** Medium. Uses smartphone, Google Calendar, basic apps. Not a power user.

**Pain:** Misses 40% of calls while on job sites. Loses $3,000-$8,000/month in missed bookings.

**Goal:** Never miss a call. Book more jobs without hiring staff.

**Concern:** Will the AI sound weird? Will it mess up bookings? Can I trust it with my customers?

## **3.2 Secondary: The Caller (Customer)**

**Situation:** AC broke in summer, furnace died in winter, or needs a routine tune-up.

**Expectation:** Quick answer, someone who understands the issue, ability to get a time slot.

**Tolerance:** Will accept AI if it is efficient and helpful. Will not tolerate long hold times, confusion, or inability to schedule.

# **4\. Information Architecture**

## **4.1 Navigation Structure**

The application uses a persistent left sidebar (240px) with the following navigation hierarchy:

### **Overview Section**

* Home (Dashboard) — KPIs, recent calls, quick actions

* Call Log — All inbound/outbound calls with transcripts and actions

* Appointments — Booked, leads, completed with calendar strip

### **Agent Section**

* Agent Settings — Sub-sidebar with 6 sub-sections: Profile & Identity, Voice & Speech, Call Handling, Custom Vocabulary, AI Model, Workflows

* Knowledge Base — File uploads, manual entries, AI extraction, knowledge gaps

* Integrations — Connected services (Google Calendar), upcoming integrations

### **Account Section**

* Settings — Sub-sidebar with 5 sub-sections: Business Profile, Team, Notifications, Billing, Account

* Billing — Dedicated full-page billing with plan comparison, add-ons, invoices

## **4.2 Layout Patterns**

| Pattern | Used In | Structure |
| :---- | :---- | :---- |
| Standard page | Call Log, Appointments, Knowledge Base, Integrations | Sidebar (240px) \+ Content area \+ optional right insights column (340px) |
| Sub-sidebar page | Agent Settings, Account Settings | Sidebar (240px) \+ Sub-sidebar (200px) \+ Content area (720px max) |
| Full canvas | Workflow Builder | Sidebar (240px) \+ Block palette (240px) \+ Canvas \+ Config panel (320px) |
| Full page | Billing | Sidebar (240px) \+ Full-width content |

# **5\. User Flows**

## **5.1 Onboarding Flow (New User)**

Goal: Get the agent answering real calls within 15 minutes of signup.

1. Signup — Email, password, business name, website URL

2. Website scraping — System scrapes the business website to auto-fill services, hours, and service area. Success path shows extracted data for review; failure path allows manual entry.

3. Services & hours confirmation — User reviews/edits auto-detected services and business hours.

4. Dashboard with setup wizard — 5-step setup hub: Upload documents, Connect calendar, Claim phone number, Test agent, Configure agent.

5. Setup complete — All steps done, agent is live and answering calls.

*Critical design principle: Each setup step shows a motivation column explaining WHY this step matters (e.g., 'Without calendar access, your agent can only take messages').*

## **5.2 Inbound Call Flow (Agent)**

This is the core product loop. What happens when a customer calls:

6. Customer dials the CallDraft phone number

7. AI agent picks up and delivers greeting

8. Agent listens, identifies intent (booking, emergency, question, pricing)

9. Agent collects required info: name, phone, address, issue description

10. If emergency detected: apply emergency workflow (priority booking \+ owner SMS alert)

11. Agent checks Google Calendar availability and books appointment

12. Agent confirms booking details verbally and sends SMS confirmation to caller

13. Call ends. Transcript, AI summary, and metadata saved to Call Log.

14. Owner receives notification (SMS/email based on settings)

## **5.3 Owner Daily Workflow**

How the owner interacts with CallDraft on a typical day:

* Morning: Check Call Log for overnight calls and bookings

* Review: Open call details, read AI summaries, dispatch techs via Send to technician action

* Follow-up: Switch to Appointments \> Leads tab, send quotes or schedule agent callbacks for warm leads

* Evening: Receive daily summary email with call count, bookings, revenue, and knowledge gap alerts

* Weekly: Review insights sidebar for conversion rates, add missing knowledge base entries

# **6\. Feature Specifications**

## **6.1 Authentication**

* Email \+ password signup and login

* Google OAuth signup/login (Sign in with Google button). On first Google sign-in, auto-create account using Google profile name and email. On subsequent logins, match by email.

* Password reset via email (for email+password accounts)

* Session management with device tracking (show active sessions in Account settings)

* Logout and Revoke session per device

Screens: 01-signup.html, 02-login.html

## **6.2 Onboarding**

### **6.2.1 Business Info Collection**

* Collect: business name, website URL

* System scrapes URL to extract: services offered, business hours, address, phone, service area

* Two paths: scrape success (user reviews/edits) or scrape failure (manual entry)

### **6.2.2 Setup Hub**

Five-step guided setup displayed as cards with completion tracking:

* **Upload documents:** Drag-and-drop file upload for pricing sheets, FAQs, policies. Feeds into Knowledge Base.

* **Connect calendar:** OAuth flow to connect Google Calendar. Select which calendar to use for bookings.

* **Claim phone number:** Select a local or toll-free number from available options. This becomes the agent's inbound line.

* **Test your agent:** Immersive live call test interface. Owner calls the number and talks to the agent in real-time. Shows live transcript during the call.

* **Configure agent:** Agent name, greeting, tone, system prompt. Auto-fill button generates these from business profile.

Each step includes a right-column motivation panel explaining the value.

Screens: 03 through 16

## **6.3 Call Log**

The primary operational view. Shows all inbound and outbound calls.

### **List View**

* Search bar with filters (date range, type, outcome, priority)

* Call rows showing: time, caller name/number, duration, type badge (inbound/outbound), outcome badge (booked/no booking/voicemail/transferred), priority indicator

* Click row to open slide-over detail panel

### **Call Detail Slide-over (480px from right)**

* Call metadata grid: caller name, phone, address, priority, outcome, appointment time, assigned tech, cost quoted

* AI summary paragraph — 2-3 sentence summary of the call

* Agent note — blue box showing what the AI flagged (e.g., baby at home, urgent)

* Full transcript with timestamps, speaker avatars (S \= agent, C \= caller)

### **Actions**

* **Send to technician:** Dropdown showing available techs with on/off duty status, distance, and contact method. Click to dispatch via SMS/email.

* **Copy summary:** Clipboard copy of structured call info for pasting into external systems.

* **Flag for review:** Mark a call where the agent may have handled something poorly.

* **Internal notes:** Owner-added notes visible only to the business (e.g., quoted price, follow-up needed).

Screens: 17-call-log.html

## **6.4 Appointments**

Three-tab view designed to show value even during low-volume weeks.

### **6.4.1 Booked Tab**

* Calendar sync status banner (green when connected, amber when disconnected)

* Horizontal calendar strip (week view) with color-coded blocks: red \= emergency, blue \= standard, green \= maintenance

* Rich appointment cards: time, duration, color-coded urgency bar, customer info, issue tags, assigned tech, status badge

* Click card to open call detail slide-over with full transcript

### **6.4.2 Leads Tab**

Calls that showed interest but did not book. This is a key value surface.

* Lead cards with heat indicator (hot/warm/cool), issue description, reason tag (wanted quote, asked financing, shopping around, not ready, hung up early)

* Contextual action buttons per lead: Send quote, Send financing info, Have agent call, Remind in X days, Send special offer

### **6.4.3 Completed Tab**

* Past appointments showing full lifecycle: call \> booking \> reminder \> job done \> review received

* Revenue amount per job, outcome status, technician assigned

* Click to open lifecycle slide-over with timeline and revenue breakdown

### **6.4.4 Action Modals**

* **Send Quote:** Pre-filled SMS/email with itemized pricing from call context. Editable before sending.

* **Send Financing Info:** Pre-filled financing message. Shows warning if financing details are missing from Knowledge Base.

* **Have Agent Call:** Schedule an outbound call from the AI agent to the lead. Configure call objective and timing (Now, 1 hour, Tomorrow, Custom).

### **6.4.5 Insights Sidebar (340px)**

* Revenue widget: total revenue, booking count, avg job value for the period

* Conversion funnel: inbound \> qualified \> booked with percentages

* Reasons calls didn't book (chart): wanted quote, shopping around, financing, etc.

* AI suggestions: actionable cards like 'Add financing info', 'Enable auto-follow-up', 'Add weekend hours'

Screens: 18-appointments.html, 18a through 18h

## **6.5 Agent Settings**

Sub-sidebar navigation with 6 sections. Basic sections (1-3) handle core config that most owners will touch. Advanced sections (4-6) are for power users.

### **6.5.1 Profile & Identity**

* Agent name, language, greeting message, tone selector (Professional/Friendly/Casual), system prompt

* 'Regenerate from business profile' button to auto-fill from latest business info

### **6.5.2 Voice & Speech**

* Voice picker with 5 options (male/female/neutral/bilingual), each with preview playback

* Speaking speed slider (0.7x to 1.4x)

* Pause before responding slider (0s to 2s)

### **6.5.3 Call Handling**

* Emergency detection: configurable keyword list \+ response action (book \+ notify, transfer, take message)

* Business hours behavior: during hours vs after hours routing

* After-hours greeting override

* Call transfer rules: trigger phrases, primary transfer number, fallback behavior

* Call limits: max duration (3/5/10 min/no limit), max consecutive questions

### **6.5.4 Custom Vocabulary**

* Tag-based input for HVAC terms (SEER rating, heat pump, R-410A, etc.)

* Local street names and areas (helps voice recognition accuracy)

* Brand and product names (Carrier, Trane, Lennox, etc.)

### **6.5.5 AI Model**

* Three model options: Standard (included, \~0.8s latency), Fast (included, \~0.4s), Advanced (+$49/mo, \~1.2s, best comprehension)

* Clear comparison of latency, comprehension, and cost

### **6.5.6 Workflows**

List view of existing workflows with status (Active/Paused), trigger summary, and action summary. Links to visual workflow builder.

Screens: 19a through 19f

## **6.6 Workflow Builder**

Full-canvas visual editor for creating custom call flow logic.

### **Layout**

* Left: Block palette (draggable) with 4 categories: Triggers, Conditions, Actions, Endings

* Center: Canvas with dot-grid background, top-to-bottom node flow with connector lines and arrows

* Right: Config panel (320px) for editing the selected node properties

* Top: Toolbar with workflow name, status, Test workflow button, Undo, Save & publish

### **Block Types**

| Category | Blocks | Description |
| :---- | :---- | :---- |
| Triggers (green) | Keyword detected, Time of day, Call start | What initiates the workflow |
| Conditions (amber) | If/else, Calendar check, Caller type | Branching logic |
| Actions (blue) | Book appointment, Send SMS, Send email, Transfer call, Apply pricing, Say message | What the agent does |
| Endings (grey) | End call | How the call concludes |

### **Node Features**

* Colored header with gradient (per type), connector dots top/bottom

* Body showing description and config preview rows

* Selected state with blue ring, opens config panel

* Branching: condition nodes split into Yes/No arms that merge back

### **Plan Availability**

* **Starter:** Pre-built workflows only, cannot edit

* **Pro:** Can edit and configure existing workflows, cannot create new ones from scratch

* **Business & Enterprise:** Full visual workflow builder, unlimited custom workflows

Screens: 20-workflow-builder.html

## **6.7 Knowledge Base**

The intelligence layer. Everything the agent knows about the business comes from here.

### **6.7.1 File Uploads**

* Drag-and-drop upload zone. Supported: PDF, DOCX, TXT, CSV, PNG, JPG (max 25 MB per file)

* File list table with: name, category tag (Pricing/Services/Policies/Equipment/Promotions), processing status (Uploading/Parsing/Indexing/Indexed/Failed), date added, file size

* Category auto-detection from file content

* Filter chips to filter by category

### **6.7.2 Upload Processing Pipeline**

Each file goes through 3 stages:

15. Upload — File transmitted to server

16. Parse — Text extracted (OCR for images/scanned PDFs)

17. Index — Content chunked, embedded, and made searchable by the AI agent

Post-indexing, the UI shows an AI extraction preview: key facts the AI pulled from the file, with highlighted terms, so the owner can verify accuracy.

### **6.7.3 Manual Quick Entries**

* Modal for adding typed knowledge entries: title, category, priority, content

* Word count with AI quality indicator

* AI suggestions panel: recommends additional info to add based on what is missing

### **6.7.4 Knowledge Gaps (Insights Sidebar)**

* Agent knowledge score (percentage ring) — overall coverage estimate

* Confidence by topic (bar chart) — per-topic confidence from call analysis

* Knowledge gaps (amber warning cards) — topics callers asked about that the agent could not answer well, with call count and 'Add info' CTA

* Recent activity timeline

Screens: 21-knowledge-base.html, 21b-knowledge-upload-flow.html, 21c-knowledge-add-entry.html

## **6.8 Integrations**

### **MVP Integration: Google Calendar**

* OAuth 2.0 connection flow

* Select specific calendar for bookings

* Settings: booking window (days ahead), default slot duration

* Live sync status with manual sync button

* Stats: appointments booked, rescheduled, sync errors

### **Coming Soon (vote-to-prioritize)**

* SMS / Text Messaging, ServiceTitan, Email (Gmail/Outlook), Housecall Pro, Stripe Payments, Zapier

* Each shows upvote count to gauge demand

* Request integration input for niche tools

Screens: 22-integrations.html

## **6.9 Settings**

Sub-sidebar with 5 sections:

### **6.9.1 Business Profile**

* Business name, phone, address, website, email

* Business hours editor (per-day with open/close times)

* Service area: radius \+ center point \+ covered areas list

### **6.9.2 Team**

* Technician roster: name, phone, email, skill tags, on/off duty status

* Add/edit/remove technicians

* On-call rotation schedule

### **6.9.3 Notifications**

* Per-event type toggle: SMS / Email / Off for: new booking, emergency, missed call, transfer request

* Scheduled reports: daily summary (configurable time), weekly report (configurable day)

* Notification destination: phone number \+ email

### **6.9.4 Billing**

* See Section 10 for full pricing specification

### **6.9.5 Account**

* Email and password management

* Active sessions with device info and Revoke button

* Log out button

* Danger zone: Delete account with confirmation (permanently removes all data)

Screens: 23a through 23e, 24-billing.html

# **7\. Data Models**

Core entities and their relationships. All timestamps in UTC.

## **7.1 Users**

| Field | Type | Notes |
| :---- | :---- | :---- |
| id | UUID | Primary key |
| email | String | Unique, used for login |
| password\_hash | String | bcrypt hash, nullable for Google OAuth users |
| auth\_provider | Enum | email, google |
| google\_id | String | Google OAuth sub ID, nullable |
| avatar\_url | String | From Google profile, nullable |
| business\_name | String | From onboarding |
| business\_phone | String | Owner's personal/office phone |
| business\_address | String | Full address |
| website\_url | String | Nullable |
| service\_area\_radius\_miles | Integer | Default 30 |
| service\_area\_center | String | City, State ZIP |
| timezone | String | IANA timezone |
| plan | Enum | starter, pro, business, enterprise |
| stripe\_customer\_id | String | For billing |
| onboarding\_complete | Boolean | All 5 setup steps done |
| created\_at | Timestamp |  |

## **7.2 Calls**

| Field | Type | Notes |
| :---- | :---- | :---- |
| id | UUID | Primary key |
| user\_id | UUID | FK to Users |
| direction | Enum | inbound, outbound |
| caller\_name | String | Detected or collected during call |
| caller\_phone | String | From caller ID |
| caller\_address | String | Collected during call, nullable |
| duration\_seconds | Integer |  |
| priority | Enum | standard, high, emergency |
| outcome | Enum | booked, no\_booking, voicemail, transferred, follow\_up |
| ai\_summary | Text | 2-3 sentence generated summary |
| agent\_notes | Text | AI-flagged notes |
| internal\_notes | Text | Owner-added notes |
| transcript\_json | JSON | Array of {speaker, text, timestamp} |
| recording\_url | String | S3 URL to audio file |
| flagged\_for\_review | Boolean | Default false |
| appointment\_id | UUID | FK to Appointments, nullable |
| workflow\_triggered | String | Which workflow was activated, nullable |
| started\_at | Timestamp |  |
| ended\_at | Timestamp |  |

## **7.3 Appointments**

| Field | Type | Notes |
| :---- | :---- | :---- |
| id | UUID | Primary key |
| user\_id | UUID | FK to Users |
| call\_id | UUID | FK to Calls, nullable (manual bookings) |
| customer\_name | String |  |
| customer\_phone | String |  |
| customer\_address | String |  |
| issue\_description | Text |  |
| issue\_tags | JSON | Array of strings |
| priority | Enum | standard, high, emergency |
| status | Enum | pending, confirmed, completed, cancelled, no\_show |
| assigned\_tech\_id | UUID | FK to Technicians, nullable |
| scheduled\_start | Timestamp |  |
| scheduled\_end | Timestamp |  |
| revenue\_amount | Decimal | Nullable, filled after job completion |
| google\_event\_id | String | Google Calendar event ID |
| created\_at | Timestamp |  |

## **7.4 Technicians**

| Field | Type | Notes |
| :---- | :---- | :---- |
| id | UUID | Primary key |
| user\_id | UUID | FK to Users (business owner) |
| name | String |  |
| phone | String |  |
| email | String |  |
| skills | JSON | Array of strings |
| on\_duty | Boolean |  |
| notification\_methods | JSON | \['sms', 'email'\] |

## **7.5 Knowledge Base Entries**

| Field | Type | Notes |
| :---- | :---- | :---- |
| id | UUID | Primary key |
| user\_id | UUID | FK to Users |
| type | Enum | file, manual |
| title | String |  |
| category | Enum | pricing, services, policies, equipment, promotions |
| content | Text | For manual entries; extracted text for files |
| file\_url | String | S3 URL, nullable |
| file\_type | String | pdf, docx, csv, txt, png, jpg |
| file\_size\_bytes | Integer | Nullable |
| status | Enum | uploading, parsing, indexing, indexed, failed |
| embedding\_ids | JSON | References to vector store chunks |
| ai\_extraction | JSON | Structured facts extracted by AI |
| created\_at | Timestamp |  |

## **7.6 Workflows**

| Field | Type | Notes |
| :---- | :---- | :---- |
| id | UUID | Primary key |
| user\_id | UUID | FK to Users |
| name | String |  |
| description | Text |  |
| status | Enum | active, paused |
| flow\_json | JSON | Node graph: nodes array \+ edges array |
| created\_at | Timestamp |  |
| updated\_at | Timestamp |  |

# **8\. API & Integration Requirements**

## **8.1 Google Calendar API**

* OAuth 2.0 with offline refresh tokens

* Scopes: calendar.events (read/write), calendar.readonly (list calendars)

* Operations: list events (availability check), create event (book appointment), update event (reschedule), delete event (cancel)

* Webhook subscription for real-time sync of external changes

## **8.2 Voice / Telephony**

The system must support a pluggable voice provider architecture so the team can evaluate and switch providers without rewriting core logic. The backend should abstract the voice layer behind a common interface.

### **Option A: OpenAI Realtime API**

* Native speech-to-speech with GPT-4o Realtime. Lowest latency (\~300ms), most natural.

* Handles STT \+ LLM \+ TTS in a single WebSocket connection

* Requires Twilio or similar for telephony (inbound number, SIP, call routing)

* Tradeoff: Tight coupling to OpenAI. Less control over individual STT/TTS components.

### **Option B: Vapi**

* Managed voice AI platform. Handles telephony \+ STT \+ LLM routing \+ TTS out of the box.

* Built-in phone number provisioning, call recording, transcription

* Supports multiple LLM backends (OpenAI, Anthropic, custom)

* Tradeoff: Less control, per-minute pricing adds up, vendor dependency.

### **Option C: Custom Stack (Twilio \+ STT \+ LLM \+ TTS)**

* Twilio for telephony (inbound/outbound, phone numbers, SIP trunking, call recording)

* Deepgram or OpenAI Whisper for STT

* OpenAI GPT-4o or Anthropic Claude for conversation LLM

* ElevenLabs, OpenAI TTS, or PlayHT for TTS

* Tradeoff: Most control and flexibility, but highest engineering effort.

### **Recommendation**

Start with Vapi for fastest time-to-market. Build the abstraction layer so we can migrate to OpenAI Realtime API or a custom stack once we validate product-market fit and need more control over latency/cost.

### **Required Capabilities (any provider)**

* Inbound call handling with custom greeting

* Outbound calls (agent callbacks to leads)

* Call recording with S3 storage

* Real-time transcription (for live test call UI)

* Call transfer (warm transfer to owner's phone)

* Phone number provisioning: local and toll-free numbers

* DTMF detection (for menu navigation if needed)

## **8.3 AI / LLM**

The LLM layer should also be provider-agnostic where possible.

* Conversation LLM: OpenAI GPT-4o (primary) or Anthropic Claude. The system prompt and tool-calling interface should work with either.

* If using OpenAI Realtime API: STT \+ LLM \+ TTS handled natively in one connection

* If using custom stack: Deepgram Nova-2 or OpenAI Whisper for STT, ElevenLabs Turbo v2 or OpenAI TTS for voice synthesis

* Embeddings: OpenAI text-embedding-3-small for Knowledge Base vector search

* Vector store: Pinecone or pgvector for RAG retrieval

* AI extraction: GPT-4o-mini for parsing uploaded files and extracting structured facts

## **8.4 Notifications**

* SMS: Twilio SMS API

* Email: SendGrid or AWS SES

* Triggers: new booking, emergency detected, missed call, transfer request, daily summary, weekly report

## **8.5 Payments**

* Stripe Subscriptions for recurring billing

* Stripe Checkout for plan upgrades

* Stripe Billing Portal for self-service invoice/payment method management

* Webhook handling for payment events

# **9\. Voice Agent Technical Specifications**

## **9.1 Conversation Architecture**

The voice agent pipeline varies based on the chosen provider (see Section 8.2):

### **Path A: OpenAI Realtime API**

* Single WebSocket connection handles audio in \> speech recognition \> LLM reasoning \> audio out

* Knowledge Base context injected via tool calls within the Realtime session

* Lowest latency: \~300-500ms end-to-end

* Twilio Media Streams connects phone audio to the Realtime API WebSocket

### **Path B: Vapi Managed**

* Vapi handles the full audio pipeline internally

* CallDraft provides: system prompt, tool definitions (book appointment, check calendar), Knowledge Base context via server-side function calls

* Latency: \~800ms-1.2s depending on Vapi's LLM routing

### **Path C: Custom Pipeline**

* Caller audio \> Deepgram STT (streaming) \> transcript text

* Transcript \+ system prompt \+ RAG context \> GPT-4o / Claude

* LLM response text \> ElevenLabs TTS (streaming) \> audio back to caller

* Target end-to-end latency: \< 1.5 seconds (Standard model)

*Regardless of path, the abstraction layer must expose: onCallStart, onTranscript, onAgentResponse, onCallEnd, onToolCall (for calendar booking, SMS sending, etc.).*

## **9.2 System Prompt Structure**

The agent's system prompt is assembled dynamically per call from:

* Base HVAC agent instructions (maintained by CallDraft)

* Business-specific profile (name, address, hours, services, service area)

* Owner's custom system prompt from Agent Settings

* Active workflow definitions

* Current date/time and timezone

* Google Calendar availability snapshot

## **9.3 Knowledge Base RAG**

When the agent needs to answer a business-specific question:

18. Caller's question is embedded

19. Vector similarity search against Knowledge Base chunks

20. Top 3-5 relevant chunks injected into LLM context

21. Agent answers based on retrieved context

22. If no relevant context found, agent acknowledges and offers to take a message or have owner call back

## **9.4 Emergency Detection**

Real-time keyword matching against the owner-configured emergency keyword list. When triggered:

* Agent shifts tone to empathetic \+ urgent

* Active workflow for emergency is executed

* Priority flag set on the call record

* Owner receives immediate SMS notification

# **10\. Pricing & Plans**

## **10.1 Plan Tiers**

| Feature | Starter $99/mo | Pro $249/mo | Business $499/mo | Enterprise |
| :---- | :---- | :---- | :---- | :---- |
| Annual pricing | $79/mo | $199/mo | $399/mo | Custom |
| Calls / month | 100 | 500 | Unlimited | Unlimited |
| Phone numbers | 1 | 1 | 3 | Unlimited |
| Integrations | Google Calendar | All | All | All \+ custom |
| Workflows | Pre-built only | Edit & configure | Visual builder | Visual builder |
| Knowledge Base files | 10 | 50 | Unlimited | Unlimited |
| AI Model | Standard | Standard | Advanced included | Advanced |
| Notifications | Email only | SMS \+ email | SMS \+ email | SMS \+ email |
| Support | Email | Priority email | Phone \+ account mgr | Dedicated success mgr |
| Onboarding | Self-serve | Self-serve | Custom onboarding | White-glove |
| Multi-location | No | No | No | Yes |
| API access | No | No | No | Yes |
| SSO | No | No | No | Yes |

## **10.2 Add-ons**

| Add-on | Price | Description |
| :---- | :---- | :---- |
| Extra calls | $39 / 100 calls | One-time burst for high-volume months |
| Extra phone number | $29/mo | Additional line for second location or emergency |
| Advanced AI model | $49/mo | Available for Starter and Pro plans |

# **11\. Design System**

## **11.1 Typography**

* **Primary font:** Geist (sans-serif)

* **Monospace font:** Geist Mono

* **Base size:** 14px (body), 11px (labels/mono), 13px (secondary)

## **11.2 Color Palette**

| Token | Hex | Usage |
| :---- | :---- | :---- |
| \--fg | \#09090B | Primary text |
| \--muted-fg | \#71717A | Secondary text |
| \--border | \#E4E4E7 | All borders |
| \--panel | \#FAFAFA | Sidebar background |
| \--brand | \#0EA5E9 | Brand blue / CTAs |
| \--success | \#22C55E | Positive states |
| \--warning | \#F59E0B | Warnings, amber states |
| \--destructive | \#EF4444 | Errors, danger zone |
| \--purple | \#8B5CF6 | Pro badges, accents |

## **11.3 Border Radius**

* \--r-sm: 6px (buttons, inputs, tags)

* \--r-md: 8px (cards, dropdowns)

* \--r-lg: 12px (panels, modals, hero cards)

## **11.4 Component Patterns**

* Sidebar: 240px fixed, zinc panel background

* Sub-sidebar: 200px, white background, brand-muted active state

* Slide-over panels: 480px, slide from right with backdrop

* Modals: centered with backdrop, 600px max width

* Toast notifications: bottom-right corner

* Save bar: fixed bottom bar for unsaved changes (dark background)

* Status badges: pill-shaped, color-coded

# **12\. Screen Inventory**

Complete list of all designed screens available as standalone HTML files for Figma import.

### **Authentication & Onboarding (Screens 01-16)**

| \# | Screen | Description |
| :---- | :---- | :---- |
| 01 | Signup | Email \+ password registration |
| 02 | Login | Email \+ password login |
| 03 | Onboard: Business Info | Business name \+ website URL input |
| 04 | Onboard: Scraped OK | Review auto-detected business info |
| 05 | Onboard: Scrape Failed | Manual entry fallback |
| 06 | Onboard: Services & Hours | Edit services list and business hours |
| 07 | Dashboard: Setup Wizard | 5-step setup hub |
| 08 | Dashboard: Phone Config | Phone number selection |
| 09 | Setup Hub | Central setup checklist |
| 10 | Setup: Calendar | Google Calendar connection |
| 11 | Setup: Calendar Connected | Calendar connected success state |
| 12 | Setup: Phone | Phone number claiming |
| 13 | Setup: Test Call | Live agent test interface |
| 14 | Setup: Complete | All steps done celebration |
| 15 | Setup: Configure Agent | Agent name, greeting, tone, system prompt |
| 16 | Test Agent Live | Immersive call test with live transcript |

### **Dashboard (Screens 17-24)**

| \# | Screen | Description |
| :---- | :---- | :---- |
| 17 | Call Log | Call list \+ detail slide-over \+ actions |
| 18a | Appointments: Booked | Calendar strip \+ booked appointments |
| 18b | Appointments: Leads | Warm leads with follow-up actions |
| 18c | Appointments: Completed | Past jobs with revenue |
| 18d | Appointments: Call Detail | Slide-over with transcript |
| 18e | Appointments: Completed Detail | Lifecycle timeline slide-over |
| 18f | Appointments: Send Quote | Quote SMS modal |
| 18g | Appointments: Send Financing | Financing SMS modal with KB warning |
| 18h | Appointments: Agent Call | Schedule outbound call modal |
| 19a | Agent Settings: Profile | Name, greeting, tone, system prompt |
| 19b | Agent Settings: Voice | Voice picker, speed, pause |
| 19c | Agent Settings: Call Handling | Emergency, hours, transfer, limits |
| 19d | Agent Settings: Vocabulary | Industry terms, streets, brands |
| 19e | Agent Settings: AI Model | Model selection with tradeoffs |
| 19f | Agent Settings: Workflows | Workflow list view |
| 20 | Workflow Builder | Visual drag-and-drop flow editor |
| 21 | Knowledge Base | Files, entries, insights sidebar |
| 21b | KB: Upload Flow | Multi-file upload with processing stages |
| 21c | KB: Add Entry | Manual entry modal with AI suggestions |
| 22 | Integrations | Google Calendar \+ coming soon grid |
| 23a | Settings: Business Profile | Company info, hours, service area |
| 23b | Settings: Team | Technician roster \+ on-call rotation |
| 23c | Settings: Notifications | Alert preferences per event type |
| 23d | Settings: Billing | Plan overview in sub-sidebar context |
| 23e | Settings: Account | Login, sessions, logout, delete |
| 24 | Billing | Full plan comparison \+ add-ons \+ invoices |

# **13\. Non-Functional Requirements**

## **13.1 Performance**

* Dashboard page load: \< 2 seconds

* Call Log search: \< 500ms

* Voice agent response latency: \< 1.5s (Standard), \< 0.8s (Fast), \< 2s (Advanced)

* Knowledge Base indexing: \< 60 seconds per file

* Google Calendar sync: \< 5 seconds for event creation

## **13.2 Scalability**

* Support 1,000 concurrent calls across all customers

* Handle 100,000+ knowledge base chunks in vector store

* Support 500+ customers on shared infrastructure

## **13.3 Security**

* All data encrypted at rest (AES-256) and in transit (TLS 1.3)

* Call recordings stored in encrypted S3 with customer-specific access

* OAuth tokens stored encrypted, refreshed automatically

* SOC 2 Type II compliance target for Year 2

* GDPR-compliant data deletion (account deletion removes all data within 30 days)

## **13.4 Reliability**

* 99.9% uptime SLA for voice agent (calls must not fail)

* Automatic failover: if AI is unavailable, calls route to voicemail or owner's phone

* Call recordings and transcripts stored with 99.99% durability

# **14\. MVP Scope & Phasing**

## **14.1 MVP (V1) — Launch**

Everything described in this document is V1 scope with the following exceptions:

### **Included in V1**

* Full onboarding flow with website scraping

* AI voice agent: inbound calls, booking, emergency detection

* Call Log with transcripts, AI summaries, and actions

* Appointments: booked, leads, completed tabs with insights

* Agent Settings: all 6 sub-sections

* Knowledge Base: file upload \+ manual entries \+ knowledge gaps

* Google Calendar integration

* Workflow builder (Business plan and above)

* Billing with 4 plans \+ add-ons

* Settings: business profile, team, notifications, account

### **Deferred to V2**

* SMS/text messaging integration

* ServiceTitan / Housecall Pro integration

* Email integration (Gmail/Outlook)

* Stripe payment collection during calls

* Zapier integration

* Outbound call campaigns (bulk follow-ups)

* Multi-location management (Enterprise)

* API access (Enterprise)

* SSO (Enterprise)

* Mobile app

## **14.2 Development Priority Order**

Recommended build sequence based on dependencies:

23. **Phase 1: Foundation —** Auth, database models, user account CRUD, Stripe billing integration

24. **Phase 2: Onboarding —** Signup flow, website scraping, setup hub, Google Calendar OAuth

25. **Phase 3: Voice Agent —** Telephony setup (Twilio/Vapi), STT/TTS pipeline, LLM conversation loop, call recording and transcription

26. **Phase 4: Knowledge Base —** File upload, text extraction, vector embedding, RAG retrieval integration with agent

27. **Phase 5: Dashboard —** Call Log, Appointments (all tabs \+ modals), insights sidebar, notification system

28. **Phase 6: Settings & Config —** Agent settings (all sub-sections), business profile, team management, workflow builder

29. **Phase 7: Polish & Launch —** Integration page, billing page, analytics/insights, QA, load testing, beta with 5-10 HVAC businesses

*End of Document*