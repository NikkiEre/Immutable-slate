import React, { ReactNode } from "react";
import { Mark, Value } from "slate";
import { Editor, OnChangeParam } from "slate-react";
import { ControlLabel, FormGroup, HelpBlock } from "react-bootstrap";

import "./Editor.scss";

type renderMarkType = (
  props: { children: ReactNode; mark: Mark },
  editor: Editor,
  next: () => void
) => JSX.Element | void;

type pluginsType = {
  onKeyDown(event: React.KeyboardEvent, editor: Editor, next: () => void): void;
}[];

type handleKeyDownType = (event: React.KeyboardEvent, editor: Editor, next: () => void) => void;

type postValidFieldsType = {
  title: boolean;
  body: boolean;
};

interface EditorItemType {
  postText: Value;
  changePostText: (e: OnChangeParam) => void;
  renderMark: renderMarkType;
  plugins: pluginsType;
  handleKeyDown: handleKeyDownType;
  postValidFields: postValidFieldsType;
  isReadOnly?: boolean;
}

export const EditorItem = React.memo(
  ({
    postText,
    changePostText,
    isReadOnly,
    renderMark,
    plugins,
    handleKeyDown,
    postValidFields,
  }: EditorItemType): JSX.Element => {
    return (
      <section>
        <FormGroup validationState={postValidFields.body ? "error" : null}>
          <ControlLabel>Post body</ControlLabel>
          <Editor
            plugins={plugins}
            value={postText}
            onChange={changePostText}
            onKeyDown={handleKeyDown}
            renderMark={renderMark}
            placeholder="Write text post"
            readOnly={isReadOnly}
            className={`editor__field ${
              postValidFields.body ? "editor__field_error" : "editor__field_focus"
            }`}
          />
          {postValidFields.body && <HelpBlock>This field is required.</HelpBlock>}
        </FormGroup>
      </section>
    );
  }
);
