import type { ThoughtWeaveComponentProps } from "./componentTypes";
import { PromptBox } from "./PromptBox";
import { ResponseSection } from "./ResponseSection";

export function ActiveChat(props: ThoughtWeaveComponentProps) {
  const { conversation } = props;
  const userMessage = conversation.messages.find((message) => message.role === "user");
  const assistantMessage = conversation.messages.find((message) => message.role === "assistant");
  const sections = assistantMessage?.sections ?? [];

  return (
    <div className="panel-content active-chat">
      <div className="panel-heading wide-heading">
        <div>
          <p className="eyebrow">Primary thread</p>
          <h2>Active Chat</h2>
        </div>
        <span className="layout-pill">Research Review Layout</span>
      </div>
      {userMessage ? (
        <article className="message user-message">
          <span className="message-role">Research question</span>
          <p>{userMessage.content}</p>
        </article>
      ) : null}
      <article className="message assistant-message">
        <span className="message-role">Assistant response</span>
        <p>{assistantMessage?.content}</p>
      </article>
      <div className="section-list">
        {sections.map((section) => (
          <ResponseSection key={section.id} section={section} {...props} />
        ))}
      </div>
      <PromptBox />
    </div>
  );
}
