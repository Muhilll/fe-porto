import { API_BASE_URL, APP_TOKEN } from "./config";

/**
 * Global HTTP client wrapper for the cafe-be-app API.
 * Attaches X-App-Token and Authorization headers automatically.
 */

type FetchOptions = RequestInit & {
  /** Skip attaching Authorization header (e.g. for login) */
  skipAuth?: boolean;
};

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

export async function apiClient<T = unknown>(
  path: string,
  options: FetchOptions = {},
): Promise<T> {
  const { skipAuth, headers: customHeaders, ...fetchOpts } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-App-Token": APP_TOKEN,
    ...(customHeaders as Record<string, string>),
  };

  if (!skipAuth) {
    const token = getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...fetchOpts,
    headers,
  });

  const json = await res.json();

  if (!res.ok) {
    // API returns { success: false, message: "..." }
    const errorMessage = json?.message || `Request failed with status ${res.status}`;
    const error = new Error(errorMessage) as Error & { status: number; data: unknown };
    error.status = res.status;
    error.data = json;
    throw error;
  }

  return json;
}
