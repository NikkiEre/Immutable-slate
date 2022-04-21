import React, { ChangeEvent } from "react";
import { Modal, FormControlProps, Button } from "react-bootstrap";
import { Value } from "slate";
import { OnChangeParam } from "slate-react";

import { EditorBlock } from "../EditorBlock/EditorBlock";

type postValidFieldsType = {
  title: boolean;
  body: boolean;
};

interface ModalPostProps {
  isShowModal: boolean;
  handleHide: () => void;
  postText: Value;
  changePostTitle: (e: ChangeEvent<FormControlProps>) => void;
  changePostText: (e: OnChangeParam) => void;
  addNewPost: () => void;
  postValidFields: postValidFieldsType;
  postTitle?: string;
}

export const ModalEditor = React.memo(
  ({
    isShowModal,
    handleHide,
    postTitle,
    changePostTitle,
    postText,
    changePostText,
    addNewPost,
    postValidFields,
  }: ModalPostProps): JSX.Element => {
    return (
      <Modal show={isShowModal} onHide={handleHide} aria-labelledby="contained-modal-title">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title">Create new post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditorBlock
            postTitle={postTitle}
            changePostTitle={changePostTitle}
            postText={postText}
            changePostText={changePostText}
            postValidFields={postValidFields}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={addNewPost}>Create</Button>
          <Button onClick={handleHide} bsStyle="danger">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
);
