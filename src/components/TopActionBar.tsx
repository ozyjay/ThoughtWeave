type TopActionBarProps = {
  appName: string;
  layoutName: string;
  goal: string;
  onResumeReading: () => void;
};

export function TopActionBar({ appName, layoutName, goal, onResumeReading }: TopActionBarProps) {
  return (
    <header className="top-action-bar">
      <div className="brand-block">
        <p className="eyebrow">{appName}</p>
        <h1>Adaptive interfaces for deep conversations</h1>
      </div>
      <div className="layout-summary" aria-label="Current layout">
        <span>{layoutName}</span>
        <p>{goal}</p>
      </div>
      <div className="top-actions">
        <button type="button" className="secondary-button">
          Generate Conversation Layout
        </button>
        <button type="button" className="primary-button" onClick={onResumeReading}>
          Resume reading
        </button>
      </div>
    </header>
  );
}
