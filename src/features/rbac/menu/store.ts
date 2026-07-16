import { createCrudStore } from "@/stores/create-crud-store";
import type { Menu } from "./types";

export const useMenuStore = createCrudStore<Menu>();
