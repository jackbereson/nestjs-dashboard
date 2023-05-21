import { BaseModel } from "../../models/base-model.model";

export interface User extends BaseModel {
  code?: string;
  name?: string;
  email?: string;
  password?: string;
  walletAddress?: string;
  role?: UserRole;
  avatar?: string;
  lastLoginAt?: Date;
  activedAt?: Date;
  status?: UserStatus;
}

export interface CreateUserInput {
  name?: string;
  email?: string;
  password?: string;
  walletAddress?: string;
  role?: UserRole;
  avatar?: string;
  status?: UserStatus;
}

export enum UserRole {
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
  MEMBER = "MEMBER",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  DEACTIVE = "DEACTIVE",
}

export enum UserServiceStatus {
  FREE = "FREE",
  EXPIRED = "EXPIRED",
  PAID = "PAID",
}

export const ROLES = {
  ADMIN: "ADMIN",
  EDITOR: "EDITOR",
  MEMBER: "MEMBER",
  CUSTOMER: "CUSTOMER",
  ADMIN_EDITOR: ["ADMIN", "EDITOR"],
  ADMIN_MEMBER: ["ADMIN", "MEMBER"],
  ADMIN_MEMBER_EDITOR: ["ADMIN", "EDITOR", "MEMBER"],
  ADMIN_MEMBER_CUSTOMER: ["ADMIN", "MEMBER", "CUSTOMER"],
};

export const setUserToken = (token: string, temp = false) => {
  // console.log('token',token);
  if (temp) {
    sessionStorage.setItem("user-token", token);
  } else {
    localStorage.setItem("user-token", token);
  }
};

export const clearUserToken = () => {
  localStorage.removeItem("user-token");
  sessionStorage.removeItem("user-token");
};

export const getUserToken = (temp = false) => {
  return localStorage.getItem("user-token") || sessionStorage.getItem("user-token") || "";
};

export enum UserArgNames {
  code = "Code",
  id = "Id",
  email = "Email",
  password = "password",
  walletAddress = "walletAddress",
  role = "Role",
  agencyName = "Agency name",
  name = "Name",
  phone = "Phone",
  address = "Address",
  avatar = "Avatar",
  balance = "Balance",
  point = "Point",
  serviceStatus = "Service status",
  lastLoginAt = "Last login at",
  activedAt = "Actived at",
  expiredDateCount = "Expired date count",
  referralCode = "Referral code",
  status = "Status",
}

export enum UserArgs {
  code = "code",
  id = "id",
  email = "email",
  role = "role",
  password = "password",
  walletAddress = "walletAddress",
  agencyName = "agencyName",
  name = "name",
  phone = "phone",
  address = "address",
  avatar = "avatar",
  balance = "balance",
  point = "point",
  serviceStatus = "serviceStatus",
  lastLoginAt = "lastLoginAt",
  activedAt = "activedAt",
  expiredDateCount = "expiredDateCount",
  referralCode = "referralCode",
  status = "status",
}

export const UserInitialValues: CreateUserInput = {
  name: "",
  email: "",
  password: "",
  walletAddress: "",
  role: UserRole.EDITOR,
  avatar: "",
};

export const userRoleData = [
  {
    name: UserRole.ADMIN,
    value: UserRole.ADMIN,
  },
  {
    name: UserRole.EDITOR,
    value: UserRole.EDITOR,
  },
];

export const userStatusData = [
  {
    name: UserStatus.ACTIVE,
    value: UserStatus.ACTIVE,
  },
  {
    name: UserStatus.DEACTIVE,
    value: UserStatus.DEACTIVE,
  },
];
