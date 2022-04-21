type UserData = {
  email: string;
  password: string;
  username: string;
};

export type ActionUserDB = {
  type: string;
  payload: UserData;
};
