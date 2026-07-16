import { createCrudStore } from "@/stores/create-crud-store";
import type { Role } from "./types";

export const useRoleStore = createCrudStore<Role>();
