import { Map } from "immutable";
import { createTransform } from "redux-persist";

import { UserDataState } from "../interfaces/interfacesRedux";

type UserData = {
  email: string;
  password: string;
  username: string;
};

const inbound = (state: UserDataState): UserData => state.toJS() as UserData;

const outbound = (state: UserData) => Map(state as UserData);

export const SetUserPersonalDataState = createTransform<UserDataState, UserData>(
  inbound,
  outbound,
  {
    whitelist: ["userPersonalData"],
  }
);
