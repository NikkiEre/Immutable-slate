import React, { ChangeEvent } from "react";
import { FormGroup, ControlLabel, FormControl, FormControlProps, HelpBlock } from "react-bootstrap";

type postValidFieldsType = {
  title: boolean;
  body: boolean;
};

interface EditorTitleType {
  changePostTitle: (e: ChangeEvent<FormControlProps>) => void;
  postValidFields: postValidFieldsType;
  isReadOnly?: boolean;
  postTitle?: string;
}

export const EditorTitle = React.memo(
  ({ postTitle, changePostTitle, isReadOnly, postValidFields }: EditorTitleType): JSX.Element => {
    return (
      <FormGroup controlId={"editorTitle"} validationState={postValidFields.title ? "error" : null}>
        <ControlLabel>Post title</ControlLabel>
        <FormControl
          type="text"
          value={postTitle}
          placeholder="Enter text"
          onChange={changePostTitle}
          disabled={isReadOnly}
          autoComplete={"off"}
        />
        {postValidFields.title && <HelpBlock>This field is required.</HelpBlock>}
      </FormGroup>
    );
  }
);
