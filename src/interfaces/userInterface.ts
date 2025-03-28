export type TUser = {
    _id: string, 
    name: string;
    email: string;
    role: "superAdmin" | "admin" | "user";
    password?: string;
    createdAt: string;
    updatedAt: string;
  };
  