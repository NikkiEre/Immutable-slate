import React, { ChangeEvent, useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Value } from "slate";
import { push } from "connected-react-router";
import { toastr } from "react-redux-toastr";
import { OnChangeParam } from "slate-react";
import { Button, ButtonGroup, ButtonToolbar, FormControlProps } from "react-bootstrap";

import { EditorBlock } from "../../component/EditorBlock/EditorBlock";
import { Header } from "../../component/Header/Header";
import { getUserData } from "../../store/selectors/selectors";
import { typeActionPosts } from "../../store/typeAction/typeActionPosts";
import { PostTypeImmutable } from "../../store/interfaces/interfacesRedux";

import "./PostComponent.scss";

type postValidFieldsType = {
  title: boolean;
  body: boolean;
};

function PostComponent({ post }: { post: PostTypeImmutable }): JSX.Element {
  const dispatch = useDispatch();
  const userData = useSelector(getUserData);
  const [postTitle, setPostTitle] = useState<string>(post.get("title"));
  const [postText, setPostText] = useState<Value>(Value.fromJSON(post.get("text")));
  const [postValidFields, setPostValidFields] = useState<postValidFieldsType>({
    title: false,
    body: false,
  });

  const isReadOnly = useMemo(() => {
    return userData.get("email") !== post.get("userEmail");
  }, [userData, post]);

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

  const backToPosts = useCallback((): void => {
    dispatch(push("/posts"));
  }, [dispatch]);

  const saveChange = useCallback((): void => {
    if (postTitle.trim().length === 0 || postText.document.text.trim().length === 0) {
      setPostValidFields({
        title: postTitle.trim().length === 0,
        body: postText.document.text.trim().length === 0,
      });
    } else {
      dispatch({
        type: typeActionPosts.ChangePost,
        payload: {
          id: post.get("id"),
          username: post.get("username"),
          title: postTitle,
          text: postText,
          userEmail: userData.get("email"),
        },
      });

      toastr.success("Success", "You have changed the post.");
    }
  }, [postText, postTitle, userData, dispatch, post]);

  return (
    <section>
      <Header />

      <section className="container">
        <div className={"col-md-8"}>
          <EditorBlock
            postTitle={postTitle}
            postText={postText}
            changePostText={changePostText}
            changePostTitle={changePostTitle}
            isReadOnly={isReadOnly}
            postValidFields={postValidFields}
          />

          <div className="post__block_button">
            <ButtonToolbar>
              <ButtonGroup>
                <Button onClick={backToPosts} bsStyle={"danger"}>
                  Back to Posts
                </Button>
              </ButtonGroup>

              {!isReadOnly && (
                <ButtonGroup>
                  <Button onClick={saveChange}>Save Change</Button>
                </ButtonGroup>
              )}
            </ButtonToolbar>
          </div>
        </div>
      </section>
    </section>
  );
}

export default React.memo(PostComponent);
