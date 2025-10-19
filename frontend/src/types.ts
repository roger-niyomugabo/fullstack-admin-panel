export interface User {
  id: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  createdAt: string;
  emailHash?: string;
  signature?: string;
}

export interface UserStats {
  date: string;
  count: number;
}

export interface CreateUserData {
  email: string;
  role: string;
  status: "active" | "inactive";
}
