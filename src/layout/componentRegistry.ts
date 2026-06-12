import { ActiveChat } from "../components/ActiveChat";
import { ConversationMap } from "../components/ConversationMap";
import { PinnedContext } from "../components/PinnedContext";
import { ReadingTrail } from "../components/ReadingTrail";
import type { ThoughtWeaveComponentProps } from "../components/componentTypes";
import type { ReactElement } from "react";
import type { LayoutComponentName } from "./layoutSchema";

export type RegisteredComponent = (props: ThoughtWeaveComponentProps) => ReactElement;

export const componentRegistry: Record<LayoutComponentName, RegisteredComponent> = {
  ConversationMap,
  ActiveChat,
  PinnedContext,
  ReadingTrail
};
