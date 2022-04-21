import { Map } from "immutable";
import { Value } from "slate";

export interface ReduxMap<T> extends Map<string, unknown> {
  get<K extends keyof T>(key: K): T[K];
}

export type UserData = {
  email: string;
  password: string;
  username: string;
};

export type PostType = {
  title: string;
  text: Value;
  username: string;
  id: number;
  userEmail: string;
};

export type UserDataState = ReduxMap<UserData>;

export type PostTypeImmutable = ReduxMap<PostType>;
