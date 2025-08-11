import { TUser } from "./userInterface";

export interface IContacts {
  user: string | TUser;
  name: string;
  email: string;
  phone?: string;
  others?: string[];
  company?: string;
  jobTitle?: string;
  notes?: string;
  tags: string[];
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
