import { TUser } from "./userInterface";

export interface IDiary {
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
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
