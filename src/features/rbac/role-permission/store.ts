import { createCrudStore } from "@/stores/create-crud-store";
import type { Role } from "@/features/rbac/role/types";

// Note: Even though this is role-permissions, the entity being selected for the matrix is a Role
export const useRolePermissionStore = createCrudStore<Role>();
