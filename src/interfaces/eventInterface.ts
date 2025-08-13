import { TUser } from "./userInterface";

export interface IEvent {
  user: string | TUser;
  startDate: string;
  endDate?: string;
  title: string;
  description?: string;
  location?: string;
  allDay: boolean;
  organizer?: {
    name: string;
    email?: string;
    phone?: string;
  };
  attendees: number;
  category?: string;
  tags: string[];
  isPublic: boolean;
  isOnline: boolean;
  onlineLink: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
