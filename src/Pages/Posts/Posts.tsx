import React, { ChangeEvent, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Value } from "slate";
import { push } from "connected-react-router";
import { toastr } from "react-redux-toastr";
import { FormControlProps, Button } from "react-bootstrap";
import { OnChangeParam } from "slate-react";

import { Header } from "../../component/Header/Header";
import { TablePosts } from "../../component/TablePosts/TablePosts";
import { ModalEditor } from "../../component/ModalEditor/ModalEditor";
import { initialValue } from "../../component/Editor/initialValue";
import { getPosts, getUserData } from "../../store/selectors/selectors";
import { typeActionPosts } from "../../store/typeAction/typeActionPosts";

import "./Posts.scss";

type postValidFieldsType = {
  title: boolean;
  body: boolean;
};

function Posts(): JSX.Element {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [postTitle, setPostTitle] = useState<string>("");
  const [postText, setPostText] = useState<Value>(initialValue);
  const userData = useSelector(getUserData);
  const selectorSizePosts = useSelector(getPosts).size;
  const dispatch = useDispatch();
  const [postValidFields, setPostValidFields] = useState<postValidFieldsType>({
    title: false,
    body: false,
  });

  const handleHideModal = useCallback((): void => {
    setIsShowModal(false);
    setPostTitle("");
    setPostText(initialValue);
    setPostValidFields({ title: false, body: false });
  }, []);

  const handleShowModal = useCallback((): void => {
    setIsShowModal(true);
  }, []);

  const changePostTitle = useCallback(
    (event: ChangeEvent<FormControlProps>): void => {
      setPostValidFields({ ...postValidFields, title: false });
      setPostTitle(String(event.target.value));
    },
    [postValidFields]
  );

  const changePostText = useCallback(
    (event: OnChangeParam): void => {
      !!event.value.document.text && setPostValidFields({ ...postValidFields, body: false });
      setPostText(event.value);
    },
    [postValidFields]
  );

  const addNewPost = useCallback((): void => {
    if (postTitle.trim().length === 0 || postText.document.text.trim().length === 0) {
      setPostValidFields({
        title: postTitle.trim().length === 0,
        body: postText.document.text.trim().length === 0,
      });
    } else {
      const setId = selectorSizePosts + 1;
      dispatch({
        type: typeActionPosts.CreatePost,
        payload: {
          username: userData.get("username"),
          title: postTitle,
          text: postText,
          id: setId,
          userEmail: userData.get("email"),
        },
      });
      dispatch(push(`/posts/${setId}`));
      toastr.success("Success", "You have created a new post.");
    }
  }, [postTitle, postText, selectorSizePosts, userData, dispatch]);

  return (
    <section>
      <Header />
      <div className="container-fluid">
        <div className="posts__block_button container">
          <Button onClick={handleShowModal}>+</Button>
        </div>
        <div className={"container"}>
          <TablePosts />
        </div>
      </div>
      <ModalEditor
        isShowModal={isShowModal}
        handleHide={handleHideModal}
        postTitle={postTitle}
        changePostTitle={changePostTitle}
        postText={postText}
        changePostText={changePostText}
        addNewPost={addNewPost}
        postValidFields={postValidFields}
      />
    </section>
  );
}

export default React.memo(Posts);
