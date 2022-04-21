import React, { useCallback } from "react";

import { PostTypeImmutable } from "../../store/interfaces/interfacesRedux";

import "./TableItem.scss";

interface TablePropsType {
  post: PostTypeImmutable;
  moveToPost: (id: number) => void;
}

export const TableItem = React.memo(({ post, moveToPost }: TablePropsType): JSX.Element => {
  const clickTableItem = useCallback(() => moveToPost(post.get("id")), [post, moveToPost]);

  return (
    <tr onClick={clickTableItem}>
      <td className="table-item-hidden">{post.get("id")}</td>
      <td className="table-item-hidden">{post.get("username")}</td>
      <td className="table-item-hidden">{post.get("title")}</td>
    </tr>
  );
});
