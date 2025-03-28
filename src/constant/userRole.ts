interface UserRole {
  [key: string]: string;
}

export const userRole: UserRole = {
  superAdmin: "superAdmin",
  businessAdmin: "businessAdmin",
  admin: "admin",
  installer: "installer",
  user: "user",
  public: "public",
};
export const userRoleFormate: UserRole = {
  superAdmin: "Super Admin",
  businessAdmin: "Business Admin",
  admin: "Site Admin",
  installer: "Installer",
  public: "Public User",
  user: "Site user",
};
