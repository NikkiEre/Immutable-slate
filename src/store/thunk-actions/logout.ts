import { Action, Dispatch } from "redux";
import { typeActionUserPersonalData } from "../typeAction/typeActionUserPersonalData";
import { push } from "connected-react-router";

export const logout = () => (dispatch: Dispatch<Action>) => {
  dispatch({ type: typeActionUserPersonalData.RemoveUserData });
  dispatch(push("/login"));
};
