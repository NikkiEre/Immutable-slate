import React, { ChangeEvent } from "react";
import { Form, FormControlProps } from "react-bootstrap";
import { Value } from "slate";
import { OnChangeParam } from "slate-react";

import { EditorTitle } from "../EditorTitle/EditorTitle";
import { EditorItem } from "../Editor/Editor";
import { renderMark, plugins, handleKeyDown } from "../Editor/pluginsForEditor";

type postValidFieldsType = {
  title: boolean;
  body: boolean;
};

interface EditorBlockType {
  changePostTitle: (e: ChangeEvent<FormControlProps>) => void;
  postText: Value;
  changePostText: (e: OnChangeParam) => void;
  postValidFields: postValidFieldsType;
  isReadOnly?: boolean;
  postTitle?: string;
}

export const EditorBlock = React.memo(
  ({
    postTitle,
    changePostTitle,
    postText,
    changePostText,
    isReadOnly,
    postValidFields,
  }: EditorBlockType): JSX.Element => {
    return (
      <section>
        <Form>
          <EditorTitle
            postTitle={postTitle}
            changePostTitle={changePostTitle}
            isReadOnly={isReadOnly}
            postValidFields={postValidFields}
          />
          <EditorItem
            postText={postText}
            changePostText={changePostText}
            isReadOnly={isReadOnly}
            renderMark={renderMark}
            plugins={plugins}
            handleKeyDown={handleKeyDown}
            postValidFields={postValidFields}
          />
        </Form>
      </section>
    );
  }
);
