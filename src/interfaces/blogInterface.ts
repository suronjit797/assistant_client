import { TUser } from "./userInterface";

export interface IBlog {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  author: string | TUser;
  category?: string;
  tags?: string[];
  coverImage?: string;
  status: "draft" | "published" | "archived" | "scheduled";
  scheduledAt?: Date;
  views: number;
  likes: number;
  comments: {
    user: string | TUser;
    text: string;
    createdAt: Date;
    updatedAt?: Date;
  }[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
