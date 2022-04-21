import { List, Map } from "immutable";
import { createTransform } from "redux-persist";

import { UserDataState } from "../interfaces/interfacesRedux";

const inbound = (state: List<UserDataState>): UserDataState[] => state.toJS() as UserDataState[];

const outbound = (state: UserDataState[]): List<UserDataState> => {
  const getImmutableUsers: UserDataState[] = state.map((userData) => Map(userData));
  return List(getImmutableUsers) as List<UserDataState>;
};

export const SetUsersDBState = createTransform<List<UserDataState>, UserDataState[]>(
  inbound,
  outbound,
  {
    whitelist: ["usersDB"],
  }
);
