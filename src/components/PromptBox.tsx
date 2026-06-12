export function PromptBox() {
  return (
    <form className="prompt-box">
      <label htmlFor="follow-up-prompt">Active prompt area</label>
      <div>
        <input
          id="follow-up-prompt"
          type="text"
          value="Ask a focused side question without losing my reading position..."
          readOnly
        />
        <button type="button">Ask follow-up</button>
      </div>
    </form>
  );
}
