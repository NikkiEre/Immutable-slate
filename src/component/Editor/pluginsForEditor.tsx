import React, { ReactNode } from "react";
import { Mark } from "slate";
import { Editor } from "slate-react";

export function renderMark(
  props: { children: ReactNode; mark: Mark },
  editor: Editor,
  next: () => void
): JSX.Element | void {
  switch (props.mark.type) {
    case "bold":
      return <strong>{props.children}</strong>;
    case "italic":
      return <em>{props.children}</em>;
    case "underline":
      return <u>{props.children}</u>;
    default:
      return next();
  }
}

function MarkHotkey(options: { type: string; key: string }) {
  const { type, key } = options;

  return {
    onKeyDown(event: React.KeyboardEvent, editor: Editor, next: () => void): void {
      if (!event.ctrlKey || event.key !== key) return next();
      event.preventDefault();
      editor.toggleMark(type);
    },
  };
}

export const handleKeyDown = (
  event: React.KeyboardEvent,
  editor: Editor,
  next: () => void
): void => {
  if (event.key !== "b" || !event.ctrlKey) return next();
  event.preventDefault();
  editor.toggleMark("bold");
};

export const plugins = [
  MarkHotkey({ key: "b", type: "bold" }),
  MarkHotkey({ key: "i", type: "italic" }),
  MarkHotkey({ key: "u", type: "underline" }),
  MarkHotkey({ key: "и", type: "bold" }),
  MarkHotkey({ key: "ш", type: "italic" }),
  MarkHotkey({ key: "г", type: "underline" }),
];
