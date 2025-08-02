import { TUser } from "./userInterface";

export interface IPassword extends Document {
  _id: string;
  userId: string | TUser;
  website: string;
  username: string;
  encryptedPassword: string;
  decryptedPassword?: string;
  show?: boolean;
  notes?: string;
  category?: string; // e.g., banking, social, etc.
  createdAt: Date;
  updatedAt: Date;
}
