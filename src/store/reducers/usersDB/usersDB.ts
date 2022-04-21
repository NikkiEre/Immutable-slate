import { List, Map } from "immutable";

import md5 from "../../../utils/md5/md5";
import { ActionUserDB } from "../../actions/actionUserDB";
import { typeActionUserDB } from "../../typeAction/typeActionUserDB";
import { UserDataState } from "../../interfaces/interfacesRedux";

const initialDB: UserDataState[] = [];

export const usersDBReducer = (
  state = List(initialDB),
  action: ActionUserDB
): List<UserDataState> => {
  switch (action.type) {
    case typeActionUserDB.Create: {
      const hashPassword: string = md5(action.payload.password);
      return state.push(
        Map({
          email: action.payload.email,
          password: hashPassword,
          username: action.payload.username,
        })
      );
    }
    default:
      return state;
  }
};
