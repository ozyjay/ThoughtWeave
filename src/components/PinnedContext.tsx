import { BranchThreadPreview } from "./BranchThreadPreview";
import type { ThoughtWeaveComponentProps } from "./componentTypes";

export function PinnedContext({ conversation, onBranchFromExcerpt }: ThoughtWeaveComponentProps) {
  const pinnedExcerpts = conversation.layoutState.pinnedExcerptIds
    .map((excerptId) => conversation.excerpts.find((excerpt) => excerpt.id === excerptId))
    .filter(Boolean);
  const activeExcerpt = pinnedExcerpts.at(-1);
  const linkedBranches = activeExcerpt
    ? conversation.branches.filter((branch) => branch.sourceExcerptId === activeExcerpt.id)
    : [];

  return (
    <div className="panel-content">
      <div className="panel-heading">
        <p className="eyebrow">Anchor</p>
        <h2>Pinned Context</h2>
      </div>
      {activeExcerpt ? (
        <>
          <article className="pinned-excerpt">
            <span>Source: {activeExcerpt.sourceSectionId}</span>
            <blockquote>{activeExcerpt.selectedText}</blockquote>
            {activeExcerpt.note ? <p>{activeExcerpt.note}</p> : null}
          </article>
          <div className="branch-actions">
            <button
              type="button"
              className="primary-button full-width"
              onClick={() => onBranchFromExcerpt(activeExcerpt.id)}
            >
              Branch from selection
            </button>
            <button type="button" className="secondary-button full-width">
              Ask follow-up
            </button>
          </div>
          <BranchThreadPreview branches={linkedBranches} />
        </>
      ) : (
        <p className="empty-state">Pin a response section to keep its source visible here.</p>
      )}
    </div>
  );
}
