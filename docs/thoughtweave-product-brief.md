# ThoughtWeave Product Brief

# Adaptive Interfaces for Deep Conversations

## Purpose

ThoughtWeave is a standalone desktop app prototype exploring adaptive interfaces for deep conversations.

The project investigates whether a conversation can become a first-class object whose structure is interpreted and surfaced through adaptive UX.

Instead of presenting every discussion as a linear chat transcript, ThoughtWeave seeks to identify conversational structure and adapt the interface to support the user's current activity.

The first implementation focuses on long-form AI conversations, such as conversations with ChatGPT or ChatGPT-like assistants, but the concept should not be locked to any one AI system.

---

## Core Hypothesis

Deep conversations are not linear.

As a conversation grows, it develops structure:

- branches
- themes
- supporting context
- unresolved questions
- evidence chains
- reading paths
- decisions
- tasks
- competing ideas
- summaries
- contradictions
- follow-up trails
- source relationships

Traditional chat interfaces represent all of this as a vertical message stream.

ThoughtWeave explores whether an adaptive interface can surface these structures and reorganise itself around them.

The goal is not simply to improve scrolling.

The goal is to support the shape of thought as it emerges through conversation.

---

## Core Product Principle

The conversation is the primary object.

The interface should adapt to the structure and intent of the conversation.

The user should never lose:

- context
- reading position
- branch history
- conversational lineage
- pinned excerpts
- unresolved questions
- current thread of thought

Do not build a system that generates arbitrary UI code.

Instead, build a constrained system where a model or planner can eventually generate a **layout specification** that is validated and rendered using known components.

Preferred model:

```text
Deep conversation unfolds
        ↓
Conversational structure emerges
        ↓
ThoughtWeave models that structure
        ↓
A layout planner selects useful interface components
        ↓
A validated layout spec is rendered
        ↓
The user can read, branch, return, compare, and continue
```

Avoid:

```text
User prompt
        ↓
Model generates arbitrary HTML/JS
        ↓
Unsafe, unstable, hard-to-test UI
```

ThoughtWeave should provide personalised UX through safe composition, not uncontrolled generated interfaces.

---

## First MVP Scenario

Build the first prototype around a **Research Review** workflow.

Scenario:

1. User opens the ThoughtWeave desktop app.
2. User sees a long-form AI conversation.
3. The assistant response is divided into readable sections.
4. Some sections are marked as read.
5. One section is currently being read.
6. Later sections are marked unread or collapsed.
7. User selects or pins a specific excerpt.
8. The excerpt appears in a pinned context panel.
9. User starts a follow-up branch from that excerpt.
10. The original response remains visible or recoverable.
11. User can return to the original response and continue reading unread sections.

This scenario should be demonstrable with mock data before integrating any real ChatGPT or API backend.

The first prototype should show the idea clearly, even if most behaviour is mocked.

---

## Product Identity

Use:

```text
ThoughtWeave
Adaptive interfaces for deep conversations
```

Short description:

```text
ThoughtWeave treats long-form conversations as evolving structures of thoughts, branches, contexts, questions, and reasoning paths. The interface adapts to support that structure.
```

Working repo name:

```text
thoughtweave
```

Suggested app display name:

```text
ThoughtWeave
```

Suggested action prefix:

```text
ThoughtWeave
```

Example action names:

```text
ThoughtWeave: Open Research Review
ThoughtWeave: Generate Conversation Layout
ThoughtWeave: Resume Reading
ThoughtWeave: Branch From Selection
```

---

## Conversational Structures

ThoughtWeave treats conversations as evolving structures rather than message lists.

Different kinds of conversations may form different structures.

### Research Discussion

Possible structures:

- literature branches
- evidence trails
- claims to verify
- unresolved questions
- synthesis paths
- methodological notes
- source comparisons
- reading progress

Useful interface elements:

- Conversation Map
- Pinned Context
- Reading Trail
- Open Questions
- Evidence Trail
- Claim Cards
- Summary Pane

### Debugging Discussion

Possible structures:

- hypotheses
- attempted fixes
- observed outputs
- error history
- current working theory
- next action
- code references

Useful interface elements:

- Error Log
- Attempted Fixes
- Current Hypothesis
- Task List
- Code Context
- Decision Log

### Teaching Discussion

Possible structures:

- concepts
- examples
- activities
- assessment ideas
- student misconceptions
- lesson sequence

Useful interface elements:

- Concept Map
- Example Bank
- Lesson Outline
- Activity Cards
- Assessment Ideas

### Writing Discussion

Possible structures:

- drafts
- revisions
- argument chains
- supporting evidence
- discarded alternatives
- editorial decisions

Useful interface elements:

- Draft Panel
- Revision Branches
- Argument Map
- Decision Log
- Extracted Ideas

The same conversation may move through several structures over time.

---

## UX Model

The initial prototype should use a multi-pane interface.

For the first Research Review layout, use these regions:

```text
┌─────────────────────┬──────────────────────────┬─────────────────────┐
│ Conversation Map     │ Active Chat               │ Pinned Context      │
│                     │                          │                     │
│ Thread outline       │ Long response sections    │ Selected excerpt    │
│ Branches             │ Read/unread markers       │ Branch actions      │
│ Progress             │ Active prompt area         │ Follow-up preview   │
│                     │                          ├─────────────────────┤
│                     │                          │ Reading Trail       │
│                     │                          │ Return/unread state │
└─────────────────────┴──────────────────────────┴─────────────────────┘
```

### Required UI regions

#### 1. Conversation Map

Shows the structure of the conversation.

It should include:

- initial user prompt
- assistant long-form response
- response sections
- branch threads
- open questions
- status markers
- read/unread progress

Example tree:

```text
Conversation Map
├─ Initial Research Question
│  └─ Long-form Response
│     ├─ 1. Evaluation Frameworks ✓
│     ├─ 2. Study Designs ✓
│     ├─ 3. Metrics and Outcomes ← reading now
│     ├─ 4. Data Considerations ○ unread
│     ├─ 5. Common Limitations ○ unread
│     └─ 6. Practical Recommendations ○ unread
├─ Follow-up on Method
├─ Literature Check
└─ Open Questions
```

#### 2. Active Chat

Shows the main conversation.

The active chat should support:

- user messages
- assistant messages
- sectioned long responses
- collapsible sections
- read/unread indicators
- focused/current reading section
- selection or pin actions
- prompt input area

For the first prototype, this can use mock chat data.

#### 3. Pinned Context

Shows a selected excerpt from an earlier response.

It should include:

- source reference
- selected excerpt
- action: `Branch from selection`
- any linked follow-up thread preview

#### 4. Reading Trail

Shows where the user left off.

It should include:

- return to source response
- last read section
- unread sections
- resume reading action

---

## Core Interactions

Implement these first.

### Pin Section

User can pin a response section or excerpt into the Pinned Context panel.

### Branch From Selection

User can select a section or excerpt and start a linked follow-up branch.

A branch must remember its source.

A branch should not destroy or replace the original conversation.

### Resume Reading

User can return to the original response and continue from the first unread section.

### Mark Read / Unread

User can mark a section as read or unread.

This can be automatic later, but for MVP it can be manual.

### Collapse / Expand Section

Long assistant responses should be easier to scan by section.

### Suggested Layout

The app should eventually support a command such as:

```text
ThoughtWeave: Generate Conversation Layout
```

Example user description:

```text
I am reviewing a long research conversation and need to ask side questions without losing my reading position.
```

The system should produce a layout spec for the Research Review layout.

For MVP, this can be hard-coded before adding model-generated specs.

---

## Architecture Direction

Use an Electron desktop shell with a React renderer UI.

Preferred stack:

```text
Electron Main Process
- TypeScript
- secure app window lifecycle
- preload bridge
- future persistence
- validated IPC/message passing

Renderer Frontend
- React preferred, but Svelte is acceptable if already chosen
- TypeScript
- component registry
- local state store
- CSS modules or lightweight styling

State / Data
- mock JSON data first
- later persistent workspace storage
- later model/API-backed chat state

Planner
- hard-coded layout specs first
- JSON schema validation
- later model-generated layout specs
```

Do not over-engineer the first version.

Prioritise a working interaction prototype over backend completeness.

---

## Important Technical Constraint

Do not assume that the consumer ChatGPT web app can be safely or reliably inspected, controlled, scraped, or manipulated from inside the desktop app.

For the first prototype, use one of these safer approaches:

1. **Mock chat data** for the UX prototype.
2. **API-backed chat surface** later, if the project needs full control over messages and metadata.
3. **Manual capture from an embedded ChatGPT surface** only if embedding is viable and does not require unsupported DOM scraping.

The adaptive interface should be designed so it can work with either:

- mock conversation data
- API-backed conversation data
- manually captured excerpts

Do not make the architecture depend on unsupported access to the internal DOM of a third-party web app.

---

## Data Model

Use a richer model than a basic `messages[]` array.

Suggested conceptual model:

```ts
type Conversation = {
  id: string;
  title: string;
  messages: Message[];
  branches: Branch[];
  readingTrail: ReadingTrail;
  layoutState: LayoutState;
};

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  sections?: ResponseSection[];
};

type ResponseSection = {
  id: string;
  messageId: string;
  heading: string;
  content: string;
  order: number;
  readState: "unread" | "reading" | "read";
  collapsed: boolean;
  pins: string[];
  branchIds: string[];
};

type Excerpt = {
  id: string;
  sourceMessageId: string;
  sourceSectionId?: string;
  selectedText: string;
  note?: string;
  createdAt: string;
};

type Branch = {
  id: string;
  title: string;
  sourceExcerptId: string;
  messages: Message[];
  summary?: string;
  createdAt: string;
};

type ReadingTrail = {
  lastReadMessageId?: string;
  lastReadSectionId?: string;
  unreadSectionIds: string[];
};

type LayoutState = {
  currentLayoutId: string;
  visiblePanels: string[];
  pinnedExcerptIds: string[];
};
```

This does not need to be final, but it should guide implementation.

---

## Layout Spec Model

The adaptive UI should be driven by a validated layout spec.

Example:

```json
{
  "layoutId": "research-review",
  "layoutName": "Research Review Layout",
  "goal": "Support partial reading, anchored follow-up, and return-to-source navigation.",
  "regions": [
    {
      "id": "left",
      "component": "ConversationMap",
      "props": {
        "showBranches": true,
        "showReadProgress": true
      }
    },
    {
      "id": "center",
      "component": "ActiveChat",
      "props": {
        "showSectionStatus": true,
        "allowInlinePinning": true
      }
    },
    {
      "id": "rightTop",
      "component": "PinnedContext",
      "props": {
        "allowBranchFromSelection": true
      }
    },
    {
      "id": "rightBottom",
      "component": "ReadingTrail",
      "props": {
        "showUnreadSections": true,
        "showReturnToSource": true
      }
    }
  ],
  "actions": [
    "pinSection",
    "branchFromSelection",
    "resumeReading",
    "markRead",
    "markUnread"
  ]
}
```

The app should validate layout specs before rendering.

Only render components that exist in the component registry.

Do not execute layout-generated code.

---

## Component Registry

Create a component registry.

Example:

```ts
const componentRegistry = {
  ConversationMap,
  ActiveChat,
  PinnedContext,
  ReadingTrail,
  BranchThread,
  NotesPanel,
  TaskList,
  DecisionLog,
  OpenQuestions,
  SummaryPanel,
  CompareResponses
};
```

The layout spec may reference components by name.

If a component is missing, the renderer should show a safe fallback rather than crash.

Example fallback:

```text
Unsupported component: LiteratureMatrix
```

---

## First Components to Build

Prioritise these components:

1. `AppShell`
2. `TopActionBar`
3. `ConversationMap`
4. `ActiveChat`
5. `ResponseSection`
6. `PinnedContext`
7. `BranchThreadPreview`
8. `ReadingTrail`
9. `PromptBox`
10. `LayoutRenderer`

Optional later:

- `NotesPanel`
- `OpenQuestions`
- `DecisionLog`
- `TaskList`
- `CompareResponses`
- `SummaryPanel`
- `SearchPanel`
- `EvidenceTrail`
- `ClaimCards`
- `ArgumentMap`

---

## Suggested File Structure

Use this structure unless the existing scaffold suggests a better one.

```text
thoughtweave/
├─ package.json
├─ tsconfig.json
├─ AGENTS.md
├─ README.md
├─ src/
├─ electron/
│  ├─ main.ts
│  └─ preload.ts
├─ src/
│  ├─ main.tsx
│  ├─ App.tsx
│  ├─ components/
│  │  ├─ AppShell.tsx
│  │  ├─ TopActionBar.tsx
│  │  ├─ ConversationMap.tsx
│  │  ├─ ActiveChat.tsx
│  │  ├─ ResponseSection.tsx
│  │  ├─ PinnedContext.tsx
│  │  ├─ BranchThreadPreview.tsx
│  │  └─ ReadingTrail.tsx
│  ├─ layout/
│  │  ├─ componentRegistry.ts
│  │  ├─ LayoutRenderer.tsx
│  │  ├─ layoutSchema.ts
│  │  └─ layouts.ts
│  ├─ state/
│  │  ├─ conversationState.ts
│  │  └─ mockConversation.ts
│  ├─ types/
│  │  └─ conversation.ts
│  └─ styles/
│     └─ app.css
└─ docs/
   └─ thoughtweave-product-brief.md
```

Adapt as needed for the actual desktop app scaffold.

---

## MVP Build Plan

When asked to begin implementation, do not start by coding everything.

First produce a plan.

The plan should include:

1. repo inspection
2. proposed stack
3. first file structure
4. first mock data model
5. first UI components
6. desktop shell security approach
7. build/test commands
8. staged implementation sequence

Then wait for approval before making broad changes.

### Stage 1: Scaffold

Create a minimal Electron app that opens a standalone desktop window.

Acceptance criteria:

- `npm run dev` launches the ThoughtWeave desktop app
- app window displays static placeholder content
- Electron uses context isolation and a narrow preload bridge
- app compiles

### Stage 2: Static Research Review UI

Implement the researcher layout with mock data.

Acceptance criteria:

- three-pane layout appears
- top action bar appears
- conversation map appears
- active chat appears
- pinned context appears
- reading trail appears
- UI resembles a polished prototype, not a raw debug page

### Stage 3: Interaction State

Add interaction behaviour.

Acceptance criteria:

- clicking a response section marks it as reading
- read/unread state can be changed
- pinning a section updates Pinned Context
- branch from selection creates a branch preview
- resume reading jumps to first unread section

### Stage 4: Layout Spec Renderer

Move from hard-coded layout to JSON-driven layout.

Acceptance criteria:

- layout spec defines regions and components
- renderer maps components via registry
- invalid component names fail safely
- research review layout is produced from a spec

### Stage 5: Promptable Layout Stub

Add an app input where the user describes a desired conversational mode or activity.

For MVP, use rule-based matching, not a real model call.

Example mappings:

```text
"research", "review", "reading", "unread" → Research Review Layout
"debug", "error", "fix" → Debugging Layout placeholder
"write", "draft", "synthesis" → Writing Layout placeholder
"teach", "lesson", "activity" → Teaching Layout placeholder
```

Acceptance criteria:

- user can enter a scenario description
- app proposes or applies a layout
- unsupported scenario gives a helpful fallback

### Stage 6: Model-Generated Layout Spec

Only after the above works, add optional model-based layout planning.

Acceptance criteria:

- model output is constrained to layout schema
- invalid specs are rejected
- unknown components are rejected
- user can preview before applying
- user can revert layout changes

---

## Coding Guidelines

Use TypeScript.

Prefer explicit types for conversation and layout state.

Keep components small.

Avoid premature abstraction.

Prefer mock data until the UX flow is working.

Do not add large dependencies without explaining why.

If using React, keep state management simple at first.

Use accessible HTML where possible.

Use semantic buttons for actions.

Support keyboard navigation for key actions where practical.

Avoid tiny text and overcrowded panels.

The UI should feel like a serious research tool, not a toy demo.

---

## Security Guidelines

Electron apps need careful security treatment.

Follow these rules:

- use a content security policy
- keep Node integration disabled in the renderer
- use context isolation and a narrow preload bridge
- do not load arbitrary external scripts
- do not execute generated JavaScript from model output
- sanitise rendered user/model text if using HTML rendering
- prefer plain text rendering for mock messages
- validate all messages crossing the main/renderer boundary
- never store secrets in renderer state
- do not scrape or manipulate third-party web app DOMs

If unsure, choose the simpler and safer implementation.

---

## UX Requirements

The first UI should communicate the concept clearly.

It should show:

- a left conversation map
- a central active chat
- a right pinned context panel
- a reading trail
- branch-from-selection affordance
- read/unread state
- resume reading affordance

Tone:

- clean
- modern
- academic/professional
- calm
- practical
- desktop-native enough to feel focused, but visually calm and practical

Use these labels in the first prototype:

- `ThoughtWeave`
- `Research Review Layout`
- `Conversation Map`
- `Active Chat`
- `Pinned Context`
- `Reading Trail`
- `Pin section`
- `Ask follow-up`
- `Resume reading`
- `Summarise branch`
- `Branch from selection`
- `Unread sections`

---

## Mock Conversation Content

Use this theme for initial mock data:

Research topic:

```text
What are the most robust evaluation frameworks for measuring the impact of digital mental health interventions in adults?
```

Assistant response sections:

```text
1. Evaluation Frameworks
2. Study Designs
3. Metrics and Outcomes
4. Data Considerations
5. Common Limitations
6. Practical Recommendations
```

Pinned excerpt example:

```text
Outcomes should be multi-dimensional and patient-centered. Core domains include clinical outcomes, functioning and quality of life, engagement and adherence, and implementation outcomes such as reach, adoption, fidelity, and sustainability.
```

Follow-up branch example:

```text
Which patient-reported outcome measures are most sensitive to change?
```

---

## Non-Goals for the First Prototype

Do not implement these in the first pass:

- arbitrary generated HTML UI
- arbitrary generated JavaScript
- full ChatGPT account embedding
- DOM scraping of ChatGPT
- full graph visualisation
- multi-user sync
- cloud backend
- authentication
- real citations
- real literature search
- production-grade persistence
- plugin marketplace packaging
- complex animations

These can be considered later.

---

## Key Design Risks

### Risk 1: Over-flexible UI

If the UI changes too often, users may feel lost.

Mitigation:

- keep the chat stable
- make layout changes user-triggered
- provide preview/apply/revert
- allow saved layouts

### Risk 2: Weak conversation anchoring

Branches are not useful unless they link back to exact source material.

Mitigation:

- every branch should store `sourceMessageId`
- where possible, also store `sourceSectionId`
- for excerpts, store selected text and a hash

### Risk 3: Too much model autonomy

The model should not freely invent UI.

Mitigation:

- validate layout specs
- use a known component registry
- reject unknown actions
- render fallback states

### Risk 4: Embedding assumptions

The project may not be able to deeply embed/control the full ChatGPT web app.

Mitigation:

- start with mock data
- design an API-backed path
- support manual capture
- do not depend on third-party DOM access

---

## Definition of Done for First Prototype

The first prototype is done when:

- the desktop app opens in its own ThoughtWeave window
- the app shows the Research Review Layout
- the layout contains realistic mock conversation data
- sections visibly show read, reading, and unread states
- pinned context is visible
- reading trail is visible
- the UI clearly communicates branching and resume-reading
- no real ChatGPT integration is required
- no arbitrary generated code is executed
- the code is clean enough to extend in the next step

---

## Future Research Questions

ThoughtWeave may later explore:

- Can conversational structure be inferred automatically?
- Can adaptive interfaces improve comprehension of long-form discussions?
- Can reading position and conversational lineage reduce cognitive load?
- Can small local models generate useful layout specifications?
- Can conversational structures be classified into reusable patterns?
- Can interface adaptation improve flow during deep reasoning activities?
- Can different conversation types produce recognisably different UX needs?
- Can a user co-design the interface through conversation rather than settings panels?

---

## Longer-Term Vision

Eventually, ThoughtWeave should let users engage in deep conversations where the interface adapts to the mode of thinking.

The same conversation may move through several modes over time.

Examples:

```text
Exploration Mode
- broad questions
- idea branches
- emerging themes
- open questions

Review Mode
- reading progress
- pinned excerpts
- source response
- unread sections

Comparison Mode
- two or more responses
- competing claims
- evidence differences
- decision support

Writing Mode
- source conversation
- extracted ideas
- draft panel
- revision branches

Debugging Mode
- error log
- attempted fixes
- observations
- current hypothesis
- next action

Teaching Mode
- concepts
- examples
- activities
- assessment ideas
```

The long-term product claim is:

> Deep conversations develop structure. ThoughtWeave adapts the interface to that structure.

Keep the implementation bounded, testable, and user-controlled.
