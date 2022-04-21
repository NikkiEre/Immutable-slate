import { List } from "immutable";
import { ToastrState } from "react-redux-toastr";
import { History } from "history";

import { PostTypeImmutable, UserDataState } from "../interfaces/interfacesRedux";

type RootStateType = {
  usersDB: List<UserDataState>;
  userPersonalData: UserDataState;
  posts: List<PostTypeImmutable>;
  toastr: ToastrState;
  router: History;
};

export const getUsersDB = (state: RootStateType): List<UserDataState> => state.usersDB;

export const getUserData = (state: RootStateType): UserDataState => state.userPersonalData;

export const getPosts = (state: RootStateType): List<PostTypeImmutable> => state.posts;
