import React, { useCallback } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";

import { getPosts } from "../../store/selectors/selectors";
import { TableItem } from "../TableItem/TableItem";
import { PostTypeImmutable } from "../../store/interfaces/interfacesRedux";

export const TablePosts = React.memo((): JSX.Element => {
  const selectPosts = useSelector(getPosts);
  const dispatch = useDispatch();

  const moveToPost = useCallback(
    (id: number): void => {
      dispatch(push(`/posts/${id}`));
    },
    [dispatch]
  );

  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th className="col-xs-2">#</th>
          <th className={"col-xs-4"}>Username</th>
          <th className={"col-xs-6"}>Title</th>
        </tr>
      </thead>
      <tbody>
        {selectPosts.map((post: PostTypeImmutable): JSX.Element => {
          return (
            <React.Fragment key={post.get("id")}>
              <TableItem post={post} moveToPost={moveToPost} />
            </React.Fragment>
          );
        })}
      </tbody>
    </Table>
  );
});
