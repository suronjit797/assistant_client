import { TUser } from "./userInterface";

export interface IDiary {
  _id: string;
  user: string | TUser;
  title: string;
  date: Date;
  content: string;
  mood?: "happy" | "sad" | "angry" | "excited" | "neutral" | "anxious";
  tags?: string[];
  attachments?: {
    name: string;
    url: string;
    size: number;
    type: string;
  }[];
  isPublic: boolean;
  shareableLink?: string;
  versionHistory: {
    content: string;
    updatedAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
