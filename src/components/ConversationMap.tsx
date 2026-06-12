import type { ThoughtWeaveComponentProps } from "./componentTypes";

export function ConversationMap({ conversation, onSetReadingSection }: ThoughtWeaveComponentProps) {
  const sections = conversation.messages.flatMap((message) => message.sections ?? []);
  const readCount = sections.filter((section) => section.readState === "read").length;
  const progress = Math.round((readCount / sections.length) * 100);

  return (
    <div className="panel-content">
      <div className="panel-heading">
        <p className="eyebrow">Structure</p>
        <h2>Conversation Map</h2>
      </div>
      <div className="progress-card">
        <div>
          <strong>{progress}% reviewed</strong>
          <span>{conversation.readingTrail.unreadSectionIds.length} unread sections</span>
        </div>
        <div className="progress-track" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>
      <nav className="conversation-tree" aria-label="Conversation sections">
        <p className="tree-root">Initial Research Question</p>
        <p className="tree-branch">Long-form Response</p>
        <ol>
          {sections.map((section) => (
            <li key={section.id}>
              <button
                type="button"
                className={`tree-node is-${section.readState}`}
                onClick={() => onSetReadingSection(section.id)}
              >
                <span className="status-dot" aria-hidden="true" />
                <span>{section.heading.replace(/^\d+\.\s*/, "")}</span>
              </button>
            </li>
          ))}
        </ol>
      </nav>
      <div className="map-group">
        <h3>Branches</h3>
        {conversation.branches.map((branch) => (
          <article key={branch.id} className="branch-chip">
            <span>Follow-up</span>
            <p>{branch.title}</p>
          </article>
        ))}
      </div>
      <div className="map-group">
        <h3>Open Questions</h3>
        <p className="quiet-text">Which outcomes best capture durable improvement beyond symptom change?</p>
      </div>
    </div>
  );
}
