export type User = {
  id: number;
  email: string;
  name: string;
  role_id: number;
  role_name?: string;
  created_at: string;
  updated_at: string;
  role?: {
    id: number;
    code: string;
    name: string;
  };
};

export type CreateUserRequest = {
  email: string;
  password?: string;
  name: string;
  role_id: number;
};

export type UpdateUserRequest = {
  email?: string;
  password?: string;
  name?: string;
  role_id?: number;
};

export type NavigationPermission = {
  can_read: boolean;
  can_create: boolean;
  can_update: boolean;
  can_delete: boolean;
  can_report: boolean;
};

export type NavigationItem = {
  id: number;
  name: string;
  path: string | null;
  icon: string | null;
  is_visible: boolean | null;
  parent_id: number | null;
  permissions: NavigationPermission;
  children: NavigationItem[];
};
