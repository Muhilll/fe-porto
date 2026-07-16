export type Menu = {
  id: number;
  name: string;
  path: string | null;
  permission_path: string | null;
  icon: string | null;
  parent_id: number | null;
  parent_name?: string | null;
  created_at: string;
  updated_at: string;
};

export type CreateMenuRequest = {
  name: string;
  path: string | null;
  permission_path?: string | null;
  icon?: string | null;
  parent_id?: number | null;
};

export type UpdateMenuRequest = {
  name?: string;
  path?: string | null;
  permission_path?: string | null;
  icon?: string | null;
  parent_id?: number | null;
};
