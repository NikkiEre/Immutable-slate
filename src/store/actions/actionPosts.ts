import { Value } from "slate";

export type ActionPosts = {
  type: string;
  payload: {
    username: string;
    title: string;
    text: Value;
    id: number;
    userEmail: string;
  };
};
