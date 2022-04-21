import { List, Map } from "immutable";

import { ActionPosts } from "../../actions/actionPosts";
import { typeActionPosts } from "../../typeAction/typeActionPosts";
import { PostTypeImmutable } from "../../interfaces/interfacesRedux";

const initialState: PostTypeImmutable[] = [];

export const postsReducer = (
  state = List(initialState),
  action: ActionPosts
): List<PostTypeImmutable> => {
  switch (action.type) {
    case typeActionPosts.CreatePost: {
      return state.push(Map(action.payload));
    }
    case typeActionPosts.ChangePost: {
      const indexPost = state.findIndex((post) => post.get("id") === action.payload.id);
      return state.set(indexPost, Map(action.payload));
    }
    default:
      return state;
  }
};
