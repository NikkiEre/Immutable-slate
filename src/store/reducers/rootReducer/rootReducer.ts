import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducer as toastrReducer } from "react-redux-toastr";
import { History } from "history";

import { usersDBReducer } from "../usersDB/usersDB";
import { userPersonalDataReducer } from "../userPersonalData/userPersonalData";
import { postsReducer } from "../posts/posts";

export const rootReducer = (history: History) =>
  combineReducers({
    usersDB: usersDBReducer,
    userPersonalData: userPersonalDataReducer,
    toastr: toastrReducer,
    posts: postsReducer,
    router: connectRouter(history),
  });
