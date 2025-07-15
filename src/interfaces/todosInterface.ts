import { TUser } from "./userInterface";

export interface ITodos {
  _id: string;
  title: string;
  description: string;
  priority: string;
  dueDate: Date;
  isImportant: boolean;
  isCompleted: boolean;
  user: string | TUser;
  createdAt: Date;
  updateAt: Date;
}
