import type { ThoughtWeaveComponentProps } from "./componentTypes";

export function ReadingTrail({ conversation, onResumeReading, onSetReadingSection }: ThoughtWeaveComponentProps) {
  const sections = conversation.messages.flatMap((message) => message.sections ?? []);
  const lastReadSection = sections.find(
    (section) => section.id === conversation.readingTrail.lastReadSectionId
  );
  const unreadSections = conversation.readingTrail.unreadSectionIds
    .map((sectionId) => sections.find((section) => section.id === sectionId))
    .filter(Boolean);

  return (
    <div className="panel-content">
      <div className="panel-heading">
        <p className="eyebrow">Return path</p>
        <h2>Reading Trail</h2>
      </div>
      <article className="resume-card">
        <span>Last reading position</span>
        <strong>{lastReadSection?.heading ?? "No section selected"}</strong>
        <button type="button" className="primary-button" onClick={onResumeReading}>
          Resume reading
        </button>
      </article>
      <div className="unread-list">
        <h3>Unread sections</h3>
        {unreadSections.map((section) =>
          section ? (
            <button key={section.id} type="button" onClick={() => onSetReadingSection(section.id)}>
              <span>{section.heading}</span>
              <small>{section.readState}</small>
            </button>
          ) : null
        )}
      </div>
    </div>
  );
}
