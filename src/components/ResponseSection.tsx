import type { ResponseSection as ResponseSectionType } from "../types/conversation";
import type { ThoughtWeaveComponentProps } from "./componentTypes";

type ResponseSectionProps = ThoughtWeaveComponentProps & {
  section: ResponseSectionType;
};

export function ResponseSection({
  section,
  onSetReadingSection,
  onPinSection,
  onMarkRead,
  onMarkUnread
}: ResponseSectionProps) {
  return (
    <article
      className={`response-section is-${section.readState}`}
      aria-label={`${section.heading} ${section.readState}`}
      onClick={() => onSetReadingSection(section.id)}
    >
      <header>
        <div>
          <span className="section-status">{section.readState}</span>
          <h3>{section.heading}</h3>
        </div>
        <div className="section-actions">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onPinSection(section.id);
            }}
          >
            Pin section
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              section.readState === "read" ? onMarkUnread(section.id) : onMarkRead(section.id);
            }}
          >
            {section.readState === "read" ? "Mark unread" : "Mark read"}
          </button>
        </div>
      </header>
      {!section.collapsed || section.readState === "reading" ? <p>{section.content}</p> : null}
      {section.branchIds.length > 0 ? (
        <footer>
          <span>{section.branchIds.length} linked branch</span>
          <button type="button">Summarise branch</button>
        </footer>
      ) : null}
    </article>
  );
}
