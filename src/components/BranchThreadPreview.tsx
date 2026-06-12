import type { Branch } from "../types/conversation";

type BranchThreadPreviewProps = {
  branches: Branch[];
};

export function BranchThreadPreview({ branches }: BranchThreadPreviewProps) {
  return (
    <div className="branch-preview">
      <h3>Follow-up preview</h3>
      {branches.length > 0 ? (
        branches.map((branch) => (
          <article key={branch.id}>
            <span>Linked branch</span>
            <p>{branch.title}</p>
            {branch.summary ? <small>{branch.summary}</small> : null}
          </article>
        ))
      ) : (
        <p className="quiet-text">No branch has been started from this excerpt yet.</p>
      )}
    </div>
  );
}
