import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";
import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import { List } from "immutable";
import { ToastrState } from "react-redux-toastr";
import { Value } from "slate";

import { UserDataState } from "../../store/interfaces/interfacesRedux";

type PostType = {
  title: string;
  text: Value;
  username: string;
  id: number;
  userEmail: string;
};

type UserData = {
  email: string;
  password: string;
  username: string;
};

type RootStateType = {
  usersDB: List<UserData>;
  userPersonalData: UserDataState;
  posts: List<PostType>;
  toastr: ToastrState;
};

const locationHelper = locationHelperBuilder({});

export const userIsAuthenticated = connectedRouterRedirect({
  redirectPath: "/login",
  authenticatedSelector: (state: RootStateType) => !!state.userPersonalData.get("email"),
  wrapperDisplayName: "UserIsAuthenticated",
});

export const userIsNotAuthenticated = connectedRouterRedirect({
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || "/",
  allowRedirectBack: false,
  authenticatedSelector: (state: RootStateType) => !state.userPersonalData.get("email"),
  wrapperDisplayName: "UserIsNotAuthenticated",
});
