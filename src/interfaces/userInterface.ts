import { ImageInterface } from "./interfaces";

export type TUser = {
    _id: string, 
    name: string;
    email: string;
    role: "superAdmin" | "admin" | "user";
    password?: string;
    phone: string;
    loginId: string;
    isActive: boolean;
    avatar: ImageInterface;
    lastLogin: Date;
    otp: number;
    otpExpiredAt: Date; 
    createdAt: string;
    updatedAt: string;
  };
  