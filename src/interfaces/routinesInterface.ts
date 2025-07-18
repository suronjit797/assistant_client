import { TUser } from "./userInterface";

export interface IRoutines {
  _id: string;
  day: string;
  time: string;
  title: string;
  description: string;
  duration: number;
  user: string | TUser;
  createdAt: Date;
  updateAt: Date;
}
