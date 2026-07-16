export type Role = {
  id: number;
  code: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export type CreateRoleRequest = {
  code: string;
  name: string;
};

export type UpdateRoleRequest = {
  code?: string;
  name?: string;
};
