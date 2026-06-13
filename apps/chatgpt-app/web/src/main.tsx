import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

type LensSection = {
  id: string;
  title: string;
  body: string;
  status: "active" | "supporting" | "unresolved";
};

type PinnedExcerpt = {
  id: string;
  label: string;
  text: string;
};

type SuggestedPanel = {
  id: string;
  title: string;
  reason: string;
};

type NextAction = {
  id: string;
  label: string;
  prompt: string;
};

type ReadingLens = {
  summary: string;
  mode: "research" | "debugging" | "writing" | "decision" | "general";
  user_goal?: string;
  sections: LensSection[];
  pinned_excerpts: PinnedExcerpt[];
  open_questions: string[];
  suggested_panels: SuggestedPanel[];
  next_actions: NextAction[];
  state_version: number;
};

declare global {
  interface Window {
    openai?: {
      toolOutput?: unknown;
      toolResponseMetadata?: unknown;
      widgetState?: unknown;
      setWidgetState?: (state: unknown) => void;
      sendFollowUpMessage?: (message: { prompt: string; scrollToBottom?: boolean }) => Promise<void>;
    };
  }
}

const fallbackLens: ReadingLens = {
  summary: "ThoughtWeave is ready to render a reading lens from provided conversation context.",
  mode: "general",
  sections: [
    {
      id: "fallback-current-thread",
      title: "Waiting for context",
      body: "Ask ChatGPT to create and render a ThoughtWeave reading lens from the current conversation context.",
      status: "active"
    }
  ],
  pinned_excerpts: [],
  open_questions: ["What part of this conversation should ThoughtWeave help you hold onto?"],
  suggested_panels: [
    {
      id: "reading-lens",
      title: "Reading Lens",
      reason: "A stable panel appears once tool-provided context is available."
    }
  ],
  next_actions: [],
  state_version: 1
};

function isReadingLens(value: unknown): value is ReadingLens {
  const candidate = value as Partial<ReadingLens> | undefined;
  return Boolean(
    candidate &&
      typeof candidate.summary === "string" &&
      Array.isArray(candidate.sections) &&
      Array.isArray(candidate.suggested_panels)
  );
}

function readInitialLens(): ReadingLens {
  return isReadingLens(window.openai?.toolOutput) ? window.openai.toolOutput : fallbackLens;
}

function App() {
  const [lens, setLens] = useState<ReadingLens>(() => readInitialLens());
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    () => new Set([readInitialLens().sections[0]?.id ?? "fallback-current-thread"])
  );

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.source !== window.parent) {
        return;
      }

      const message = event.data;
      if (!message || message.jsonrpc !== "2.0" || message.method !== "ui/notifications/tool-result") {
        return;
      }

      const data = message.params?.structuredContent;
      if (isReadingLens(data)) {
        setLens(data);
        setExpandedSections(new Set([data.sections[0]?.id ?? "section-current-thread"]));
      }
    };

    window.addEventListener("message", handleMessage, { passive: true });
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    window.openai?.setWidgetState?.({
      expandedSections: [...expandedSections],
      stateVersion: lens.state_version
    });
  }, [expandedSections, lens.state_version]);

  const modeLabel = useMemo(() => lens.mode.replace(/^\w/, (letter) => letter.toUpperCase()), [lens.mode]);

  function toggleSection(sectionId: string) {
    setExpandedSections((current) => {
      const next = new Set(current);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  }

  async function sendFollowUp(prompt: string) {
    if (!window.openai?.sendFollowUpMessage) {
      return;
    }

    await window.openai.sendFollowUpMessage({ prompt, scrollToBottom: true });
  }

  return (
    <main className="thoughtweave-widget" aria-label="ThoughtWeave Reading Lens">
      <header className="hero">
        <div>
          <p className="eyebrow">ThoughtWeave</p>
          <h1>Reading Lens</h1>
        </div>
        <span className="mode-pill">{modeLabel}</span>
      </header>

      <section className="summary-band" aria-label="Lens summary">
        <p>{lens.summary}</p>
        {lens.user_goal ? <small>Goal: {lens.user_goal}</small> : null}
      </section>

      <section className="section-list" aria-label="Reading lens sections">
        {lens.sections.map((section) => (
          <article className="lens-section" data-status={section.status} key={section.id}>
            <button type="button" onClick={() => toggleSection(section.id)} aria-expanded={expandedSections.has(section.id)}>
              <span>{section.title}</span>
              <span>{expandedSections.has(section.id) ? "Hide" : "Show"}</span>
            </button>
            {expandedSections.has(section.id) ? <p>{section.body}</p> : null}
          </article>
        ))}
      </section>

      <div className="panel-grid">
        <section aria-label="Pinned context">
          <h2>Pinned Context</h2>
          {lens.pinned_excerpts.length > 0 ? (
            lens.pinned_excerpts.map((excerpt) => (
              <blockquote key={excerpt.id}>
                <strong>{excerpt.label}</strong>
                <span>{excerpt.text}</span>
              </blockquote>
            ))
          ) : (
            <p className="empty-state">No pinned excerpt yet.</p>
          )}
        </section>

        <section aria-label="Open questions">
          <h2>Open Questions</h2>
          <ul>
            {lens.open_questions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="suggestions" aria-label="Suggested panels">
        <h2>Suggested Panels</h2>
        <div>
          {lens.suggested_panels.map((panel) => (
            <article key={panel.id}>
              <strong>{panel.title}</strong>
              <span>{panel.reason}</span>
            </article>
          ))}
        </div>
      </section>

      {lens.next_actions.length > 0 ? (
        <section className="actions" aria-label="Next actions">
          <h2>Next Actions</h2>
          {lens.next_actions.map((action) => (
            <button type="button" key={action.id} onClick={() => void sendFollowUp(action.prompt)}>
              {action.label}
            </button>
          ))}
        </section>
      ) : null}
    </main>
  );
}

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
