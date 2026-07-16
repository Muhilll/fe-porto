export type RolePermission = {
  id: number;
  role_id: number;
  role_name?: string;
  menu_id: number;
  menu_name?: string;
  can_read: boolean;
  can_create: boolean;
  can_update: boolean;
  can_delete: boolean;
  can_report: boolean;
  created_at: string;
  updated_at: string;
  role?: {
    id: number;
    code: string;
    name: string;
  };
  menu?: {
    id: number;
    name: string;
    path: string;
    permission_path: string | null;
    icon: string | null;
    parent_id: number | null;
  };
};

export type CreateRolePermissionRequest = {
  role_id: number;
  menu_id: number;
  can_read?: boolean;
  can_create?: boolean;
  can_update?: boolean;
  can_delete?: boolean;
  can_report?: boolean;
};

export type UpdateRolePermissionRequest = {
  role_id?: number;
  menu_id?: number;
  can_read?: boolean;
  can_create?: boolean;
  can_update?: boolean;
  can_delete?: boolean;
  can_report?: boolean;
};
