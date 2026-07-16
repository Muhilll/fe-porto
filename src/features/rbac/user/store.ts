import { createCrudStore } from "@/stores/create-crud-store";
import type { User } from "./types";

export const useUserStore = createCrudStore<User>();
