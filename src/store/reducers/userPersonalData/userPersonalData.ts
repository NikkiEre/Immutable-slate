import { Map } from "immutable";

import { ActionUserPersonalData } from "../../actions/actionUserPersonalData";
import { typeActionUserPersonalData } from "../../typeAction/typeActionUserPersonalData";
import { UserDataState } from "../../interfaces/interfacesRedux";

const initialData: UserDataState = Map({
  email: "",
  password: "",
  username: "",
});

export const userPersonalDataReducer = (
  state: UserDataState = Map(initialData),
  action: ActionUserPersonalData
): UserDataState => {
  switch (action.type) {
    case typeActionUserPersonalData.SetUserData: {
      return state
        .set("email", action.payload.get("email"))
        .set("password", action.payload.get("password"))
        .set("username", action.payload.get("username"));
    }
    case typeActionUserPersonalData.RemoveUserData: {
      return state.set("email", "").set("password", "").set("username", "");
    }
    default:
      return state;
  }
};
