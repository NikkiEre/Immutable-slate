import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List } from "immutable";
import { useLocation } from "react-router-dom";
import { push } from "connected-react-router";

import { getPosts } from "../../store/selectors/selectors";
import { PostTypeImmutable } from "../../store/interfaces/interfacesRedux";

import PostComponent from "./PostComponent";

function PostContainer() {
  const pathname = useLocation().pathname.split("/posts/").join("");
  const dispatch = useDispatch();
  const selectPosts: List<PostTypeImmutable> = useSelector(getPosts);
  const [post, setPost] = useState(
    selectPosts.get(selectPosts.findIndex((post) => post.get("id") === Number(pathname)))
  );

  useEffect(() => {
    const indexPost = selectPosts.findIndex((post) => post.get("id") === Number(pathname));
    indexPost >= 0 ? setPost(selectPosts.get(indexPost)) : dispatch(push("/*"));
  }, [pathname, dispatch, selectPosts]);

  return post ? <PostComponent post={post} /> : <></>;
}

export default React.memo(PostContainer);
