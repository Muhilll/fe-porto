import { create } from "zustand";
import type { AuthUser } from "@/features/auth/types";

type AuthState = {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;

  /** Set token + user after successful login */
  setAuth: (token: string, user: AuthUser) => void;
  /** Clear auth state (logout) */
  clearAuth: () => void;
  /** Hydrate from localStorage on app mount */
  hydrate: () => void;
};

const getInitialState = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr) as AuthUser;
        return { token, user, isAuthenticated: true };
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }
  return { token: null, user: null, isAuthenticated: false };
};

export const useAuthStore = create<AuthState>((set) => ({
  ...getInitialState(),

  setAuth: (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ token, user, isAuthenticated: true });
  },

  clearAuth: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ token: null, user: null, isAuthenticated: false });
  },

  hydrate: () => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr) as AuthUser;
        set({ token, user, isAuthenticated: true });
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  },
}));
