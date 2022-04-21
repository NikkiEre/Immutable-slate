import { List, Map } from "immutable";
import { createTransform } from "redux-persist";

import { PostTypeImmutable } from "../interfaces/interfacesRedux";

const inbound = (state: List<PostTypeImmutable>): PostTypeImmutable[] =>
  state.toJSON() as PostTypeImmutable[];

const outbound = (state: PostTypeImmutable[]): List<PostTypeImmutable> => {
  const getImmutablePosts = state.map((post) => Map(post));
  return List(getImmutablePosts as PostTypeImmutable[]);
};

export const SetPostsState = createTransform<List<PostTypeImmutable>, PostTypeImmutable[]>(
  inbound,
  outbound,
  {
    whitelist: ["posts"],
  }
);
