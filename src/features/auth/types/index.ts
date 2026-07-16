/** Auth-related TypeScript types matching BE contract */

export type LoginRequest = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: number;
  email: string;
  name: string;
  role_id: number;
};

export type LoginResponse = {
  success: boolean;
  data: {
    token: string;
    user: AuthUser;
  };
  message: string;
};
